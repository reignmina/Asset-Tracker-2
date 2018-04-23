import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, AlertController, ToastController } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { AddCustodianPage } from '../add-custodian/add-custodian';
import { ViewCustodianPage } from '../view-custodian/view-custodian';
import { AngularFireAuth } from 'angularfire2/auth';
import { Vibration } from '@ionic-native/vibration';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-custodian',
  templateUrl: 'custodian.html'
})
export class CustodianPage {
  peopleRef: AngularFireList<any>;
  people: Observable<any[]>;
  pushPage: any;
  fafe = this.afAuth.auth.currentUser.displayName;  

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public afDb: AngularFireDatabase,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public afAuth: AngularFireAuth,
    public menu: MenuController, private vibration: Vibration, ) {
   this.peopleRef = this.afDb.list('/People');
   this.people = this.peopleRef.valueChanges();
   this.pushPage = AddCustodianPage;
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

    viewPerson(First_name, Middle_name, Last_name, EID, img){
      this.navCtrl.push(ViewCustodianPage,{firstname:First_name, middlename:Middle_name, lastname:Last_name, eid:EID, img:img})
    }

    removeCustodian(id){
      console.log(id);
      let confirm = this.alertCtrl.create({
        title: "Demote",
        message: "Remove user from being a Custodian?",
        buttons: [
          {
            text: "Cancel",
            handler: () => {
              console.log("Prompt Canceled");
            }
          },
          {
            text: "Yes",
            handler: () => {
              
            this.peopleRef.update(id,{
              role: "user"
            })
  
            let toast = this.toastCtrl.create({
              message: 'User is now a Custodian',
              duration: 2500,
              position: 'top'
            });
        
            toast.onDidDismiss(() => {
              console.log('Dismissed toast');
            });
        
            
            toast.present(); this.vibration.vibrate(250);
             
            }
          }
        ]
      });
      confirm.present();
  
     
    }

    goHome(){
      this.navCtrl.setRoot(HomePage);
    }
}

