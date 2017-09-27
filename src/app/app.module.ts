import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { DepositPage } from "../pages/deposit/deposit";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FIREBASE_CONFIG } from './app.firebase.config';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AddDepositPage } from "../pages/add-deposit/add-deposit";
import { EditDepositPage } from "../pages/edit-deposit/edit-deposit";
import { ApprovePage } from "../pages/approve/approve";
import { SummaryPage } from "../pages/summary/summary";
import { FirebaseErrorPage } from "../pages/firebase-error/firebase-error";
// import { NoPermissionPage } from "../pages/no-permission/no-permission";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
    DepositPage,
    AddDepositPage,
    EditDepositPage,
    ApprovePage,
    SummaryPage,
    FirebaseErrorPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
    DepositPage,
    AddDepositPage,
    EditDepositPage,
    ApprovePage,
    SummaryPage,
    FirebaseErrorPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
