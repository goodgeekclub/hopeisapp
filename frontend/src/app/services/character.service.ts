import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private baseUrl = `${environment.backend.backendUrl}/data/characters/`;

  constructor(private http: HttpClient) {}

  getCharacterByType(characterType: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?name=${characterType}`);
  }
}
