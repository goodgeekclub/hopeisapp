import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Choice {
  title: string;
  score: number;
}

export interface Question {
  id: string;
  title: string;
  choices: Choice[];
}

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private questions: Question[] = [
    {
      id: '1',
      title: 'You find it easy to introduce yourself to other people.',
      choices: [
        { title: 'Strongly Agree', score: 5 },
        { title: 'Agree', score: 4 },
        { title: 'Neutral', score: 3 },
        { title: 'Disagree', score: 2 },
        { title: 'Strongly Disagree', score: 1 },
      ],
    },
    {
      id: '2',
      title:
        'You often get so lost in thoughts that you ignore or forget your surroundings.',
      choices: [
        { title: 'Strongly Agree', score: 5 },
        { title: 'Agree', score: 4 },
        { title: 'Neutral', score: 3 },
        { title: 'Disagree', score: 2 },
        { title: 'Strongly Disagree', score: 1 },
      ],
    },
    {
      id: '3',
      title:
        'You try to respond to your emails as soon as possible and cannot stand a messy inbox.',
      choices: [
        { title: 'Strongly Agree', score: 5 },
        { title: 'Agree', score: 4 },
        { title: 'Neutral', score: 3 },
        { title: 'Disagree', score: 2 },
        { title: 'Strongly Disagree', score: 1 },
      ],
    },
    {
      id: '4',
      title:
        'You find it easy to stay relaxed and focused even when there is some pressure.',
      choices: [
        { title: 'Strongly Agree', score: 5 },
        { title: 'Agree', score: 4 },
        { title: 'Neutral', score: 3 },
        { title: 'Disagree', score: 2 },
        { title: 'Strongly Disagree', score: 1 },
      ],
    },
    {
      id: '5',
      title: 'You do not usually initiate conversations.',
      choices: [
        { title: 'Strongly Agree', score: 5 },
        { title: 'Agree', score: 4 },
        { title: 'Neutral', score: 3 },
        { title: 'Disagree', score: 2 },
        { title: 'Strongly Disagree', score: 1 },
      ],
    },
  ];

  getQuestion(id: string): Observable<Question> {
    const question = this.questions.find((q) => q.id === id) || {
      id: '0',
      title: 'Question not found',
      choices: [],
    };
    return of(question);
  }

  getTotalQuestions(): number {
    return this.questions.length;
  }
}
