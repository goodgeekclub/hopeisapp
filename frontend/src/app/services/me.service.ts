import { Injectable } from '@angular/core';
import { LocalStorageService } from './localstorage.service';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MeService {
  private profileKey = 'profile';

  private URL = `${environment.backend.backendUrl}/me`;
  constructor(
    private storageService: LocalStorageService,
    private client: HttpClient
  ) {}

  createDailyMission() {
    return this.client.post(`${this.URL}/activities`, {}).pipe(
      map((res) => res),
      catchError((error) => {
        throw error;
      })
    );
  }

  updateMission(id: string, photoUrl: string) {
    return this.client
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
    return this.client.get(`${this.URL}/activities/active`).pipe(
      map((res) => res),
      catchError((error) => {
        throw error;
      })
    );
  }
}
