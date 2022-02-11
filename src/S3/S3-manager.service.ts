// s3-manager.service.ts
import { Injectable } from '@nestjs/common';
import { InjectAwsService } from 'nest-aws-sdk';
import { S3 } from 'aws-sdk';

@Injectable()
export class S3ManagerService {
    constructor(
        @InjectAwsService(S3) private readonly s3: S3,
    ) {
    }

    async uploadFile(userId, documentId : string, file : File, ) {
        const params =
            {
                Bucket: process.env.S3_BUCKET_NAME,
                Key: String(userId + '/' + documentId),
                Body: file,
                ACL: "public-read",
                CreateBucketConfiguration:
                    {
                        LocationConstraint: "eu-west-3"
                    }
            };

        try
        {
            let s3Response = await this.s3.upload(params).promise();

            console.log(s3Response);
        }
        catch (e)
        {
            console.log(e);
        }
    }

    async listBucketContents() {
        const response = await this.s3.listObjectsV2({ Bucket: process.env.S3_BUCKET_NAME }).promise();
        return response.Contents.map(c => c.Key);
    }
}
