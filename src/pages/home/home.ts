import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams, MenuController, AlertController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { ViewPeoplePage } from '../view-people/view-people';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items: any;
  assets: any;
  searchTerm: string = '';

  accType = this.afAuth.auth.currentUser.displayName;
  accEmail = this.afAuth.auth.currentUser.email;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public dataService: DataProvider, public navParams: NavParams, public afAuth:AngularFireAuth, public menuCtrl: MenuController, public alertCtrl: AlertController, private afDatabase: AngularFireDatabase ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    console.log(this.assets);
    let loader = this.loadingCtrl.create({
      content: "Loading. Please wait...",
      duration: 800
    });
    loader.present();

    let searchTerm = this.navParams.get('searchTerm');
    if (searchTerm != (null)){
    this.items = this.dataService.searchItems(searchTerm);
    this.assets = this.dataService.searchAssets(searchTerm);
    }
    else {
      this.items = this.dataService.searchItems('');
      this.assets = this.dataService.searchAssets('');
    };
  }

  viewPerson(First_name, Middle_name, Last_name, EID, img){
    this.navCtrl.push(ViewPeoplePage,{firstname:First_name, middlename:Middle_name, lastname:Last_name, eid:EID, img:img})
  }


}
