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

  getMission(status?: string): Observable<IProfileActivities[]> {
    if (!status) {
      status = 'PENDING'
    }
    return this.http.get<IProfileActivities[]>(
      `${environment.backend.backendUrl}/profile-activities/`,
      // {
      //   params: new HttpParams().append('status', status),
      // }
    );
  }

  updateMissionStatus(missionId: string, newStatus: string): Observable<IProfileActivities> {
    return this.http.patch<IProfileActivities>(
      `${environment.backend.backendUrl}/profile-activities/${missionId}`,
      { status: newStatus },
    );
  }
}
