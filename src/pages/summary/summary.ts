import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import { DepositItem } from "../../models/deposit";
import { Subscription } from "rxjs/Subscription";
import { FirebaseErrorPage } from "../firebase-error/firebase-error";

@Component({
  selector: 'page-summary',
  templateUrl: 'summary.html',
})
export class SummaryPage {

  depositListRefSubscription: Subscription;
  depositListRef$: FirebaseListObservable<DepositItem[]>
  depositList: DepositItem[];
  isLoading: boolean = true;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private db: AngularFireDatabase) {
  }

  ionViewDidEnter() {
    this.depositListRef$ = this.db.list('deposit-list');
    this.depositListRefSubscription = this.depositListRef$.subscribe(items => {
      this.depositList = items;
      this.isLoading = false;
    }, error => {
      this.navCtrl.setRoot(FirebaseErrorPage, { error: error });
      this.isLoading = false;
    });
  }


  ionViewWillLeave() {
    this.depositListRefSubscription.unsubscribe();
  }

  countBank(items: DepositItem[]) {
    if (items) {
      return items.filter(x => x.isBank).length;
    }
    return 0;
  }

  summaryBank(items: DepositItem[]) {
    if (items) {
      return items.filter(x => x.isBank).reduce(
        (previousValue, currentValue) =>
          previousValue + currentValue.amount, 0);
    }
    return 0;
  }

  countApproved(items: DepositItem[]) {
    if (items) {
      return items.filter(x => !x.isBank && x.isApproved).length;
    }
    return 0;
  }

  summaryApproved(items: DepositItem[]) {
    if (items) {
      return items.filter(x => !x.isBank && x.isApproved).reduce(
        (previousValue, currentValue) =>
          previousValue + currentValue.amount, 0);
    }
    return 0;
  }

  countWaiting(items: DepositItem[]) {
    if (items) {
      return items.filter(x => !x.isBank && !x.isApproved).length;
    }
    return 0;
  }

  summaryWaiting(items: DepositItem[]) {
    if (items) {
      return items.filter(x => !x.isBank && !x.isApproved).reduce(
        (previousValue, currentValue) =>
          previousValue + currentValue.amount, 0);
    }
    return 0;
  }
}
