import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from "rxjs";
import { ViewAssetPage } from '../view-asset/view-asset';
import { HomePage } from '../home/home';

/**
 * Generated class for the ViewCustodianPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-custodian',
  templateUrl: 'view-custodian.html',
})
export class ViewCustodianPage {
  
  persons: Array<{firstname: string, middlename: string, lastname: string, eid: string, img: string }>;

  public assetRef: AngularFireList<any>;
  assets: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private menu: MenuController, private viewPic: PhotoViewer, private afDatabase: AngularFireDatabase,) {

    this.persons =[
      {firstname: navParams.get('firstname'), middlename: navParams.get('middlename'), lastname: navParams.get('lastname'),
      eid: navParams.get('eid'), img: navParams.get('img')}
    ];

    this.assetRef = this.afDatabase.list("/Assets/items");
    this.assets = this.assetRef.valueChanges();
  }


  viewImg(picture){
    this.viewPic.show(picture);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewPeoplePage');
    console.log(this.persons);
  }

  ionViewDidEnter() {
    this.menu.swipeEnable(false, 'left' ); this.menu.swipeEnable(false, 'right' );
  
    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(false, 'menu1');
  }
  
  ionViewWillLeave() {
    // Don't forget to return the swipe to normal, otherwise 
    // the rest of the pages won't be able to swipe to open menu
    this.menu.swipeEnable(true);
    }

    viewAsset(Assignee, Cube, Hard_Disk, Memory, Model, Number, OS, Owner, Serial, Type, id, img) {
      this.navCtrl.push(ViewAssetPage, {
        Assignee, Cube, Hard_Disk, Memory, Model, Number, OS, Owner, Serial, Type, id, img
      });
    }

    goHome(){
      this.navCtrl.setRoot(HomePage);
    }

}
