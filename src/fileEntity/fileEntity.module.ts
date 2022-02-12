import { Module } from '@nestjs/common';
import { FileEntityService } from './fileEntity.service';
import {FileEntity, FileEntitySchema} from "./fileEntity.model";
import {MongooseModule} from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FileEntity.name, schema: FileEntitySchema },
    ]),
  ],
  providers: [FileEntityService],
  exports: [FileEntityService],
})
export class FileEntityModule {}
