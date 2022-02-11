import {HttpException, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {LgDocument, LgDocumentDTO} from "./lgDocument.model";
import {Model} from "mongoose";

@Injectable()
export class LgDocumentService {
    constructor(
        @InjectModel(LgDocument.name) private readonly lgDocumentModel: Model<LgDocument>,
    ) {}

    async findOne(documentId: string): Promise<LgDocument | undefined> {
        return this.lgDocumentModel.findOne({_id : documentId});
    }

    async createOne(document : LgDocumentDTO): Promise<LgDocument | HttpException> {
            return this.lgDocumentModel.create(document);
    }

    async updateOne(document : LgDocumentDTO, documentId : string): Promise<LgDocument | HttpException> {
        await this.lgDocumentModel.findOneAndUpdate({_id : documentId}, document);
        return this.lgDocumentModel.findOne({_id : documentId});

    }

    async findAll(): Promise<LgDocument[] | undefined> {
        return this.lgDocumentModel.find();
    }

}
