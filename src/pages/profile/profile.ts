import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  MenuController
} from "ionic-angular";
import { ToastController } from "ionic-angular";

import { AngularFireAuth } from "angularfire2/auth";
import { Vibration } from "@ionic-native/vibration";


@IonicPage()
@Component({
  selector: "page-profile",
  templateUrl: "profile.html"
})

export class ProfilePage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuController,
    public toastCtrl: ToastController,
    public afAuth: AngularFireAuth, private vibration: Vibration,
    
  ){

  }
  
  ionViewDidLoad() {
    console.log("ionViewDidLoad ProfilePage");
  }
  
  ionViewDidEnter() {
    this.menu.swipeEnable(false, 'left' ); this.menu.swipeEnable(false, 'right' );;
  }
  
  ionViewWillLeave() {
    // Don't forget to return the swipe to normal, otherwise
    // the rest of the pages won't be able to swipe to open menu
    this.menu.swipeEnable(true);
  }
  async updatePass(Pass, newPass, newPassConf) {
    console.log(Pass, newPass, newPassConf);
    
    let User = this.afAuth.auth.currentUser;
    let userEmail = User.email;
    
    try {
      const creds = await this.afAuth.auth.signInWithEmailAndPassword(
        userEmail,
        Pass
      );
      if (creds) {
        if ( newPass == Pass ) {
          let toast = this.toastCtrl.create({
            message: "New Password must not be the same as the Old Password",
            duration: 3000,
            position: "top"
          });
          
          toast.onDidDismiss(() => {
            console.log("Dismissed toast");
          });
          toast.present(); this.vibration.vibrate(250);

        } 
        else if (newPass != newPassConf ) {
          let toast = this.toastCtrl.create({
            message: "Passwords do not match. Please try again.",
            duration: 3000,
            position: "top"
          });
          
          toast.onDidDismiss(() => {
            console.log("Dismissed toast");
          });
          toast.present(); this.vibration.vibrate(250);
        }

        else if (Pass == '' || newPass == '' || newPassConf == '') {
          let toast = this.toastCtrl.create({
            message: "Fill up the Required Fields.",
            duration: 3000,
            position: "top"
          });
          
          toast.onDidDismiss(() => {
            console.log("Dismissed toast");
          });
          toast.present(); this.vibration.vibrate(250);
        }
       else {
          try {
            User.updatePassword(newPass);
            
            let toast = this.toastCtrl.create({
              message: "Password Successfully Changed.",
              duration: 3000,
              position: "top"
            });
            
            toast.onDidDismiss(() => {
              console.log("Dismissed toast");
            });
            this.navCtrl.pop();
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
        }
      }
    } catch (e) {
      let toast = this.toastCtrl.create({
        message: "Old Password is incorrect. Please try again",
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