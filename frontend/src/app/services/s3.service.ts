import { Injectable } from '@angular/core';
import { from, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { IamService } from './iam.service';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { fromWebToken } from '@aws-sdk/credential-providers';
@Injectable({
  providedIn: 'root',
})
export class S3Service {
  constructor(private iamService: IamService) {}
  // filePath: https://${enviment.aws.bucket}/user/:profile_id/mission/<activites-id>.png
  upload(filepath: string, filebody: File) {
    const client = this.setClient();
    const command = new PutObjectCommand({
      Bucket: environment.aws.bucket,
      Body: filebody,
      Key: filepath,
      ContentType: filebody.type,
    });
    return from(client.send(command)).pipe(
      map((data) => `https://${environment.aws.bucket}/${filepath}`)
    );
  }

  // Use STS Token
  private setClient() {
    return new S3Client({
      region: environment.aws.region,
      credentials: this.iamService.getSTSCredential(),
    });
  }
}
