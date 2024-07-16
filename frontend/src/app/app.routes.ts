import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { NameInputComponent } from './features/name-input/name-input.component';
import { QuizStartComponent } from './features/quiz-start/quiz-start.component';
import { QuizComponent } from './features/quiz/quiz.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'enter-name',
    pathMatch: 'full',
  },
  {
    path: 'enter-name',
    component: NameInputComponent,
  },
  {
    path: 'start-quiz',
    component: QuizStartComponent,
  },
  {
    path: 'quiz',
    component: QuizComponent,
  },
  {
    path: '**',
    redirectTo: 'enter-name',
  },
];
