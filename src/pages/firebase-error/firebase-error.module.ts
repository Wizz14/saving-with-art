import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FirebaseErrorPage } from './firebase-error';

@NgModule({
  declarations: [
    FirebaseErrorPage,
  ],
  imports: [
    IonicPageModule.forChild(FirebaseErrorPage),
  ],
})
export class FirebaseErrorPageModule {}
