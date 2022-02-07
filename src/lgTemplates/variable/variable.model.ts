import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from "mongoose";
import {IsNotEmpty, IsDefined } from 'class-validator';
import {LgDocument} from "../lgDocument/lgDocument.model";

@Schema()
export class Variable extends Document {
    @Prop()
    name: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: LgDocument.name, required : true })
    document: LgDocument;

    @Prop()
    wordId: string;
}

export const VariableSchema = SchemaFactory.createForClass(Variable);

export class VariableDTO {
    @IsDefined()
    @IsNotEmpty()
    name: string;

    @IsDefined()
    @IsNotEmpty()
    document: string;

    wordId: string;
}
