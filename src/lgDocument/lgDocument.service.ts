import {HttpException, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {LgDocument, LgDocumentDTO} from "./lgDocument.model";
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
        try {
            const mongooseDocumentId = new mongoose.Types.ObjectId(documentId);
            return this.lgDocumentModel.findOne({_id : mongooseDocumentId});
        } catch {
            throw new HttpException("Wrong id format", 405)
        }
    }

    async createOne(document : LgDocumentDTO): Promise<LgDocument | undefined> {
        return this.lgDocumentModel.create(document);
    }

    async updateOne(document : LgDocumentDTO, documentId : string): Promise<LgDocument | undefined> {
        try {
            const mongooseDocumentId = new mongoose.Types.ObjectId(documentId);
            return this.lgDocumentModel.findOneAndUpdate({_id : new mongoose.Types.ObjectId(mongooseDocumentId)}, document);
        } catch {
            throw new HttpException("Wrong id format", 405)
        }
    }


    async findAll(): Promise<LgDocument[] | undefined> {
        return this.lgDocumentModel.find();
    }

}
