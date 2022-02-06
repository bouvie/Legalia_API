import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from "mongoose";
import {Users} from "../../users/users.model";
import {IsNotEmpty, IsDefined } from 'class-validator';
@Schema()
export class LgDocument extends Document {
    @Prop()
    name: string;

    @Prop()
    path: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Users.name, required : true })
    user: Users;
}

export const LgDocumentSchema = SchemaFactory.createForClass(LgDocument);

export class LgDocumentDTO {
    @Prop()
    name: string;

    @Prop()
    path: string;

    @IsDefined()
    @IsNotEmpty()
    user: string;
}
