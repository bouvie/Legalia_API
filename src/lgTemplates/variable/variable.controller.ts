import {Body, Controller, HttpException, Post} from '@nestjs/common';
import {BlocService} from "../bloc/bloc.service";
import {LgDocumentService} from "../lgDocument/lgDocument.service";
import {BlocDTO} from "../bloc/bloc.model";
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
}
