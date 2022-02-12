import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from "mongoose";
import {Users} from "../../users/users.model";
import {IsNotEmpty, IsDefined } from 'class-validator';
import {FileEntity} from "../../fileEntity/fileEntity.model";
@Schema()
export class LgDocument extends Document {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: FileEntity.name})
    file: FileEntity;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Users.name, required : true })
    user: Users;
}

export const LgDocumentSchema = SchemaFactory.createForClass(LgDocument);

export class LgDocumentDTO {
    @Prop()
    file: string;

    @IsDefined()
    @IsNotEmpty()
    user: string;
}
