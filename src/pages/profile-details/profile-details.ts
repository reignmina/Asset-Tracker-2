import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { IonicPage, MenuController, NavController, NavParams, ToastController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';


@IonicPage()
@Component({
  selector: 'page-profile-details',
  templateUrl: 'profile-details.html',
})
export class ProfileDetailsPage {

  public details: Array<{email:string, name: string, img:string}>;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController, public toastCtrl: ToastController, public afAuth: AngularFireAuth) {
 this.details=[
   {email: this.afAuth.auth.currentUser.email,
    name:  this.afAuth.auth.currentUser.displayName,
    img:   this.afAuth.auth.currentUser.photoURL}
  ]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileDetailsPage');
    console.log(this.details);
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

  changePass(){
    this.navCtrl.push(ProfilePage);
  }

  
}
