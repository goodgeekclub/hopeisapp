import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { STSClient, AssumeRoleCommand, AssumeRoleWithWebIdentityCommand } from "@aws-sdk/client-sts"; // ES Modules import
import { catchError, from, map, Observable, of, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class S3Service {

  private readonly roleArn = '';
  constructor(private AuthService: AuthService) {}

  assumeRole(): Observable<any> {
    const client: STSClient = new STSClient({ region: environment.aws.region });
    return this.AuthService.getUserState().pipe(
      switchMap((user: any) => {
        console.log('id:', user.uid);
        console.log('accessToken:', user.accessToken);
        const command = new AssumeRoleWithWebIdentityCommand({
          RoleArn: this.roleArn,
          RoleSessionName: user.uid.substring(0, 20),
          WebIdentityToken: user.accessToken,
        });
        return from(client.send(command));
      }),
      map((res: any) => {
        console.log(res);
      }),
      catchError((e: any) => {
        console.log(e);
        return of(e);
      })
    )
  }
}
