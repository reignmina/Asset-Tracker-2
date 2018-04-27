import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, MenuController, AlertController, ToastController} from 'ionic-angular';
import { AddTagsPage } from '../add-tags/add-tags';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import {storage} from 'firebase';
import { AddTagService } from '../../services/add-tag.service';
import { EditTagPage } from '../edit-tag/edit-tag';
import { Tag } from '../../models/tag';

/**
 * Generated class for the TagsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tags',
  templateUrl: 'tags.html',
})
export class TagsPage {
  @ViewChild(Nav) nav: Nav;

  tagListRef: AngularFireList<any>;
  tagList: Observable<Tag[]>;
  tag: Tag = {
    tagName: '',
    colorSrc: ''
   };

  constructor(public navCtrl: NavController, public navParams: NavParams, private serviceTags: AddTagService, private afDatabase: AngularFireDatabase, public alertCtrl: AlertController) {

  // this.tagListRef = this.afDatabase.list('tagList/');
  // this.tagList = this.tagListRef.valueChanges();

  this.tagList = this.serviceTags
  .getTagList()
  .snapshotChanges()

  .map(
    changes => {
      return changes.map(c =>
      ({
        key: c.payload.key,  ...c.payload.val()
      }))
    }
  )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TagsPage');
  }

  openAddTags(){
    this.navCtrl.push(AddTagsPage);
  }

  openEdit(tag){
    this.navCtrl.push(EditTagPage, {tag: tag});
  }

  removeTag(tag:Tag){
       let confirm = this.alertCtrl.create({
        title: 'Delete tag',
        message: "Are you sure you wanna delete this tag?",
        buttons: [
          {
            text: 'No',
            handler: () => {
              console.log('Prompt canceled')
            }
          },

          {
            text: 'Yes',
            handler: () => {
              this.serviceTags.removeTag(tag)
            }
          }

        ]
      });
      confirm.present();
      // this.navCtrl.push(TagsPage);
    }
  }
