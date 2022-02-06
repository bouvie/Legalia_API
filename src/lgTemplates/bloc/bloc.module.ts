import { Module } from '@nestjs/common';
import { BlocController } from './bloc.controller';
import { BlocService } from './bloc.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Bloc, BlocSchema} from "./bloc.model";
import {LgDocumentModule} from "../lgDocument/lgDocument.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Bloc.name, schema: BlocSchema },
    ]), LgDocumentModule
  ],
  exports: [BlocService],
  controllers: [BlocController],
  providers: [BlocService]
})
export class BlocModule {}
