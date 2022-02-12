import {Body, Controller, Get, HttpException, Param, Post, Put, UploadedFile, UseInterceptors} from '@nestjs/common';
import {LgDocumentService} from "./lgDocument.service";
import * as fs from "fs";
import * as jszip from "jszip";
import * as path from "path";
import {LgDocumentDTO} from "./lgDocument.model";
import {UsersService} from "../../users/users.service";
import {FileEntityService} from "../../fileEntity/fileEntity.service";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('document')
export class LgDocumentController {
    constructor(private lgDocumentService: LgDocumentService, private usersService: UsersService, private filesService : FileEntityService) {}

    @Put('upload/:userId/:documentId')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@Param('documentId') documentId : string, @Param('userId') userId : string, @UploadedFile() file) {
        const lgDocument = await this.lgDocumentService.findOne(documentId);
        if (!lgDocument) {
            return new HttpException("document not found", 405);
        }
        const fileEntity = await this.filesService.uploadPublicFile(file);
        if (!fileEntity) {
            return new HttpException("error saving document", 501);
        }
        lgDocument.file = fileEntity;
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
    async computeTemplate(@Param('documentId') documentId : string){
        const content = fs.readFileSync(
            path.resolve( "./test.docx"),
            "binary"
        );

        const zip = await jszip.loadAsync(content);

        let document = await zip.file('word/document.xml').async("text");

        let id = 0;
        const name = ["bclij8769s", "z2qsv1u4va"];
        const variableName = "Variable";
        let reDoc = new RegExp("(?<=<w:bookmarkStart w:id=\"" + id + "\" w:name=\"" + name[id] + "\"/>)(.*?)(?=<w:bookmarkEnd w:id=\"" + id + "\"/>)")
        while (document.search(reDoc) > 0) {
            const bookmark = reDoc.exec(document)[1];
            const computedBookmark = bookmark.replace("<w:t>" + variableName + "</w:t>", "<w:t>toto</w:t>")
            document = document.replace(reDoc, computedBookmark);
            id++;
            reDoc = new RegExp("(?<=<w:bookmarkStart w:id=\"" + id + "\" w:name=\"" + name[id] + "\"/>)(.*?)(?=<w:bookmarkEnd w:id=\"" + id + "\"/>)")
        }


        zip.file("word/document.xml", document);

        zip
            .generateNodeStream({type:'nodebuffer',streamFiles:true})
            .pipe(fs.createWriteStream('computed.docx'))
            .on('finish', function () {
                console.log("out.zip written.");
            });
    }

}
