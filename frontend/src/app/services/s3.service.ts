import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { environment } from '../../environments/environment';
import { IamService } from './iam.service';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
@Injectable({
  providedIn: 'root',
})
export class S3Service {
  constructor(private iamService: IamService) {}
  upload(filepath: string, filebody: File) {
    const client = this.setClient();
    const command = new PutObjectCommand({
      Bucket: environment.aws.bucket,
      Body: filebody,
      Key: filepath,
      ContentType: filebody.type,
    });
    return from(client.send(command));
  }

  // Use STS Token
  private setClient() {
    return new S3Client({
      region: environment.aws.region,
      credentials: this.iamService.getSTSCredential(),
    });
  }
}
