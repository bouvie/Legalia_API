import {
    Body,
    Controller,
    Get,
    HttpException,
    Param,
    Post,
    Put,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import {LgDocumentService} from "./lgDocument.service";
import * as jszip from "jszip";
import {LgDocument, LgDocumentDTO} from "./lgDocument.model";
import {UsersService} from "../../users/users.service";
import {FileEntityService} from "../../fileEntity/fileEntity.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {GetObjectCommand, S3Client} from '@aws-sdk/client-s3';
import {Readable} from "stream";

@Controller('document')
export class LgDocumentController {
    constructor(private lgDocumentService: LgDocumentService, private usersService: UsersService, private filesService : FileEntityService) {}

    @Put('upload/:userId/:documentId')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@Param('documentId') documentId : string, @Param('userId') userId : string, @UploadedFile() file,
                     @Body('filename') filename : string, @Body('documentName') documentName : string) {
        const lgDocument = await this.lgDocumentService.findOne(documentId);
        if (!lgDocument) {
            return new HttpException("document not found", 405);
        }
        const fileEntity = await this.filesService.uploadPublicFile(file, filename);
        if (!fileEntity) {
            return new HttpException("error saving document", 501);
        }
        lgDocument.file = fileEntity;
        lgDocument.name = documentName
        return this.lgDocumentService.updateOne(lgDocument, documentId);
    }

    @Post('')
    async createOne(@Body() document : LgDocumentDTO) {
        const user = await this.usersService.findById(document.user);
        if (!user) {
            return new HttpException("user not found", 405);
        }
        return this.lgDocumentService.createOne(document);
    }

    @Put(':documentId')
    async updateOne(@Param('documentId') documentId : string, @Body() document : LgDocumentDTO) {
        const user = await this.usersService.findById(document.user);
        if (!user) {
            return new HttpException("user not found", 405);
        }
       return this.lgDocumentService.updateOne(document, documentId);
    }


    @Get(':documentId')
    async findOne(@Param('documentId') documentId : string) {
        return this.lgDocumentService.findOne(documentId);
    }

    @Get('')
    async findAll() {
        return this.lgDocumentService.findAll()
    }

    @Post('/compute/:documentId')
    async computeTemplate(@Param('documentId') documentId : string, @Body('variables') variables : any) {
        const lgDocument = await this.lgDocumentService.findOneAndPopulateFile(documentId);
        if (!lgDocument) {
            return new HttpException("document not found", 405);
        }
        const s3file = await getObjectFromAWS(process.env.S3_BUCKET_NAME, lgDocument.file._id.toString(), lgDocument);
        const zip = await jszip.loadAsync(s3file);
        let document = await zip.file('word/document.xml').async("text");

        variables.forEach((variable) => {
            const wordIdRe = new RegExp("(?<=<w:bookmarkStart w:id=\"(.*?)\" w:name=\"" + "_Lg" + variable._id + "\"/>)");
            const reg = wordIdRe.exec(document);
            if (reg) {
                const wordId = reg[1];
                const bookMarkRe = new RegExp("(?<=<w:bookmarkStart w:id=\"" + wordId + "\" w:name=\"" + "_Lg" + variable._id + "\"/>)(.*?)(?=<w:bookmarkEnd w:id=\"" + wordId + "\"/>)")
                const bookmark = bookMarkRe.exec(document)[1];
                if (!variable.value) {
                    variable.value = '';
                }
                const computedBookmark = bookmark.replace("<w:t>" + variable.name + "</w:t>", "<w:t>" + variable.value  + "</w:t>")
                document = document.replace(bookMarkRe, computedBookmark);
            }
        })

        zip.file("word/document.xml", document);
        return zip
            .generateAsync({type: 'nodebuffer', streamFiles: true})
            .then(async (content) => {
               const file = await this.filesService.uploadPublicFile({buffer : content, name : lgDocument._id + 'computed.docx'}, lgDocument._id.toString() + 'computed.docx', true);
               if (!lgDocument.generatedAt) {
                   lgDocument.generatedAt = [file._id];
               } else {
                   lgDocument.generatedAt.push(file._id);
               }
               await lgDocument.save();
               return this.filesService.downloadFile(file);
            });
    }

}

function getObjectFromAWS(Bucket : string, Key : string, lgDocument : LgDocument) : Promise<Buffer> {
    const client = new S3Client({region:'eu-west-3',});

    return new Promise(async (resolve, reject) : Promise<Buffer | void> => {
        const getObjectCommand = new GetObjectCommand({ Bucket, Key })

        try {
            const response = await client.send(getObjectCommand)

            // Store all of data chunks returned from the response data stream
            // into an array then use Array#join() to use the returned contents as a String
            let responseDataChunks = []

            // Handle an error while streaming the response body
            if (response.Body instanceof Readable) {
                response.Body.once('error', err => reject(err))
            }

            // Attach a 'data' listener to add the chunks of data to our array
            // Each chunk is a Buffer instance
            if (response.Body instanceof Readable) {
                response.Body.on('data', chunk => responseDataChunks.push(chunk))
            }

            // Once the stream has no more data, join the chunks into a string and return the string
            if (response.Body instanceof Readable) {
                response.Body.once('end', () => resolve(Buffer.concat(responseDataChunks)))
            }
        } catch (err) {
            // Handle the error or throw
            return reject(err)
        }
    })
}
