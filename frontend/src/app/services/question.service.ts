import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Question {
  id: string;
  text: string;
  options: string[];
}

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private questions: Question[] = [
    {
      id: '1',
      text: 'You find it easy to introduce yourself to other people.',
      options: [
        'Strongly Agree',
        'Agree',
        'Neutral',
        'Disagree',
        'Strongly Disagree',
      ],
    },
    {
      id: '2',
      text: 'You often get so lost in thoughts that you ignore or forget your surroundings.',
      options: [
        'Strongly Agree',
        'Agree',
        'Neutral',
        'Disagree',
        'Strongly Disagree',
      ],
    },
    {
      id: '3',
      text: 'You try to respond to your emails as soon as possible and cannot stand a messy inbox.',
      options: [
        'Strongly Agree',
        'Agree',
        'Neutral',
        'Disagree',
        'Strongly Disagree',
      ],
    },
    {
      id: '4',
      text: 'You find it easy to stay relaxed and focused even when there is some pressure.',
      options: [
        'Strongly Agree',
        'Agree',
        'Neutral',
        'Disagree',
        'Strongly Disagree',
      ],
    },
    {
      id: '5',
      text: 'You do not usually initiate conversations.',
      options: [
        'Strongly Agree',
        'Agree',
        'Neutral',
        'Disagree',
        'Strongly Disagree',
      ],
    },
  ];

  getQuestion(id: string): Observable<Question> {
    const question = this.questions.find((q) => q.id === id) || {
      id: '0',
      text: 'Question not found',
      options: [],
    };
    return of(question);
  }

  getTotalQuestions(): number {
    return this.questions.length;
  }
}
