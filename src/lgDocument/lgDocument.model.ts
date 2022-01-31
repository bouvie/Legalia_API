import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from "mongoose";
import {Users} from "../users/users.model";

@Schema()
export class LgDocument extends Document {
    @Prop({required : true})
    name: string;

    @Prop({unique : true})
    path: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Users.name, required : true })
    user: Users;
}

export const LgDocumentSchema = SchemaFactory.createForClass(LgDocument);
