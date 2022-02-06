import { Module } from '@nestjs/common';
import { VariableService } from './variable.service';
import { VariableController } from './variable.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Variable, VariableSchema} from "./variable.model";
import {LgDocumentModule} from "../lgDocument/lgDocument.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Variable.name, schema: VariableSchema },
    ]), LgDocumentModule
  ],
  exports: [VariableService],
  providers: [VariableService],
  controllers: [VariableController]
})
export class VariableModule {}
