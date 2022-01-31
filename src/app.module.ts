import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import {MongooseModule} from "@nestjs/mongoose";
import { BlocModule } from './bloc/bloc.module';
import {LgDocumentController} from "./lgDocument/lgDocument.controller";
import {LgDocumentService} from "./lgDocument/lgDocument.service";
import {LgDocumentModule} from "./lgDocument/lgDocument.module";
import {BlocService} from "./bloc/bloc.service";
import {BlocController} from "./bloc/bloc.controller";
import {APP_GUARD} from "@nestjs/core";
import {JwtAuthGuard} from "./auth/jwt-auth.guard";

@Module({
  imports: [AuthModule, UsersModule,  LgDocumentModule, BlocModule, MongooseModule.forRoot('mongodb://localhost:27017/Legalia')],
  controllers: [AppController],
  providers: [AppService,
  {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },
]
})
export class AppModule {}
