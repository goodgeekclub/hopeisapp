import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { testRoutes } from './features/test/test.routes';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  ...testRoutes,
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
