import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {FileEntity} from "./fileEntity.model";
import {LgDocument} from "../lgTemplates/lgDocument/lgDocument.model";

@Injectable()
export class FileEntityService {
    constructor(@InjectModel(FileEntity.name) private readonly fileEntityModel: Model<FileEntity>) {}

    async uploadPublicFile(dataBuffer, filename, computed ? : boolean) {
        const file : FileEntity = await this.fileEntityModel.create({filename : filename});
        const s3 = new S3();
        const key = computed ? file._id.toString() + "_computed.docx" : file._id.toString();
        const uploadResult = await s3.upload({
            Bucket: process.env.S3_BUCKET_NAME,
            Body: dataBuffer.buffer,
            Key: key,
        })
            .promise();
        file.key = uploadResult.Key;
        file.url = uploadResult.Location;
        await file.save();
        return file;
    }

    async downloadFile(file : FileEntity) {
        const s3 = new S3();
        const downloadParams = {
                Key: file.key,
                Bucket: process.env.S3_BUCKET_NAME,
            };
        return new Promise<string>((resolve, reject) => {
            s3.getSignedUrl('getObject', downloadParams, function (err, url) {
                resolve(url);
            });
        });
    }
}
