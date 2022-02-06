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

}
