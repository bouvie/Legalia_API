import { Module } from '@nestjs/common';
import {LgDocumentService} from "./lgDocument.service";
import {LgDocumentController} from "./lgDocument.controller";
import {MongooseModule} from "@nestjs/mongoose";
import {LgDocument, LgDocumentSchema} from "./lgDocument.model";
import {UsersModule} from "../../users/users.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LgDocument.name, schema: LgDocumentSchema },
    ]), UsersModule
  ],
  exports: [LgDocumentService],
  controllers: [LgDocumentController],
  providers: [LgDocumentService]
})
export class LgDocumentModule {}
