import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ColorpickPage } from './colorpick';

@NgModule({
  declarations: [
    ColorpickPage,
  ],
  imports: [
    IonicPageModule.forChild(ColorpickPage),
  ],
})
export class ColorpickPageModule {}
