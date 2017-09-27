import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-firebase-error',
  templateUrl: 'firebase-error.html',
})
export class FirebaseErrorPage {
  error: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.error = this.navParams.get('error');
  }
}
