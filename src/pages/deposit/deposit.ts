import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Subscription } from "rxjs/Subscription";

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database'
import { DepositItem } from "../../models/deposit";
import { AddDepositPage } from "../add-deposit/add-deposit";
import { EditDepositPage } from "../edit-deposit/edit-deposit";
import { FirebaseErrorPage } from "../firebase-error/firebase-error";


@IonicPage()
@Component({
  selector: 'page-deposit',
  templateUrl: 'deposit.html',
})
export class DepositPage {

  isAuthen: boolean = false;
  depositListRef$: FirebaseListObservable<DepositItem[]>
  depoitListSubscription: Subscription;
  depositItems: DepositItem[];
  isLoading: boolean = true;


  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase, private actionSheetCtrl: ActionSheetController) {
    this.isAuthen = true;
    this.depositListRef$ = this.db.list('deposit-list', { query: { limitToLast: 20, orderByChild: 'depositDate', } });
    this.depoitListSubscription = this.depositListRef$.subscribe(depositItem => {
      this.depositItems = depositItem;
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
      this.navCtrl.setRoot(FirebaseErrorPage, { error: error });
    });
  }


  ionViewDidLoad() {
  }

  navigateToAddDeposit() {
    this.navCtrl.push(AddDepositPage);
  }

  showActionSheet(item: DepositItem) {
    if (!item.isApproved) {

      let actionSheet = this.actionSheetCtrl.create({
        title: item.name,
        buttons: [
          {
            text: 'Delete',
            role: 'destructive',
            handler: () => {
              this.depositListRef$.remove(item.$key);

            }
          },
          {
            text: 'Edit',
            handler: () => {
              this.navCtrl.push(EditDepositPage, { 'depositItemId': item.$key })
            }
          },
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
            }
          }
        ]
      });
      actionSheet.present();
    }

  }

}
