import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Observable } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-cubes',
  templateUrl: 'cubes.html',
})
export class CubesPage {

  cubeRef: AngularFireList<any[]>;
  cube: Observable<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public afDb: AngularFireDatabase) {
    this.cubeRef = this.afDb.list("/Cubes");
    this.cube = this.cubeRef.valueChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CubesPage');
    console.log(this.cube);
  }

}
