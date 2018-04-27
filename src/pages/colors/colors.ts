import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddTagsPage } from '../add-tags/add-tags';
import { Tag } from '../../models/tag';
import { AddTagService } from '../../services/add-tag.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';



/**
 * Generated class for the ColorsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-colors',
  templateUrl: 'colors.html',
})
export class ColorsPage {

   tag: Tag={
    tagName:'',
    colorSrc: ''
   };

  //  colorSrcRed:string='../../assets/colors/red.jpg';
  //  colorSrcBlue:string='../../assets/colors/blue.jpg';
  //  colorSrcGreen:string='../../assets/colors/green.jpg';
  //  colorSrcPurple:string='../../assets/colors/purple.jpg';
  //  colorSrcYellow:string='../../assets/colors/yellow.jpg';


  constructor(public navCtrl: NavController, public navParams: NavParams, public addTags: AddTagService, public alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    this.tag= this.navParams.get('tag');
  }

  colorRed(tag:Tag){

    let confirm = this.alertCtrl.create({
      title: 'You Chose Red',
      cssClass: 'alertRed',
      buttons: [
        {
          text: 'OK',
          handler: () => {
    this.tag.colorSrc="../../assets/colors/red.jpg";
    }
  }
]
});
confirm.present();
}


  colorBlue(tag:Tag){

    let confirm = this.alertCtrl.create({
      title: 'You Chose Blue',
      cssClass: 'alertBlue',
      buttons: [
        {
          text: 'OK',
          handler: data => {

    this.tag.colorSrc="../../assets/colors/blue.jpg";
    }
  }
]
});
confirm.present();
  }

  colorGreen(tag:Tag){

    let confirm = this.alertCtrl.create({
      title: 'You Chose Green',
      cssClass: 'alertGreen',
      buttons: [
        {
          text: 'OK',
          handler: data => {

    this.tag.colorSrc="../../assets/colors/green.jpg";
    }
  }
]
});
confirm.present();
    }

  colorPurple(tag:Tag){

    let confirm = this.alertCtrl.create({
      title: 'You Chose Purple',
      cssClass: 'alertPurple',
      buttons: [
        {
          text: 'OK',
          handler: data => {

    this.tag.colorSrc="../../assets/colors/purple.jpg";
    }
  }
]
});
confirm.present();
  }

  colorYellow(tag:Tag){

    let confirm = this.alertCtrl.create({
      title: 'You Chose Yellow',
      cssClass: 'alertYellow',
      buttons: [
        {
          text: 'OK',
          handler: data => {

    this.tag.colorSrc="../../assets/colors/yellow.jpg";
    // this.addTags.editTag(tag);
    }
  }
]
});
confirm.present();
  }

}

