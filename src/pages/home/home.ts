import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import * as firebase from 'firebase/app';
import { LoginPage } from "../login/login";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user: any;
  constructor(
    public navCtrl: NavController,
    navParams: NavParams
    ) {
    this.user = firebase.auth().currentUser;//navParams.data;
    // console.log(this.user);
  }


  signOut() {
    firebase.auth().signOut();
    this.navCtrl.setRoot(LoginPage);
  }

}
