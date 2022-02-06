import { Module } from '@nestjs/common';
import {LgDocumentService} from "./lgDocument.service";
import {LgDocumentController} from "./lgDocument.controller";
import {MongooseModule} from "@nestjs/mongoose";
import {LgDocument, LgDocumentSchema} from "./lgDocument.model";
import {UsersModule} from "../users/users.module";
import {Users, UsersSchema} from "../users/users.model";
import {UsersService} from "../users/users.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LgDocument.name, schema: LgDocumentSchema },
      { name: Users.name, schema: UsersSchema },
    ])
  ],
  exports: [LgDocumentService],
  controllers: [LgDocumentController],
  providers: [LgDocumentService, UsersService]
})
export class LgDocumentModule {}
