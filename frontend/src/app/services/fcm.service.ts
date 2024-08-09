import { Injectable } from '@angular/core';
import {
  Messaging,
  getToken,
  onMessage,
} from '@angular/fire/messaging';
import { environment } from '../../environments/environment.development';
import { MeService } from './me.service';


@Injectable({
  providedIn: 'root',
})
export class FcmService {
  private fcmToken?: string;

  constructor(
    private messaging: Messaging,
    private meService: MeService,
  ) {
    this.requestPermission();
    this.listen();
  }

  getFcmToken() {
    return this.fcmToken;
  }

  requestPermission() {
    if (navigator.serviceWorker) {
      navigator.serviceWorker.register('assets/firebase-messaging-sw.js', { type: 'module' }).then(registration => {
        Notification.requestPermission()
          .then((notificationPermissions: NotificationPermission) => {
            if (notificationPermissions === 'granted') {
              console.log('Granted');
              return this.getToken();
            } else {
              console.log('Denied');
            }
            return;
          })
          .catch((e) => {
            console.log(e);
          });
      })
    }

  }
  async getToken() {
    try {
      const fcmToken = await getToken(this.messaging, { vapidKey: environment.vapidKey });
      if (fcmToken) {
        console.log('FCM Token:', fcmToken);
        this.fcmToken = fcmToken;
      } else {
        console.log(
          'No registration token available. Request permission to generate one.');
      }
    } catch (err) {
      console.log('Error:', err);
    }
  }
  listen() {
    onMessage(this.messaging, {
      next: (payload) => {
        console.log(payload);
        alert(JSON.stringify(payload.notification));
      },
      error: (error) => console.log('Message error', error),
      complete: () => console.log('Done listening to messages'),
    });
  }
}
