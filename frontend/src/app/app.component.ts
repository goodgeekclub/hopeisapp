import { FcmService } from './services/fcm.service';
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
  constructor(private authService: AuthService, private FcmService: FcmService) {
  }

  ngOnInit(): void {
    logEvent(this.analytics, 'screen_view');
    this.authService.getUserState().subscribe(async (user) => {
      if (!environment.production) {
        console.log(user);
        console.log('accessToken', await user.getIdToken());
      }
    });
  }
}
