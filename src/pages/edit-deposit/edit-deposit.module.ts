import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditDepositPage } from './edit-deposit';

@NgModule({
  declarations: [
    EditDepositPage,
  ],
  imports: [
    IonicPageModule.forChild(EditDepositPage),
  ],
})
export class EditDepositPageModule {}
