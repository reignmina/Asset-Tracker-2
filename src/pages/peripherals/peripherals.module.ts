import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PeripheralsPage } from './peripherals';

@NgModule({
  declarations: [
    PeripheralsPage,
  ],
  imports: [
    IonicPageModule.forChild(PeripheralsPage),
  ],
})
export class PeripheralsPageModule {}
