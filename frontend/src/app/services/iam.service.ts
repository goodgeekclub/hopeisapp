import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, from, map, Observable, of, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';
import { AssumedRoleUser, AssumeRoleWithWebIdentityCommand, Credentials, STSClient } from '@aws-sdk/client-sts';
import { AuthService } from './auth.service';
import { DateTime } from 'luxon'

export interface STSToken {
  Credentials: Credentials,
  AssumedRoleUser: AssumedRoleUser
}

@Injectable({
  providedIn: 'root'
})
export class IamService {
  private readonly stsToken = new BehaviorSubject<STSToken | null>(null);
  private client: STSClient = new STSClient({ region: environment.aws.region });
  constructor(private authService: AuthService) {
    this.getSTSToken().subscribe();
  }

  assumeRole(): Observable<STSToken | null> {
    return this.authService.getUserState().pipe(
      switchMap((user: any) => {
        const command = new AssumeRoleWithWebIdentityCommand({
          RoleArn: environment.aws.roleArn,
          RoleSessionName: user.uid.substring(0, 20),
          WebIdentityToken: user.accessToken,
          DurationSeconds: 15 * 60,
        });
        return from(this.client.send(command));
      }),
      map((res: any) => {
        const token = {
          Credentials: res.Credentials,
          AssumedRoleUser: res.AssumedRoleUser
        }
        this.stsToken.next(token);
        return token;
      }),
      catchError((e: any) => {
        console.log('AssumeRole Error:', e);
        return of(null);
      })
    )
  }

  getSTSCredential() {
    return {
      accessKeyId: this.getSTSTokenValue()?.Credentials.AccessKeyId as string,
      secretAccessKey: this.getSTSTokenValue()?.Credentials.SecretAccessKey as string,
      sessionToken: this.getSTSTokenValue()?.Credentials.SessionToken as string,
    }
  }

  getSTSTokenValue(): STSToken | null {
    return this.stsToken.getValue();
  }

  getSTSToken(): Observable<STSToken | null> {
    if (this.stsToken.getValue() &&
        DateTime.now() < DateTime.fromISO(this.stsToken.getValue()?.Credentials.Expiration?.toISOString() || '')) {
          return of(this.stsToken.getValue());
    } else {
      console.log('Assuming role');
      return this.assumeRole();
    }
  }
}
