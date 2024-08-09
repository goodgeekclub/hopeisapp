import { Injectable } from '@angular/core';
import { LocalStorageService } from './localstorage.service';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Me } from '../interfaces/me.interface';
import { map, catchError, Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MeService {
  private profileKey = 'profile';
  private baseUrl = environment.backend.backendUrl;
  private profile = new Subject<Me>();

  private URL = `${environment.backend.backendUrl}/me`;
  constructor(
    private storageService: LocalStorageService,
    private httpClient: HttpClient
  ) {}

  createDailyMission() {
    return this.httpClient.post(`${this.URL}/activities`, {}).pipe(
      map((res) => res),
      catchError((error) => {
        throw error;
      })
    );
  }

  updateMission(id: string, photoUrl: string) {
    return this.httpClient
      .patch(`${this.URL}/activities/${id}`, {
        status: 'PENDING',
        photoUrl: `${photoUrl}`,
      })
      .pipe(
        map((res) => res),
        catchError((error) => {
          throw error;
        })
      );
  }

  getMission() {
    return this.httpClient.get(`${this.URL}/activities/active`).pipe(
      map((res) => res),
      catchError((error) => {
        throw error;
      })
    );
  }

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
