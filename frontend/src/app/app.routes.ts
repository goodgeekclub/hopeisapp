import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { WorldExploreComponent } from './features/world-explore/world-explore.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { testRoutes } from './features/test/test.routes';
import { NameInputComponent } from './features/test/name-input/name-input.component';
import { QuizStartComponent } from './features/quiz/quiz-start/quiz-start.component';
import { QuestionComponent } from './features/quiz/question/question.component';
import { QuizComponent } from './features/quiz/quiz.component';
import { StoryComponent } from './features/story/story.component';
import { ResultComponent } from './features/quiz/result/result.component';
import { ResultCharacterComponent } from './features/quiz/result/result-character/result-character.component';
import { AdminConsoleComponent } from './features/admin-console/admin-console.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  ...testRoutes,
  {
    path: 'admin-console',
    component: AdminConsoleComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'quiz',
    component: QuizComponent,
    children: [
      {
        path: 'enter-your-name',
        component: NameInputComponent,
      },
      {
        path: 'start',
        component: QuizStartComponent,
      },
      {
        path: 'question/:id',
        component: QuestionComponent,
      },
      {
        path: 'result',
        component: ResultComponent,
      },
      {
        path: 'result/:id',
        component: ResultCharacterComponent,
      },
    ],
  },
  {
    path: 'world-explore',
    component: WorldExploreComponent,
  },
  {
    path: 'story',
    component: StoryComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
