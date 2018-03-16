import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CubesPage } from './cubes';

@NgModule({
  declarations: [
    CubesPage,
  ],
  imports: [
    IonicPageModule.forChild(CubesPage),
  ],
})
export class CubesPageModule {}
