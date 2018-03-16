import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddAssetPage } from './add-asset';

@NgModule({
  declarations: [
    AddAssetPage,
  ],
  imports: [
    IonicPageModule.forChild(AddAssetPage),
  ],
})
export class AddAssetPageModule {}
