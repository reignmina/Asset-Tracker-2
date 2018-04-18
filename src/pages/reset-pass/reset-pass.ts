import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Vibration } from '@ionic-native/vibration';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-reset-pass',
  templateUrl: 'reset-pass.html',
})
export class ResetPassPage {
  value: string;
  checkEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, private toastCtrl: ToastController, private vibration: Vibration) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPassPage');
  }


  resetPass(){
  console.log(this.value);
  if(this.value == null || undefined){
    let toast = this.toastCtrl.create({
      message: 'E-Mail Address must not be empty.',
      duration: 2500,
      position: 'top'
    });
    toast.present(); this.vibration.vibrate(250);

  }
  else if (this.value.search(this.checkEmail) == -1){
    let toast = this.toastCtrl.create({
      message: 'E-Mail Address must be correctly formatted.',
      duration: 2500,
      position: 'top'
    });
    toast.present(); this.vibration.vibrate(250);

  }
  else{
    this.afAuth.auth.sendPasswordResetEmail(this.value);

    let toast = this.toastCtrl.create({
      message: 'Password Reset E-Mail sent.',
      duration: 2500,
      position: 'top'
    });
    toast.present(); this.vibration.vibrate(250); this.navCtrl.setRoot(LoginPage);

  }
  }
}
