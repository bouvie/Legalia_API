import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import {MongooseModule} from "@nestjs/mongoose";
import { BlocModule } from './LgTemplates/bloc/bloc.module';
import {LgDocumentModule} from "./LgTemplates/lgDocument/lgDocument.module";
import {APP_GUARD} from "@nestjs/core";
import {JwtAuthGuard} from "./auth/jwt-auth.guard";
import {ConfigModule} from "@nestjs/config";
import {VariableModule} from "./lgTemplates/variable/variable.module";

@Module({
  imports: [AuthModule, UsersModule, LgDocumentModule, BlocModule, VariableModule, ConfigModule.forRoot(), MongooseModule.forRoot(process.env.MONGODB_URI)],
  controllers: [AppController],
  providers: [AppService,
  {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },
]
})
export class AppModule {}
