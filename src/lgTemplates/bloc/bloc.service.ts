import {HttpException, Injectable} from '@nestjs/common';
import {Bloc, BlocDTO} from "./bloc.model";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

@Injectable()
export class BlocService {
    constructor(
        @InjectModel(Bloc.name) private readonly blocModel: Model<Bloc>,
    ) {}


    async createOne(bloc : BlocDTO): Promise<Bloc | HttpException> {
        return this.blocModel.create(bloc);
    }
}
