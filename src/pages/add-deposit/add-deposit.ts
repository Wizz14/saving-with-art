import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DepositItem } from "../../models/deposit";
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-add-deposit',
  templateUrl: 'add-deposit.html',
})
export class AddDepositPage {

  depositItem = {} as DepositItem;
  depositItemRef$: FirebaseListObservable<DepositItem[]>;
  
  constructor(public navCtrl: NavController, private alertCtrl: AlertController, public navParams: NavParams, private db: AngularFireDatabase) {
    this.depositItemRef$ = this.db.list('deposit-list');
  }

  ionViewDidLoad() {
  }

  addDeposit(depositItem: DepositItem) {
    if (this.isNullOrUndefined(depositItem.name) || this.isNullOrUndefined(depositItem.amount)) {
      this.showAlert();
      return;
    }
    this.depositItemRef$.push({
      name: depositItem.name,
      amount: Number(depositItem.amount),
      depositDate: firebase.database.ServerValue.TIMESTAMP,
      isApproved: false,
      isBank: false,
      isReject: false
    });
    this.depositItem = {} as DepositItem;
    this.navCtrl.pop();

  }

  isNullOrUndefined(value: any) {
    if (value == null || value == undefined || value == '') {
      return true;
    }
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Hey bro',
      subTitle: 'ใส่ค่าให้ครบด้วยน้องสาว',
      buttons: ['OK']
    });
    alert.present();
  }
}