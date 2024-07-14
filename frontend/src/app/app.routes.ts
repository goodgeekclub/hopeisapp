import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginTestComponent } from './features/test/login-test/login-test.component';
import { MemberTestComponent } from './features/test/member-test/member-test.component';
import { TestComponent } from './features/test/test.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { AuthGuard } from './auth.guard';
import { NameInputComponent } from './features/test/name-input/name-input.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
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
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
