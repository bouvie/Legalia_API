import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {NestExpressApplication} from "@nestjs/platform-express";
import * as fs from "fs";

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await app.listen(2700);
}
bootstrap();
