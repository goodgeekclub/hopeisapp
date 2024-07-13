import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { WorldExploreComponent } from './features/world-explore/world-explore.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'world-explore',
    component: WorldExploreComponent
  }
];
