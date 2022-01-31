import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {LgDocument} from "./lgDocument.model";
import {Model} from "mongoose";
import * as mongoose from "mongoose";
import {Users} from "../users/users.model";

@Injectable()
export class LgDocumentService {
    constructor(
        @InjectModel(LgDocument.name) private readonly lgDocumentModel: Model<LgDocument>,
        @InjectModel(Users.name) private readonly usersModel: Model<Users>,
    ) {}

    async findOne(documentId: string): Promise<LgDocument | undefined> {
        return this.lgDocumentModel.findOne({_id : new mongoose.Schema.Types.ObjectId(documentId)});
    }

    async createOne(document : Partial<LgDocument>): Promise<LgDocument | undefined> {
        return this.lgDocumentModel.create(document);
    }

    async findAll(): Promise<LgDocument[] | undefined> {
        return this.lgDocumentModel.find();
    }

}