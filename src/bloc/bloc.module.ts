import { Module } from '@nestjs/common';
import { BlocController } from './bloc.controller';
import { BlocService } from './bloc.service';

@Module({
  controllers: [BlocController],
  providers: [BlocService]
})
export class BlocModule {}
