import {Controller, Get, Logger, Post, Request} from '@nestjs/common';
import {LgDocumentService} from "./lgDocument.service";
import * as fs from "fs";
import * as jszip from "jszip";
import * as path from "path";
import * as parser from 'xml2json'


@Controller('document')
export class LgDocumentController {
    constructor(private lgDocumentService: LgDocumentService) {}

    @Post('')
    async createOne(@Request() req) {
        console.log('creating new Document');
        return this.lgDocumentService.createOne(req.body);
    }

    @Get(':documentId')
    async findOne(@Request() req) {
        return this.lgDocumentService.findOne(req.params.documentId);
    }

    @Get('')
    async findAll(@Request() req) {
        return this.lgDocumentService.findAll()
    }

    @Post('/compute')
    async computeTemplate(){
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
