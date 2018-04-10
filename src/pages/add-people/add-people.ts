import { Component, ViewChild } from "@angular/core";
import {
  IonicPage,
  Nav,
  Platform,
  NavController,
  NavParams,
  MenuController,
  ToastController,
  AlertController
} from "ionic-angular";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Observable } from "rxjs";
import { People } from "../../models/people";
import { storage } from "firebase";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { Vibration } from "@ionic-native/vibration";

@IonicPage()
@Component({
  selector: "page-add-people",
  templateUrl: "add-people.html"
})
export class AddPeoplePage {
  @ViewChild(Nav) nav: Nav;
  private peopleRef: AngularFireList<any>;
  people: Observable<any[]>;
  peopleaf = {} as People;
  addperson = { firstname: "", middlename: "", lastname: "", eid: "" };
  private img: string;
  private stock: string = 'https://firebasestorage.googleapis.com/v0/b/assettracker-clone.appspot.com/o/Profile%20Pictures%2Ficon.png?alt=media&token=b5d940c5-72ff-4417-9447-fe3bd9480467';

  constructor(
    
    private navCtrl: NavController,
    private platform: Platform,
    private navParams: NavParams,
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

    this.platform.registerBackButtonAction(() => {
      console.log("Minimized");
      this.navCtrl.pop();
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad AddPeoplePage");
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

  addPerson(peopleaf: People) {
    const newpeople = this.peopleRef.push({});

    console.log(this.peopleaf);
    var key= Math.floor(Date.now() / 1000);
      const pics = storage().ref(`Pictures/${key}.jpg`);

      if ((peopleaf.firstname || peopleaf.lastname || peopleaf.personID) == undefined){
        let toast = this.toastCtrl.create({
          message: "First and Last names and EID are required",
          duration: 3000,
          position: "top"
        });
        toast.present(); this.vibration.vibrate(250);
      }
      
  else {
    console.log('awla');
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
        message: "Person was added successfully",
        duration: 3000,
        position: "top"
      });
    
      toast.onDidDismiss(() => {
        console.log("Dismissed toast");
      });
      this.navCtrl.pop();
      toast.present(); this.vibration.vibrate(250);
    }
    else{
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
    message: "Person was added successfully",
    duration: 3000,
    position: "top"
  });

  toast.onDidDismiss(() => {
    console.log("Dismissed toast");
  });
  toast.present(); this.vibration.vibrate(250);
  }
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