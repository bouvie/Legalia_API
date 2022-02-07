import {Body, Controller, HttpException, Param, Post, Put} from '@nestjs/common';
import {LgDocumentService} from "../lgDocument/lgDocument.service";
import {BlocService} from "./bloc.service";
import {BlocDTO} from "./bloc.model";
import {VariableDTO} from "../variable/variable.model";

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

    @Put('blocId')
    async updateOne(@Body() bloc : BlocDTO, @Param(':blocId') blocId : string) {
        const blocDb = await this.blocServices.findOne(blocId);
        if (!blocDb) {
            return new HttpException("bloc not found", 405);
        }
        return this.blocServices.updateOne(blocId, bloc);
    }

}
