import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddCustodianPage } from './add-custodian';

@NgModule({
  declarations: [
    AddCustodianPage,
  ],
  imports: [
    IonicPageModule.forChild(AddCustodianPage),
  ],
})
export class AddCustodianPageModule {}
