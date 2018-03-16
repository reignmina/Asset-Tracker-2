import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  ToastController,
  MenuController
} from "ionic-angular";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Observable } from "rxjs";
import { AngularFireAuth } from "angularfire2/auth";
import { Vibration } from "@ionic-native/vibration";

/**
 * Generated class for the ConfCredsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-conf-creds",
  templateUrl: "conf-creds.html"
})
export class ConfCredsPage {
  credListRef: AngularFireList<any>;
  credList: Observable<any>;
  listvalue: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afDb: AngularFireDatabase,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public afAuth: AngularFireAuth,
    public menu: MenuController, private vibration: Vibration,
  ) {
    this.credListRef = this.afDb.list("/Authlist");
    this.credList = this.credListRef.valueChanges();
  }

  ionViewDidLoad() {
    console.log(this.credList);
  }

  approveUser(User, Pass, id) {
    console.log(User, Pass);
    let confirm = this.alertCtrl.create({
      title: "Delete?",
      message: "Do you really want to delete this Request?",
      buttons: [
        {
          text: "Cancel",
          handler: () => {
            console.log("Prompt Canceled");
          }
        },
        {
          text: "Authenticate",
          handler: () => {
            this.afAuth.auth.createUserWithEmailAndPassword(User, Pass);
            this.credListRef.remove(id);
            let toast = this.toastCtrl.create({
              message: "User Sucessfully Authenticated!",
              duration: 3000,
              position: "top"
            });

            toast.onDidDismiss(() => {
              console.log("Dismissed toast");
            });

            toast.present(); this.vibration.vibrate(250);
          }
        }
      ]
    });
    confirm.present();
  }

  rejectUser(id) {
    let confirm = this.alertCtrl.create({
      title: "Delete?",
      message: "Do you really want to delete this Request?",
      buttons: [
        {
          text: "Cancel",
          handler: () => {
            console.log("Prompt Canceled");
          }
        },
        {
          text: "Delete Request",
          handler: () => {
            this.credListRef.remove(id);
            let toast = this.toastCtrl.create({
              message: "Request Deleted",
              duration: 3000,
              position: "top"
            });

            toast.onDidDismiss(() => {
              console.log("Dismissed toast");
            });

            toast.present(); this.vibration.vibrate(250);
          }
        }
      ]
    });
    confirm.present();
  }
  ionViewDidEnter() {
    this.menu.swipeEnable(false, "left");
    this.menu.swipeEnable(false, "right");
    this.checkEmpty();

    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(false, 'menu1');
  }

  ionViewWillLeave() {
    // Don't forget to return the swipe to normal, otherwise
    // the rest of the pages won't be able to swipe to open menu
    this.menu.swipeEnable(true);
  }

  checkEmpty() {
    console.log("listvalue " + this.listvalue);
    this.credList.map(creds => {
      creds.filter(list => {
        if (list.size() < 0) {
          this.listvalue = true;
        } else {
          this.listvalue = true;
        }
      });
    });
    console.log("listvalueafter " + this.listvalue);
  }
}
