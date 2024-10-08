import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { WorldExploreComponent } from './features/world-explore/world-explore.component';
import { PageNotFoundComponent } from './features/page-not-found/page-not-found.component';
import { testRoutes } from './features/test/test.routes';
import { NameInputComponent } from './features/quiz/name-input/name-input.component';
import { QuizStartComponent } from './features/quiz/quiz-start/quiz-start.component';
import { QuestionComponent } from './features/quiz/question/question.component';
import { QuizComponent } from './features/quiz/quiz.component';
import { StoryComponent } from './features/story/story.component';
import { ResultComponent } from './features/quiz/result/result.component';
import { ResultCharacterComponent } from './features/quiz/result/result-character/result-character.component';
import { AdminPanelComponent } from './features/admin/admin-panel/admin-panel.component';
import { AuthGuard, ROLE } from './auth.guard';
import { LandingPageComponent } from './features/landing-page/landing-page.component';
import { MissionComponent } from './features/mission/mission/mission.component';
import { ResultCharacterResolver } from './resolvers/result-character.resolver';
import { StatsResolver } from './resolvers/stats.resolver';
import { AdminTableComponent } from './features/admin/admin-table/admin-table.component';
import { AdminComponent } from './features/admin/admin.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full',
  },
  ...testRoutes,
  {
    path: 'admin',
    component: AdminComponent,
    canActivateChild: [AuthGuard],
    data: {
      roles: [ROLE.SUPERUSER, ROLE.ADMIN],
    },
    children: [
      {
        path: 'console',
        component: AdminTableComponent,
      },
      {
        path: 'console/panel',
        component: AdminPanelComponent,
      },
      {
        path: 'console/panel/:id',
        component: AdminPanelComponent,
      },
    ]
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
        resolve: {
          quizResult: ResultCharacterResolver,
          stats: StatsResolver,
        },
      },
    ],
  },

  {
    path: 'world-explore',
    component: WorldExploreComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'story',
    component: StoryComponent,
  },
  {
    path: 'mission',
    component: MissionComponent,
    canActivate: [AuthGuard],
    resolve: {
      stats: StatsResolver,
    },
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
