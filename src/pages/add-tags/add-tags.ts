import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, MenuController, AlertController, ToastController } from 'ionic-angular';
import { TagsPage } from '../tags/tags';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import {storage} from 'firebase';
import { Tag } from '../../models/tag';
import { AddTagService } from '../../services/add-tag.service';
import { ColorsPage } from '../colors/colors';

/**
 * Generated class for the AddTagsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-tags',
  templateUrl: 'add-tags.html',
})
export class AddTagsPage {

   tag: Tag = {
    tagName: '',
    colorSrc: '../../assets/colors/red.jpg'
   };

  constructor(public navCtrl: NavController, public navParams: NavParams, public nav: Nav,
  public alertCtrl: AlertController, private addTags: AddTagService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTagsPage');
  }

  addTag(tag:Tag){

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
    else {
      let confirm = this.alertCtrl.create({
        title: 'Success!',
        message: "Data Uploaded",
        buttons: [
          {
            text: 'OK',
            handler: data => {
              this.addTags.addTag(tag).then(ref => {
              this.navCtrl.push(TagsPage, { key: ref.key })
            });
          }
        }
        ]
      });
      confirm.present();
    }
  }

  changeColor(tag:Tag){

    this.navCtrl.push(ColorsPage, {tag:tag});
  }

}
