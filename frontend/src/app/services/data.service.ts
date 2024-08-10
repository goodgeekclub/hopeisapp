import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Character } from '../interfaces/character.interface';
import { Data } from '../interfaces/data.interface';
import { Stats } from '../interfaces/stats.interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private baseUrl = `${environment.backend.backendUrl}/data`;

  constructor(private http: HttpClient) {}

  getStats() {
    const url = `${this.baseUrl}/stats`;
    return this.http.get<Data<Stats>[]>(url).pipe(
      map(res => res[0])
    )
  }

  getCharacters(name: string) {
    const url = `${this.baseUrl}/characters/`
    return this.http.get<Data<Character>[]>(url);
  }

  getCharacterByName(name: string) {
    const url = `${this.baseUrl}/characters/${name}`
    return this.http.get<Data<Character>>(url);
  }
}
