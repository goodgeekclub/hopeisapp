import { Analytics, logEvent, setCurrentScreen } from '@angular/fire/analytics';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from 'angular-svg-icon';
import { AuthService } from './services';
import { environment } from '../environments/environment';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { getToken, Messaging, onMessage } from '@angular/fire/messaging';
import { Observable, tap } from 'rxjs';
import { onBackgroundMessage } from "firebase/messaging/sw";


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
  private messaging = inject(Messaging);
  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    logEvent(this.analytics, 'screen_view');
    this.authService.getUserState().subscribe(async (user) => {
      if (!environment.production) {
        console.log(user);
        console.log('accessToken', await user.getIdToken());
      }
    });
    console.log(Notification.permission)
    Notification.requestPermission().then(
      (notificationPermissions: NotificationPermission) => {
        if (notificationPermissions === "granted") {
          console.log("Granted");
        }
        if (notificationPermissions === "denied") {
          console.log("Denied");
        }
      }).catch(e => {
        console.log(e);
      });
    this.requestPermission();
    this.listen();
  }

  requestPermission() {
    getToken(this.messaging, {vapidKey: environment.vapidKey})
      .then((currentToken) => {
        if (currentToken) {
          console.log('FCM Token:', currentToken);
        } else {
          console.log('No registration token available. Request permission to generate one.');
        }
      }).catch((err) => {
        console.log('Error:', err);
      });
  }
  listen() {
    onMessage(this.messaging, {
      next: (payload) => {
        console.log(payload);
        alert(JSON.stringify(payload.notification))
      },
      error: (error) => console.log('Message error', error),
      complete: () => console.log('Done listening to messages'),
    });
  }
}
