import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { NameInputComponent } from './features/name-input/name-input.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'test-name-input',
    component: NameInputComponent,
  }
];
