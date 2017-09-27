import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from "../pages/login/login";

import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // rootPage: any = TabsPage;
  rootPage: any = LoginPage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    angularFireAuth: AngularFireAuth
  ) {
    platform.ready().then(() => {
      
      statusBar.styleDefault();
      splashScreen.hide();

      let unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (user == null) {
          this.rootPage = LoginPage;
          // unsubscribe();
        } else {
          this.rootPage = TabsPage;
          // unsubscribe();
        }
      });

    });

  }
}
