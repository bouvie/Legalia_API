import {Schema, Prop, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";

@Schema()
export class FileEntity extends Document {

    @Prop()
    public url: string;

    public key: string;
}

export const FileEntitySchema = SchemaFactory.createForClass(FileEntity);
