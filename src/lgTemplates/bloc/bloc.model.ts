import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from "mongoose";
import {IsNotEmpty, IsDefined } from 'class-validator';
import {LgDocument} from "../lgDocument/lgDocument.model";

@Schema()
export class Bloc extends Document {
    @Prop()
    name: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: LgDocument.name, required : true })
    document: LgDocument;

    @Prop()
    wordId: string;
}

export const BlocSchema = SchemaFactory.createForClass(Bloc);

export class BlocDTO {
    @IsDefined()
    @IsNotEmpty()
    name: string;

    @IsDefined()
    @IsNotEmpty()
    document: string;

    wordId: string;
}
