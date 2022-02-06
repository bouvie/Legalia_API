import {Body, Controller, HttpException, Post} from '@nestjs/common';
import {LgDocumentService} from "../lgDocument/lgDocument.service";
import {BlocService} from "./bloc.service";
import {BlocDTO} from "./bloc.model";

@Controller('bloc')
export class BlocController {
    constructor(private blocServices : BlocService,
                private lgDocumentService: LgDocumentService) {}


    @Post('')
    async createOne(@Body() bloc : BlocDTO) {
        const document = await this.lgDocumentService.findOne(bloc.document);
        if (!document) {
            return new HttpException("document not found", 405);
        }
        return this.blocServices.createOne(bloc);
    }
}
