import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

export interface Choice {
  title: string;
  subtitle?: string;
  score: number;
  type: string;
}

export interface Question {
  id: number;
  title: string;
  subtitle?: string;
  choices: Choice[];
}

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private apiKey = environment.backend.apiKey;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'x-api-key': this.apiKey,
    });
  }

  getQuestion(id: string): Observable<Question> {
    return this.http
      .get<any>(`${environment.backend.backendUrl}/data/quizes`, {
        headers: this.getHeaders(),
      })
      .pipe(
        map((response) => {

          if (
            !response ||
            !response[0] ||
            !response[0].data ||
            !Array.isArray(response[0].data.questions)
          ) {
            throw new Error('Invalid API response structure');
          }

          const questionData = response[0].data.questions.find(
            (q: any) => q.idx === parseInt(id, 10)
          );

          if (!questionData) {
            throw new Error(`Question with id ${id} not found`);
          }

          return {
            id: questionData.idx,
            title: questionData.title,
            subtitle: questionData.subtitle,
            choices: questionData.choices.map((choice: any) => ({
              title: choice.title,
              subtitle: choice.subtitle,
              score: choice.score,
              type: choice.type,
            })),
          };
        })
      );
  }

  getTotalQuestions(): Observable<number> {
    return this.http
      .get<any>(`${environment.backend.backendUrl}/data/quizes`, {
        headers: this.getHeaders(),
      })
      .pipe(
        map((response) => {
          if (
            !response ||
            !response[0] ||
            !response[0].data ||
            !Array.isArray(response[0].data.questions)
          ) {
            throw new Error('Invalid API response structure');
          }

          return response[0].data.questions.length;
        })
      );
  }
}
