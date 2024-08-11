import { query } from 'express';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Choice {
  title: string;
  subtitle?: string;
  score: number;
  type: string;
}

export interface Question {
  id: string;
  idx?: string;
  title: string;
  subtitle?: string;
  choices: Choice[];
}

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private baseUrl = `${environment.backend.backendUrl}/data/quizes/`;
  private quiz = new BehaviorSubject<Question[]>([]);

  constructor(private http: HttpClient) {}

  getQuestion(id: string): Observable<Question> {
    return this.getQuiz().pipe(
      map(quiz => {
        return this.findQuestion(quiz, id)
      })
    );
  }

  getQuiz() {
    const quiz = this.quiz.getValue();
    if (quiz.length === 0) {
      return this.http.get<any>(this.baseUrl).pipe(
        map(quiz => {
          this.quiz.next(quiz[0].data.questions);
          return quiz[0].data.questions;
        })
      );
    }
    return of(quiz);
  }

  getTotalQuestions(): Observable<number> {
    return of(this.quiz.getValue().length);
  }

  findQuestion(questions: Question[], id: string): Question {
    const questionData = questions.find(
      (q: any) => q.idx === parseInt(id),
    );
    if (!questionData) {
      throw new Error(`Question with id ${id} not found`);
    }
    return {
      id: questionData.idx!,
      title: questionData.title,
      subtitle: questionData.subtitle,
      choices: questionData.choices.map((choice: any) => ({
        title: choice.title,
        subtitle: choice.subtitle,
        score: choice.score,
        type: choice.type,
      })),
    };
  }
}
