import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MissionService {
  constructor(private http: HttpClient) {}

  getMission(): Observable<any[]> {
    return this.http.get<any[]>(
      `${environment.backend.backendUrl}/profile-activities?status=PENDING`,
    );
  }

  updateMissionStatus(missionId: string, newStatus: string): Observable<any> {
    return this.http.patch(
      `${environment.backend.backendUrl}/profile-activities/${missionId}`,
      { status: newStatus },
    );
  }
}
