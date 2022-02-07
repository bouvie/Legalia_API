import {HttpException, Injectable} from '@nestjs/common';
import {Bloc, BlocDTO} from "./bloc.model";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Variable, VariableDTO} from "../variable/variable.model";

@Injectable()
export class BlocService {
    constructor(
        @InjectModel(Bloc.name) private readonly blocModel: Model<Bloc>,
    ) {}


    async createOne(bloc : BlocDTO): Promise<Bloc | HttpException> {
        return this.blocModel.create(bloc);
    }

    async updateOne(blocId : string, bloc : BlocDTO): Promise<Bloc | HttpException> {
        await this.blocModel.findOneAndUpdate({_id : blocId}, bloc);
        return this.blocModel.findOne({_id : blocId});
    }

    async findOne(blocId : string): Promise<Bloc | HttpException> {
        return this.blocModel.findOne({_id : blocId});
    }

}
