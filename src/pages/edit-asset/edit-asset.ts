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
import { storage } from "firebase";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { Vibration } from "@ionic-native/vibration";
import { AlertController } from "ionic-angular/components/alert/alert-controller";
/**
 * Generated class for the EditAssetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-asset',
  templateUrl: 'edit-asset.html',
})
export class EditAssetPage {
  public assetRef: AngularFireList<any>;
  assets: Observable<any[]>;
  typeRef: AngularFireList<any>;
  types: Observable<any[]>;
  OSRef: AngularFireList<any>;
  OS: Observable<any[]>;
  cubeRef: AngularFireList<any>;
  cube: Observable<any[]>;
  projRef: AngularFireList<any>;
  proj: Observable<any[]>;
  peopleRef: AngularFireList<any>;
  people: Observable<any[]>;
  custRef: AngularFireList<any>;
  cust: Observable<any[]>;
  modelsRef: AngularFireList<any>;
  models: Observable<any[]>;
  peripRef: AngularFireList<any>;
  perip: Observable<any[]>;
  img: string;
  deleteserve: boolean;
  stock: "https://firebasestorage.googleapis.com/v0/b/assettracker-clone.appspot.com/o/Profile%20Pictures%2Ficon.png?alt=media&token=b5d940c5-72ff-4417-9447-fe3bd9480467";
  // currType = this.navParams.get('Type');
   currAsset = {Assignee: "", Cube: "", Hard_Disk: "", Memory: "", Model: "",
  Number: "", OS: "", Owner: "", Project: "", Serial: "", Type: "", id: "", img: "", Peripherals: Array};
  assetDb = {} as Asset;






  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private menu: MenuController,
    private afDatabase: AngularFireDatabase,
    private toastCtrl: ToastController,
    private camera: Camera,
    private vibration: Vibration,
    private alertCtrl: AlertController
  ) {
    this.currAsset ={
      Assignee: navParams.get('Assignee'), Cube: navParams.get('Cube'), Hard_Disk: navParams.get('Hard_Disk'),
       Memory: navParams.get('Memory'), Model: navParams.get('Model'),
     Number: navParams.get('Number'), OS: navParams.get('OS'), Owner: navParams.get('Owner'), Project:navParams.get('Project'), Serial: navParams.get('Serial'),
      Type: navParams.get('Type'), id: navParams.get('id'), img: navParams.get('img'), Peripherals: navParams.get("Peripherals")
    };


    this.assetRef = this.afDatabase.list("/Assets/items");
    this.assets = this.assetRef.valueChanges();
    this.typeRef = this.afDatabase.list("Assets/data/Types");
    this.types = this.typeRef.valueChanges();
    this.OSRef = this.afDatabase.list("Assets/data/OS");
    this.OS = this.OSRef.valueChanges();
    this.cubeRef = this.afDatabase.list("Assets/data/Cubes");
    this.cube = this.cubeRef.valueChanges();
    this.projRef = this.afDatabase.list("Assets/data/Projects");
    this.proj = this.projRef.valueChanges();
    this.peopleRef = this.afDatabase.list("People/");
    this.people = this.peopleRef.valueChanges();
    this.custRef = this.afDatabase.list("Custodians/");
    this.cust = this.custRef.valueChanges();
    this.modelsRef = this.afDatabase.list("Assets/data/Models");
    this.models = this.modelsRef.valueChanges();
    this.peripRef = this.afDatabase.list("Assets/data/Peripherals");
    this.perip = this.peripRef.valueChanges();
    this.deleteserve = false;
  }


  ionViewDidLoad() {
    console.log("this.currAsset");
    console.log(this.currAsset);
    console.log(this.img)
  }

  updateAsset(assetDb: Asset) {



    if(assetDb.Assignee == null){
      assetDb.Assignee = this.currAsset.Assignee;
    }
    if(assetDb.Cube == null){
      assetDb.Cube = this.currAsset.Cube;
    }
    if(assetDb.HDD == null){
      assetDb.HDD = this.currAsset.Hard_Disk;
    }
    if(assetDb.Memory == null){
      assetDb.Memory = this.currAsset.Memory;
    }
    if(assetDb.Model == null){
      assetDb.Model = this.currAsset.Model;
    }
    if(assetDb.OS == null){
      assetDb.OS = this.currAsset.OS;
    }
    if(assetDb.Owner == null){
      assetDb.Owner = this.currAsset.Owner;
    }
    if(assetDb.Serial == null){
      assetDb.Serial = this.currAsset.Serial;
    }
    if(assetDb.Type == null){
      assetDb.Type = this.currAsset.Type;
    }
    if(assetDb.Project == null){
      assetDb.Project = this.currAsset.Project;
    }
    if(assetDb.Peripherals == null){
      assetDb.Peripherals = this.currAsset.Peripherals;
    }



    console.log("Peripherals:");
    console.log(this.assetDb.Peripherals);
    console.log("asset DB");
    console.log(this.assetDb);

    if(assetDb.Peripherals.length != 0){
    for( let i = 0; i < assetDb.Peripherals.length; i++){


    this.peripRef.update( assetDb.Peripherals[i],{
      BindedAsset : this.currAsset.id
    });
    }
  }

    this.assetRef.update( this.currAsset.id,{
      Assignee: assetDb.Assignee,
      Cube: assetDb.Cube,
      Hard_Disk: assetDb.HDD,
      Memory: assetDb.Memory,
      Model: assetDb.Model,
      Number: assetDb.Number,
      OS: assetDb.OS,
      Owner: assetDb.Owner,
      Serial: assetDb.Serial,
      Type: assetDb.Type,
      Project: assetDb.Project,
      Peripherals: assetDb.Peripherals
    });

    let toast = this.toastCtrl.create({
      message: "An Asset was updated successfully",
      duration: 2500,
      position: "top"
    });
    this.navCtrl.pop();
    toast.present(); this.vibration.vibrate(250);
  }

  updateThing(assetDB: Asset) {


    console.log("Old Image = " + this.currAsset.img);
    // console.log("Image = " + this.img);
    var key= Math.floor(Date.now() / 1000);

  const newPics = storage().ref(`AssetPics/${key}.jpg`);

    if (this.img == undefined){
       console.log("No Image");

      if (this.deleteserve == true){
        var delPics = storage().refFromURL(this.currAsset.img);
        delPics.delete();
        this.assetRef.update(this.currAsset.id, {

          img: 'https://firebasestorage.googleapis.com/v0/b/assettracker-clone.appspot.com/o/Profile%20Pictures%2Ficon.png?alt=media&token=b5d940c5-72ff-4417-9447-fe3bd9480467',
        });
        console.log('Deleted Pic from Server');
      }
  this.assetRef.update(this.currAsset.id, {

  });
}

else if (this.currAsset.img == this.stock) {
console.log("Has Image to upload but with placeholder image");
newPics.putString(this.img, 'data_url' ).then (data =>{
this.assetRef.update(this.currAsset.id, {

img: data.downloadURL
});

});
}

else {
console.log("Has Image to upload but with different image");
delPics.delete();
newPics.putString(this.img, 'data_url' ).then (data =>{
this.assetRef.update(this.currAsset.id, {

img: data.downloadURL
});

});
}


  let toast = this.toastCtrl.create({
    message: 'User info was successfully updated',
    duration: 2500,
    position: 'top'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  this.navCtrl.pop();
  toast.present(); this.vibration.vibrate(250);


}

showConfirmserver(assetDB: Asset) {
  let confirm = this.alertCtrl.create({
    title: 'Delete?',
    message: 'Are you sure you want to delete this image?',
    buttons: [
      {
        text: 'Cancel',
        handler: () => {
          console.log('ionViewDidLoad PeoplePage');
        }
      },
      {
        text: 'Delete',
        handler: () => {
          console.log (this.deleteserve);
         this.deleteserve = true;
         console.log (this.deleteserve);

         let toast = this.toastCtrl.create({
          message: 'Picture Deleted',
          duration: 2500,
          position: 'top'
        });
        toast.present(); this.vibration.vibrate(250);

        }

      }
    ]
  });
  confirm.present();
}

showConfirmlocal() {
  let confirm = this.alertCtrl.create({
    title: 'Delete?',
    message: 'Are you sure you want to delete this image?',
    buttons: [
      {
        text: 'Cancel',
        handler: () => {
          console.log('ionViewDidLoad PeoplePage');
        }
      },
      {
        text: 'Delete',
        handler: () => {
          this.img = undefined;
          console.log('Deleted Pic from local');

          let toast = this.toastCtrl.create({
            message: 'Picture Deleted',
            duration: 2500,
            position: 'top'
          });
          toast.present(); this.vibration.vibrate(250);
          toast.onDidDismiss(() => {
            console.log('Dismissed toast');
          });
        }
      }
    ]
  });
  confirm.present();
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
      correctOrientation: true,
      allowEdit: true
    };

    const result = await this.camera.getPicture(options);
    this.img = `data:image/jpeg;base64,${result}`;


  } catch (e) {
    console.error(e);
  }
}

async getPic() {
  try {
    const options: CameraOptions = {
      quality: 75,
      targetHeight: 800,
      targetWidth: 800,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      allowEdit: true,
      sourceType: 2
    };

    const result = await this.camera.getPicture(options);
    this.img = `data:image/jpeg;base64,${result}`;



  } catch (e) {
    console.error(e);
  }
}

}
