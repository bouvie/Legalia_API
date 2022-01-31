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
  imports: [AuthModule, UsersModule,  LgDocumentModule, BlocModule, MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb+srv://Legalia-Admin-Dev:6yzPz6VYEi7vM3@Legalia-dev.8jb0o.mongodb.net/Legalia?retryWrites=true&w=majority&ssl=true')],
  controllers: [AppController],
  providers: [AppService,
  {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },
]
})
export class AppModule {}
