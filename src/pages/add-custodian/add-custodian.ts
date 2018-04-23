import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController, AlertController } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from "rxjs";
import { Camera } from '@ionic-native/camera';
import { Vibration } from '@ionic-native/vibration';
import { AngularFireAuth } from 'angularfire2/auth';
import { People } from '../../models/people';

/**
 * Generated class for the AddCustodianPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-custodian',
  templateUrl: 'add-custodian.html',
})
export class AddCustodianPage {

  custRef: AngularFireList<any>;
  cust: Observable<any[]>;
  peopleRef: AngularFireList<any>;
  people: Observable<any[]>;
  data = {} as People;
  constructor( public navCtrl: NavController,
    public navParams: NavParams,
    public afDb: AngularFireDatabase,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public afAuth: AngularFireAuth,
    public menu: MenuController, private vibration: Vibration,) {

      this.custRef = this.afDb.list("Custodians/");
      this.cust = this.custRef.valueChanges();
      this.peopleRef = this.afDb.list("People/");
      this.people = this.peopleRef.valueChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCustodianPage');
  }

  // EID, id,firstname, middlename, lastname

  approveUser(id) {
    console.log(id)
    console.log(id);

    if(id == null){
      let toast = this.toastCtrl.create({
        message: 'Please select a person',
        duration: 2500,
        position: 'top'
      });
  
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
  
      
      toast.present(); this.vibration.vibrate(250);
    }
    else{
    let confirm = this.alertCtrl.create({
      title: "Promote",
      message: "Do you really want to change the status of this user?",
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
            
          this.peopleRef.update(id,{
            role: "admin"
          })

          let toast = this.toastCtrl.create({
            message: 'User is now a Custodian',
            duration: 2500,
            position: 'top'
          });
      
          toast.onDidDismiss(() => {
            console.log('Dismissed toast');
          });
      
          this.navCtrl.pop();
          toast.present(); this.vibration.vibrate(250);
           
          }
        }
      ]
    });
    confirm.present();

   
  }
}

}
