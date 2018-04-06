import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Component, Output, Input, ViewChild,EventEmitter} from '@angular/core';
const POUCH = [
  {
    START : "mousedown",
    MOVE : "mousemove",
    STOP : "mouseup"
  },
  {
    START : "touchstart",
    MOVE : "touchmove",
    STOP : "touchend"
  }
];

@IonicPage()
@Component({
  selector: 'page-colorpick',
  templateUrl: 'colorpick.html',
})
export class ColorpickPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ColorpickPage');
  }

}
