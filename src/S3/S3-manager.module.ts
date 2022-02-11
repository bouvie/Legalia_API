// s3-manager.module.ts
import { Module } from '@nestjs/common';
import { AwsSdkModule } from 'nest-aws-sdk';
import { S3 } from 'aws-sdk';
import { S3ManagerService } from './s3-manager.service';

@Module({
    imports: [AwsSdkModule.forFeatures([S3])],
    providers: [S3ManagerService],
    exports: [S3ManagerService],
})
export class S3ManagerModule {}
