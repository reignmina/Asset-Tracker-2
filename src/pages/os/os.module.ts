import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OsPage } from './os';

@NgModule({
  declarations: [
    OsPage,
  ],
  imports: [
    IonicPageModule.forChild(OsPage),
  ],
})
export class OsPageModule {}
