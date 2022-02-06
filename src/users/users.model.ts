import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {IsDefined, IsEmail, IsNotEmpty} from "class-validator";
import * as mongoose from "mongoose";

@Schema()
export class Users extends Document {
    @Prop({required : true})
    firstName: string;

    @Prop({required : true})
    lastName: string;

    @Prop({ unique: true , required : true})
    email: string;

    @Prop({ unique: true , required : true })
    phone: string;

    @Prop()
    address: string;

    @Prop({required : true})
    password: string;

    @Prop({default : false})
    isAdmin: boolean;
}

export const UsersSchema = SchemaFactory.createForClass(Users);

export class usersLoginDTO {
    @IsDefined()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    _id : mongoose.Types.ObjectId;
}
