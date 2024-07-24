import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
// import { NameInputComponent } from './features/name-input/name-input.component';
import { AdminConsole } from './features/admin-console/admin-console.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  // ...testRoutes,
  // {
  //   path: 'test-name-input',
  //   component: NameInputComponent,
  // },
  {
    path: 'admin-console',
    component: AdminConsole,
  }
];
