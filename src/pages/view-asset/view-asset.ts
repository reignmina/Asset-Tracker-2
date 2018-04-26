import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditAssetPage } from '../edit-asset/edit-asset';
import { HomePage } from '../home/home';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

/**
 * Generated class for the ViewAssetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-asset',
  templateUrl: 'view-asset.html',
})
export class ViewAssetPage {

  peripRef: AngularFireList<any>;
  perip: Observable<any[]>;

  assets: Array<{Assignee: string, Cube: string, Hard_Disk: string, Memory: string, Model: string,
     Number: string, OS: string, Owner: string, Project: string, Serial: string, Type: string, id: string, img: string, Peripherals: any}>

  constructor(public navCtrl: NavController, public navParams: NavParams, private afDatabase: AngularFireDatabase,) {

    this.assets =[{
      Assignee: navParams.get("Assignee"), Cube: navParams.get("Cube"), Hard_Disk: navParams.get("Hard_Disk"),
       Memory: navParams.get("Memory"), Model: navParams.get("Model"),
     Number: navParams.get("Number"), OS: navParams.get("OS"), Owner: navParams.get("Owner"), Project: navParams.get("Project"), Serial: navParams.get("Serial"),
      Type: navParams.get("Type"), id: navParams.get("id"), img: navParams.get("img"), Peripherals: navParams.get("Peripherals")
    }];

    this.peripRef = this.afDatabase.list("Assets/data/Peripherals");
    this.perip = this.peripRef.valueChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewAssetPage');
    console.log('assets mo truepa ');
    console.log(this.assets)
  }

  editAsset(Assignee, Cube, Hard_Disk, Memory, Model, Number, OS, Owner, Project, Serial, Type, id, img, Peripherals) {
    this.navCtrl.push(EditAssetPage, {
      Assignee, Cube, Hard_Disk, Memory, Model, Number, OS, Owner, Project, Serial, Type, id, img, Peripherals
    });
  }

  goHome(){
    this.navCtrl.setRoot(HomePage);
  }


}
