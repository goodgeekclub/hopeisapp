import { Injectable } from '@angular/core';
import { LocalStorageService } from './localstorage.service';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Me } from '../interfaces/me.interface';
import { map, catchError, Observable, Subject, tap, switchMap } from 'rxjs';
import { S3Service } from './s3.service';

export interface Activity {
  _id: string;
  status: string;
  coinValue: number;
  date: Date;
  profile: string;
  mission: Mission;
  character: Character;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Character {
  name: string;
  title: string;
  quote: string;
  detail: string;
  photoUrl: string;
  ability: string;
  natures: string[];
}

export interface Mission {
  name: string;
  description: string;
  coinValue: number;
  level: number;
  photoUrl: string;
  examplePhotoUrl: string;
  characterNames: string[];
}
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
    private httpClient: HttpClient,
    private s3Service: S3Service
  ) {}

  createDailyMission() {
    return this.httpClient
      .post<Activity>(`${this.URL}/activities`, {})
      .pipe(map(res => res));
  }

  uploadMission(id: string, file: File) {
    const path = `mission/${id}.png`;
    return this.s3Service
      .upload(path, file)
      .pipe(switchMap(res => this.updateMission(id, res)));
  }

  updateMission(id: string, photoUrl: string) {
    return this.httpClient.patch(`${this.URL}/activities/${id}`, {
      status: 'PENDING',
      photoUrl: `${photoUrl}`,
    });
  }

  getMission() {
    return this.httpClient
      .get<Activity[]>(`${this.URL}/activities/active`)
      .pipe(
        map(res => res),
        catchError(error => {
          throw error;
        })
      );
  }

  fetchProfile() {
    const path = 'me/profile';
    const uri = `${this.baseUrl}/${path}`;
    return this.httpClient
      .get<Me>(uri)
      .pipe(tap(profile => this.profile.next(profile)));
  }

  patchProfile(data: Partial<Me>) {
    const path = 'me/profile';
    const uri = `${this.baseUrl}/${path}`;
    return this.httpClient
      .patch<Me>(uri, data)
      .pipe(tap(profile => this.profile.next(profile)));
  }

  createProfile(quizResultId: string) {
    const path = 'me/profile';
    const uri = `${this.baseUrl}/${path}`;
    return this.httpClient
      .post<Me>(uri, { quizResultId })
      .pipe(tap(profile => this.profile.next(profile)));
  }

  getProfile(): Observable<Me> {
    return this.profile.asObservable();
  }
}
