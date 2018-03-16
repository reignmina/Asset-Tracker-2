import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewPeoplePage } from './view-people';

@NgModule({
  declarations: [
    ViewPeoplePage,
  ],
  imports: [
    IonicPageModule.forChild(ViewPeoplePage),
  ],
})
export class ViewPeoplePageModule {}
