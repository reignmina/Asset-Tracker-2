import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';
import { Tag } from '../../models/tag';
import { AddTagService } from '../../services/add-tag.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { TagsPage } from '../tags/tags';
import { ColorsPage } from '../colors/colors';

/**
 * Generated class for the EditTagPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-tag',
  templateUrl: 'edit-tag.html',
})
export class EditTagPage {

  tag: Tag;
  constructor(public navCtrl: NavController, public navParams: NavParams, private addTags: AddTagService, public alertCtrl: AlertController, public nav: Nav) {
  }

  ionViewWillLoad() {
    this.tag= this.navParams.get('tag');
  }

  saveTag(tag:Tag){
    if (tag.tagName == '' || tag.tagName == ' '){

      let error = this.alertCtrl.create({
        title: 'Error',
        message: "Please populate the required fields!",
        buttons: [
          {
            text: 'OK',
            handler: data => {

            }
          }

        ]
      });
      error.present();
    }
  else{
    let confirm = this.alertCtrl.create({
    title: 'Success!',
    message: "Data Uploaded",
    buttons: [
      {
        text: 'OK',
        handler: data => {
          this.addTags.editTag(tag);
          this.navCtrl.push(TagsPage);

          }
        }

    ]
  });
  confirm.present();

  }
}

changeColor(tag){
  this.navCtrl.push(ColorsPage, {tag:tag});
}

}
