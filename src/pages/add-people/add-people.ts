import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  MenuController,
  ToastController,
  AlertController
} from "ionic-angular";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Observable } from "rxjs";
import { People } from "../../models/people";
import { PeoplePage } from "../people/people";
import { storage } from "firebase";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { firebaseConfig } from "../../app/app.module";
import { Vibration } from "@ionic-native/vibration";

/**
 * Generated class for the AddPeoplePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-add-people",
  templateUrl: "add-people.html"
})
export class AddPeoplePage {
  public peopleRef: AngularFireList<any>;
  people: Observable<any[]>;
  peopleaf = {} as People;
  addperson = { firstname: "", middlename: "", lastname: "", eid: "" };
  public img: string;
  public stock: string = 'https://firebasestorage.googleapis.com/v0/b/assettracker-clone.appspot.com/o/Profile%20Pictures%2Ficon.png?alt=media&token=b5d940c5-72ff-4417-9447-fe3bd9480467';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private menu: MenuController,
    private afDatabase: AngularFireDatabase,
    private toastCtrl: ToastController,
    private camera: Camera,
    private alertCtrl: AlertController, private vibration: Vibration,
  ) {
    this.peopleRef = this.afDatabase.list("/People");
    this.people = this.peopleRef.valueChanges();
    this.addperson = {
      firstname: this.peopleaf.firstname,
      middlename: this.peopleaf.middlename,
      lastname: this.peopleaf.lastname,
      eid: this.peopleaf.eid
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

  addPerson(peopleaf: People) {
    const newpeople = this.peopleRef.push({});

    console.log(this.peopleaf);
    var key= Math.floor(Date.now() / 1000);
      const pics = storage().ref(`Pictures/${key}.jpg`);

      if (this.img == undefined){
        newpeople.set({
          id: newpeople.key,
          First_name: peopleaf.firstname,
          Middle_name: peopleaf.middlename,
          Last_name: peopleaf.lastname,
          EID: peopleaf.eid,
          img: this.stock
        });
        let toast = this.toastCtrl.create({
          message: "User was added successfully",
          duration: 3000,
          position: "top"
        });
      
        toast.onDidDismiss(() => {
          console.log("Dismissed toast");
        });
        this.navCtrl.pop();
        toast.present(); this.vibration.vibrate(250);
      }
      
  else {
    pics.putString(this.img, 'data_url' ).then (data =>{
    newpeople.set({
      id: newpeople.key,
      First_name: peopleaf.firstname,
      Middle_name: peopleaf.middlename,
      Last_name: peopleaf.lastname,
      EID: peopleaf.eid,
      img: data.downloadURL
    });
  });

    
  let toast = this.toastCtrl.create({
    message: "User was added successfully",
    duration: 3000,
    position: "top"
  });

  toast.onDidDismiss(() => {
    console.log("Dismissed toast");
  });
  this.navCtrl.pop();
  toast.present(); this.vibration.vibrate(250);
  }
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
        sourceType: 2
      };

      const result = await this.camera.getPicture(options);
      this.img = `data:image/jpeg;base64,${result}`;
      

      
    } catch (e) {
      console.error(e);
    }
  }

  async showConfirm() {
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
          }
        }
      ]
    });
    confirm.present();
  }
}
