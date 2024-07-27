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
  id: string;
  title: string;
  subtitle?: string;
  choices: Choice[];
}

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private http: HttpClient) {}

  getQuestion(id: string): Observable<Question> {
    return this.http
      .get<any>(`${environment.backend.quizes}`)
      .pipe(
        map((response) => {
          const questionData = response[0].data.questions.find(
            (q: any) => q.id === id
          );
          return {
            id: questionData.id,
            title: questionData.title,
            choices: questionData.choices.map((choice: any) => ({
              title: choice.title,
              score: choice.score,
              type: choice.type,
            })),
          };
        })
      );
  }

  getTotalQuestions(): Observable<number> {
    return this.http
      .get<any>(`${environment.backend.quizes}`)
      .pipe(
        map((response) => {
          return response[0].data.questions.length;
        })
      );
  }
}
