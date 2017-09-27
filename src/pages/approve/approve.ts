import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import { DepositItem } from "../../models/deposit";
import { AlertController } from 'ionic-angular';
import { Subscription } from "rxjs/Subscription";
import { FirebaseErrorPage } from "../firebase-error/firebase-error";
import * as firebase from 'firebase/app';
import { User } from "../../models/user";

@Component({
  selector: 'page-approve',
  templateUrl: 'approve.html',
})
export class ApprovePage {

  depositListRef$: FirebaseListObservable<DepositItem[]>
  depoitListSubscription: Subscription;
  depositItems: DepositItem[];

  userItems: User[];

  isLoading: boolean = true;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private db: AngularFireDatabase,
    private alertCtrl: AlertController) {

  }

  ionViewDidEnter() {
    let self = this;
    this.depositListRef$ = this.db.list('deposit-list', { query: { limitToLast: 20, orderByChild: 'depositDate' } });
    this.depoitListSubscription = this.depositListRef$.subscribe(depositItem => {
      let uid = firebase.auth().currentUser.uid;
      firebase.database().ref('users/').orderByKey().equalTo(firebase.auth().currentUser.uid).once('value').then(
        function (snapshot) {
          if (snapshot.val()[uid]) {
            if (snapshot.val()[uid].isAdmin) {
              self.depositItems = depositItem;
              self.isLoading = false;
              return;
            }
          }
          self.isLoading = false;
          self.navCtrl.setRoot(FirebaseErrorPage, { error: { code: 'PERMISSION_DENIED', message: 'ไม่มีสิทธิ์ Approve จร้า' } });
        });
    }, error => {
      this.isLoading = false;
      this.navCtrl.setRoot(FirebaseErrorPage, { error: error });
    });
  }

  ionViewWillLeave() {
    this.depoitListSubscription.unsubscribe();
  }

  showRadio(item: DepositItem) {
    let alert = this.alertCtrl.create();
    alert.setTitle(item.name);
    alert.addInput({
      type: 'radio',
      label: 'Approved',
      value: 'approved',
      checked: item.isApproved && !item.isBank
    });

    alert.addInput({
      type: 'radio',
      label: 'Bank',
      value: 'bank',
      checked: item.isBank
    });

    alert.addInput({
      type: 'radio',
      label: 'Reject',
      value: 'reject',
      checked: item.isReject
    });


    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        if (data == 'approved') {
          item.isApproved = true;
          item.isReject = false;
          item.isBank = false;
          this.db.object('deposit-list/' + item.$key).update(item);
        } else if (data == 'bank') {
          item.isApproved = true;
          item.isReject = false;
          item.isBank = true;
          this.db.object('deposit-list/' + item.$key).update(item);
        } else if (data == 'reject') {
          item.isApproved = false;
          item.isReject = true;
          item.isBank = false;
          this.db.object('deposit-list/' + item.$key).update(item);
        }
      }
    });
    alert.present();
  }


}
