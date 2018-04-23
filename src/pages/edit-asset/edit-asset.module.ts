import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditAssetPage } from './edit-asset';

@NgModule({
  declarations: [
    EditAssetPage,
  ],
  imports: [
    IonicPageModule.forChild(EditAssetPage),
  ],
})
export class EditAssetPageModule {}
