import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  MenuController,
  ToastController
} from "ionic-angular";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Observable } from "rxjs";
import { Asset } from "../../models/asset";
import { AssetsPage } from "../assets/assets";
import { storage } from "firebase";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { firebaseConfig } from "../../app/app.module";
import { Vibration } from "@ionic-native/vibration";

@IonicPage()
@Component({
  selector: "page-add-asset",
  templateUrl: "add-asset.html"
})
export class AddAssetPage {
  public assetRef: AngularFireList<any>;
  assets: Observable<any[]>;
  assetDb = {} as Asset;
  addasset = { Assignee: "",
    Cube: "",
    HDD: "",
    Memory: "",
    Model: "",
    Number: "",
    OS: "",
    Owner: "",
    Serial: "",
    Type: "", };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private menu: MenuController,
    private afDatabase: AngularFireDatabase,
    private toastCtrl: ToastController,
    private camera: Camera, private vibration: Vibration,
  ) {
    this.assetRef = this.afDatabase.list("/Assets");
    this.assets = this.assetRef.valueChanges();
    this.addasset = {
      Assignee: this.assetDb.Assignee,
      Cube: this.assetDb.Cube,
      HDD: this.assetDb.HDD,
      Memory: this.assetDb.Memory,
      Model: this.assetDb.Model,
      Number: this.assetDb.Number,
      OS: this.assetDb.OS,
      Owner: this.assetDb.Owner,
      Serial: this.assetDb.Serial,
      Type: this.assetDb.Type
    };
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad AddPeoplePage");
  }
  ionViewDidEnter() {
    this.menu.swipeEnable(false, 'left' ); this.menu.swipeEnable(false, 'right' );;

    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(false, 'menu1');
  }

  ionViewWillLeave() {
    // Don't forget to return the swipe to normal, otherwise
    // the rest of the pages won't be able to swipe to open menu
    this.menu.swipeEnable(true);
  }

  addAsset(assetDb: Asset) {
    const newAsset = this.assetRef.push({});

    console.log(this.assetDb);
    newAsset.set({
      id: newAsset.key,
      Assignee: assetDb.Assignee,
      Cube: assetDb.Cube,
      Hard_Disk: assetDb.HDD,
      Memory: assetDb.Memory,
      Model: assetDb.Model,
      Number: assetDb.Number,
      OS: assetDb.OS,
      Owner: assetDb.Owner,
      Serial: assetDb.Serial,
      Type: assetDb.Type
    });

    let toast = this.toastCtrl.create({
      message: "An Asset was added successfully",
      duration: 3000,
      position: "top"
    });

    toast.onDidDismiss(() => {
      console.log("Dismissed toast");
    });
    this.navCtrl.pop();
    toast.present(); this.vibration.vibrate(250);
  }
  async takePic() {
    try {
      const options: CameraOptions = {
        quality: 75,
        targetHeight: 800,
        targetWidth: 800,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true
      };

      var key= Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 10);
      const result = await this.camera.getPicture(options);
      const img = `data:image/jpeg;base64,${result}`;
      const pics = storage().ref('Pictures/' + key);

    pics.putString(img, 'data_url' );
      
    } catch (e) {
      console.error(e);
    }
  }
}
