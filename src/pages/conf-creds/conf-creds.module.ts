import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfCredsPage } from './conf-creds';

@NgModule({
  declarations: [
    ConfCredsPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfCredsPage),
  ],
})
export class ConfCredsPageModule {}
