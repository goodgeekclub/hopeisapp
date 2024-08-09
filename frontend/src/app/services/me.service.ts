import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Me } from '../interfaces/me.interface';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MeService {
  private baseUrl = environment.backend.backendUrl;
  private profile = new Subject<Me>();
  constructor(private httpClient: HttpClient) {}

  fetchProfile() {
    const path = 'me/profile';
    const uri = `${this.baseUrl}/${path}`;
    return this.httpClient
      .get<Me>(uri)
      .pipe(tap((profile) => this.profile.next(profile)));
  }

  patchProfile(data: Partial<Me>) {
    const path = 'me/profile';
    const uri = `${this.baseUrl}/${path}`;
    return this.httpClient
      .patch<Me>(uri, data)
      .pipe(tap((profile) => this.profile.next(profile)));
  }

  getProfile(): Observable<Me> {
    return this.profile.asObservable();
  }
}
