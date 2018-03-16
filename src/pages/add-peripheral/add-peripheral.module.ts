import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPeripheralPage } from './add-peripheral';

@NgModule({
  declarations: [
    AddPeripheralPage,
  ],
  imports: [
    IonicPageModule.forChild(AddPeripheralPage),
  ],
})
export class AddPeripheralPageModule {}
