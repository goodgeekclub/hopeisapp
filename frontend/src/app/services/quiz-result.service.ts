import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuizResultService {
  private baseUrl = `${environment.backend.backendUrl}/quiz-results`;

  constructor(private http: HttpClient) {}

  postQuizResult(result: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.baseUrl, result, { headers });
  }

  getQuizResultById(id?: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
}
