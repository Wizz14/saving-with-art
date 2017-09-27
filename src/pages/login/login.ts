import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import * as firebase from 'firebase/app';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  isLoadingDone: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController
  ) {
    let loader = this.loadingCtrl.create({
      content: "Loading ...",
    });
    loader.present();

    setTimeout(() => {
      this.isLoadingDone = true;
      loader.dismiss();
    }, 1500);
  }
  async loginWithFacebook() {
    let loading = this.loadingCtrl.create({
      content: 'Loading ...',
      dismissOnPageChange: true
    });
    loading.present();
    var provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithPopup(provider).then(
      function (authData) {
        // console.log(authData);
      }
    ).catch(function (error) {
    });
  }



}
