import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginTestComponent } from './features/test/login-test/login-test.component';
import { MemberTestComponent } from './features/test/member-test/member-test.component';
import { TestComponent } from './features/test/test.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { NameInputComponent } from './features/test/name-input/name-input.component';
import { AuthGuard } from './auth.guard';
import { ResultTestComponent } from './features/test/result-test/result-test.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'test',
    component: TestComponent,
    children: [
      {
        path: 'login',
        component: LoginTestComponent,
      },
      {
        path: 'member',
        component: MemberTestComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'name-input',
        component: NameInputComponent,
      },
      {
        path: 'result',
        component: ResultTestComponent,
      },
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
