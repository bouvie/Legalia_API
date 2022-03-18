import {HttpException, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Bloc, BlocDTO} from "../bloc/bloc.model";
import {Model} from "mongoose";
import {Variable, VariableDTO} from "./variable.model";

@Injectable()
export class VariableService {
    constructor(
        @InjectModel(Variable.name) private readonly variableModel: Model<Variable>,
    ) {}


    async createOne(variable : VariableDTO): Promise<Variable | HttpException> {
        return this.variableModel.create(variable);
    }

    async updateOne(variableId : string, variable : VariableDTO): Promise<Variable | HttpException> {
        await this.variableModel.findOneAndUpdate({_id : variableId}, variable);
        return this.variableModel.findOne({_id : variableId});
    }

    async findOne(variableId : string): Promise<Variable | HttpException> {
        return this.variableModel.findOne({_id : variableId});
    }

    async findByTemplate(templateId : string): Promise<Variable[] | HttpException> {
        return this.variableModel.find({document : templateId});
    }
}
