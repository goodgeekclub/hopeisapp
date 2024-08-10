import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IProfileActivities } from '../interfaces/mission.interface';
@Injectable({
  providedIn: 'root',
})
export class MissionService {
  constructor(private http: HttpClient) {}

  getMission(status?: string, limit?: number): Observable<IProfileActivities[]> {
    let params = new HttpParams();
    if (status) {
      params = params.append('status', status);
    }
    if (limit) {
      params = params.append('limit', limit);
    }
    return this.http.get<IProfileActivities[]>(
      `${environment.backend.backendUrl}/profile-activities/`,
      {
        params
      }
    );
  }

  updateMissionStatus(missionId: string, newStatus: string): Observable<IProfileActivities> {
    return this.http.patch<IProfileActivities>(
      `${environment.backend.backendUrl}/profile-activities/${missionId}`,
      { status: newStatus },
    );
  }
}
