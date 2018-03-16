import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPeoplePage } from './add-people';

@NgModule({
  declarations: [
    AddPeoplePage,
  ],
  imports: [
    IonicPageModule.forChild(AddPeoplePage),
  ],
})
export class AddPeoplePageModule {}
