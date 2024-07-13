import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import * as admin from "firebase-admin";
import { firebaseConfig } from "src/firebase/firebase-config/config";
let app: admin.app.App = null;
@Injectable()
export class FirebaseAdmin implements OnApplicationBootstrap {
    async onApplicationBootstrap() {
        if (!app) {
            app = admin.initializeApp(firebaseConfig);
        }
    }
    setup() {
        return app;
    }
}