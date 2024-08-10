import { Analytics, logEvent } from '@angular/fire/analytics';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from 'angular-svg-icon';
import { AuthService } from './services';
import { environment } from '../environments/environment';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    SvgIconComponent,
    LoadingBarRouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'frontend';
  private analytics = inject(Analytics);
  constructor(private authService: AuthService) {
    if (environment.production) {
      console.log = function () {};
      console.error = function () {};
      console.warn = function () {};
    }
  }

  ngOnInit(): void {
    logEvent(this.analytics, 'screen_view');
    if (!environment.production) {
      this.authService.getUserState().subscribe(async user => {
        console.log(user);
        console.log('accessToken', await user.getIdToken());
      });
    }
  }
}
