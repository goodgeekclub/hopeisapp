import { Injectable } from "@angular/core";
import { Messaging, getToken, onMessage, deleteToken } from "@angular/fire/messaging";
import { environment } from "../../environments/environment.development";

@Injectable({
  providedIn: "root",
})
export class FcmService {
  constructor(private messaging: Messaging){
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