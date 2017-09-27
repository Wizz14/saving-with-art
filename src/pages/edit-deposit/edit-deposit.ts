import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { DepositItem } from "../../models/deposit";
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'page-edit-deposit',
  templateUrl: 'edit-deposit.html',
})
export class EditDepositPage {

  depoitItemSubscription: Subscription;
  depositItemRef$: FirebaseObjectObservable<DepositItem>;
  depositItem = {} as DepositItem;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, public navParams: NavParams, private db: AngularFireDatabase) {
    const depositItemId = this.navParams.get('depositItemId');
    this.depositItemRef$ = this.db.object('deposit-list/' + depositItemId);
    this.depoitItemSubscription = this.depositItemRef$.subscribe(depositItem => { this.depositItem = depositItem });
  }

  ionViewWillLeave() {
    this.depoitItemSubscription.unsubscribe();
  }

  editDeposit(depositItem: DepositItem) {
    if (this.isNullOrUndefined(depositItem.name) || this.isNullOrUndefined(depositItem.amount)) {
      this.showAlert();
      return;
    }
    depositItem.isReject = false;
    this.depositItemRef$.update(depositItem);
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
