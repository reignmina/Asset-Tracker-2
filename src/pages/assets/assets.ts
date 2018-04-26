import { Component, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Nav,
  MenuController,
  AlertController,
  ToastController
} from "ionic-angular";

import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Observable } from "rxjs";
import { Asset } from "../../models/asset";
import { AddAssetPage } from "../add-asset/add-asset";
import { AngularFireAuth } from "angularfire2/auth";
import {storage} from 'firebase';
import { Vibration } from '@ionic-native/vibration';
import { ViewAssetPage } from "../view-asset/view-asset";
import { EditAssetPage } from "../edit-asset/edit-asset";
import { HomePage } from "../home/home";

@IonicPage()
@Component({
  selector: "page-assets",
  templateUrl: "assets.html"
})
export class AssetsPage {
  @ViewChild(Nav) nav: Nav;

  selectedAsset: any;
  avatar: string[];
  public assetRef: AngularFireList<any>;
  assets: Observable<any[]>;
  assetDb = {} as Asset;
  pushPage: any;

  fafe = this.afAuth.auth.currentUser.displayName;
  public stock: string = 'https://firebasestorage.googleapis.com/v0/b/assettracker-clone.appspot.com/o/Profile%20Pictures%2Ficon.png?alt=media&token=b5d940c5-72ff-4417-9447-fe3bd9480467';
  

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private menu: MenuController,
    public alertCtrl: AlertController,
    private afDatabase: AngularFireDatabase,
    public toastCtrl: ToastController,
    private afAuth: AngularFireAuth,
    private vibration: Vibration
  ) {
    this.selectedAsset = navParams.get("asset");
    this.pushPage = AddAssetPage;
    this.assetRef = this.afDatabase.list("/Assets/items");
    this.assets = this.assetRef.valueChanges();
  }

  viewAsset(Assignee, Cube, Hard_Disk, Memory, Model, Number, OS, Owner, Project, Serial, Type, id, img, Peripherals) {
    this.navCtrl.push(ViewAssetPage, {
      Assignee, Cube, Hard_Disk, Memory, Model, Number, OS, Owner, Project, Serial, Type, id, img, Peripherals
    });
  }

  editAsset(Assignee, Cube, Hard_Disk, Memory, Model, Number, OS, Owner, Project, Serial, Type, id, img, Peripherals) {
    this.navCtrl.push(EditAssetPage, {
      Assignee, Cube, Hard_Disk, Memory, Model, Number, OS, Owner, Project, Serial, Type, id, img, Peripherals
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad PeoplePage");
  }
  ionViewDidEnter() {
    this.menu.swipeEnable(false, 'left' ); this.menu.swipeEnable(false, 'right' );;
  }

  ionViewWillLeave() {
    this.menu.swipeEnable(true);
  }

  removeAsset(assetID, img) {
    let confirm = this.alertCtrl.create({
      title: 'Delete?',
      message: 'Do you really want to delete this User?',
      buttons: [
        {
          text: 'Cancel',
           
          handler: () => {

            console.log('Prompt Canceled');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            if (img == this.stock) {
              this.assetRef.remove(assetID);
            }
            else {
            this.assetRef.remove(assetID);
            var delPics = storage().refFromURL(img);
            delPics.delete();
            }
    let toast = this.toastCtrl.create({
      message: 'User was successfully deleted',
      duration: 2500,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present(); this.vibration.vibrate(250);
  }
        }
      ]
    });
    confirm.present();
  }

  goHome(){
    this.navCtrl.setRoot(HomePage);
  }

}
