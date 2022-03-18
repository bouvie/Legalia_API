import {Body, Controller, Get, HttpException, Param, Post, Put} from '@nestjs/common';
import {LgDocumentService} from "../lgDocument/lgDocument.service";
import {VariableService} from "./variable.service";
import {VariableDTO} from "./variable.model";

@Controller('variable')
export class VariableController {
    constructor(private variableServices : VariableService,
                private lgDocumentService: LgDocumentService) {}


    @Post('')
    async createOne(@Body() variable : VariableDTO) {
        const document = await this.lgDocumentService.findOne(variable.document);
        if (!document) {
            return new HttpException("document not found", 405);
        }
        return this.variableServices.createOne(variable);
    }

    @Put(':variableId')
    async updateOne(@Param('variableId') variableId : string, @Body() variable : VariableDTO) {
        const variableDb = await this.variableServices.findOne(variableId);
        if (!variableDb) {
            return new HttpException("variable not found", 405);
        }
        return this.variableServices.updateOne(variableId, variable);
    }

    @Get(':templateId')
    async getByTemplate(@Param('templateId') templateId : string) {
        return this.variableServices.findByTemplate(templateId);
    }
}
