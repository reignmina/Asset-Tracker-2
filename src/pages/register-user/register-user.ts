import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";
import { MenuController } from "ionic-angular";

import { AngularFireAuth } from "angularfire2/auth";
import { Login } from "../../models/login";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Vibration } from "@ionic-native/vibration";

/**
 * Generated class for the RegisterUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-register-user",
  templateUrl: "register-user.html"
})
export class RegisterUserPage {
  emailCheck: any;
  peopleRef: AngularFireList<any>;
  creds = {} as Login;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuController,
    public toastCtrl: ToastController,
    public afAuth: AngularFireAuth,
    public afDb: AngularFireDatabase, private vibration: Vibration,
  ) {
    this.peopleRef = this.afDb.list("/Authlist");
    this.emailCheck = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad RegisterUserPage");
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

  async register(creds: Login) {

      try {

        console.log(this.creds);
        const authConf = this.peopleRef.push({});
        authConf.set({
          id: authConf.key,
          User: creds.user,
          Pass: creds.pass
        });
        this.navCtrl.pop();

        let toast = this.toastCtrl.create({
          message:
            "Registration Sucessful, Wait for your account to be Enabled by the Admin/Custodian",
          duration: 3000,
          position: "top"
        });

        toast.onDidDismiss(() => {
          console.log("Dismissed toast");
        });
        toast.present(); this.vibration.vibrate(250);
      } catch (e) {
        console.error(e);
        let toast = this.toastCtrl.create({
          message: e,
          duration: 3000,
          position: "top"
        });

        toast.onDidDismiss(() => {
          console.log("Dismissed toast");
        });

        toast.present(); this.vibration.vibrate(250);
      }
    if (creds.user.search(this.emailCheck) == -1) {
      let toast = this.toastCtrl.create({
        message: "E-Mail is Incorrectly Formatted. Please try again.",
        duration: 3000,
        position: "top"
      });

      toast.onDidDismiss(() => {
        console.log("Dismissed toast");
      });

      toast.present(); this.vibration.vibrate(250);
    } else if (creds.pass.length < 6) {
      console.log(creds.pass.length);
      let toast = this.toastCtrl.create({
        message: "Passwords must be atleast 6 or more characters",
        duration: 3000,
        position: "top"
      });

      toast.onDidDismiss(() => {
        console.log("Dismissed toast");
      });

      toast.present(); this.vibration.vibrate(250);
    } 
    else if (creds.user == null, creds.pass == null, creds.confirmPass == null) {
      let toast = this.toastCtrl.create({
        message: "Fields must not be Empty",
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
