//Providers
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

//AngularFire
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { FIREBASE_CONFIG } from "./app.firebase.config";
import { AngularFirestoreModule } from 'angularfire2/firestore';
//Core
import { CoreModule } from '../core/core.module';

export const MODULES = [
   
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFirestoreModule,
    AngularFireAuthModule,
    CoreModule
];

export const PROVIDERS = [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
];

export const DIRECTIVES = [];
