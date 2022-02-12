import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {FileEntity} from "./fileEntity.model";

@Injectable()
export class FileEntityService {
    constructor(@InjectModel(FileEntity.name) private readonly fileEntityModel: Model<FileEntity>) {}

    async uploadPublicFile(dataBuffer, filename) {
        const file : FileEntity = await this.fileEntityModel.create({filename : filename});
        const s3 = new S3();
        console.log(process.env.S3_BUCKET_NAME);
        const uploadResult = await s3.upload({
            Bucket: process.env.S3_BUCKET_NAME,
            Body: dataBuffer.buffer,
            Key: file._id.toString()
        })
            .promise();
        file.key = uploadResult.Key;
        file.url = uploadResult.Location;
        await file.save();
        return file;
    }
}
