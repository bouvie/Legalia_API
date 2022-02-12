import {Schema, Prop, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";

@Schema()
export class FileEntity extends Document {

    @Prop()
    url: string;

    @Prop()
    key: string;

    @Prop({required : true})
    filename: string;
}

export const FileEntitySchema = SchemaFactory.createForClass(FileEntity);
