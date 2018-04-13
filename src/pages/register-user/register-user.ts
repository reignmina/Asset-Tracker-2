import { Component, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  MenuController
} from "ionic-angular";
import { Nav, ToastController } from "ionic-angular";

import { AngularFireAuth } from "angularfire2/auth";
import { Login } from "../../models/login";
import { HomePage } from "../home/home";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Observable } from "@firebase/util";
import { LoginPage } from "../login/login";
import { Register } from "../../models/register";

@IonicPage()
@Component({
  selector: "page-register-user",
  templateUrl: "register-user.html"
})
export class RegisterUserPage {
  @ViewChild(Nav) nav: Nav;

  public userRef: AngularFireList<any>;
  newUser: Observable<any[]>;
  creds = {} as Register;
  checkEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public afDatabase: AngularFireDatabase,
    private toastCtrl: ToastController,
    public afAuth: AngularFireAuth
  ) {
    this.userRef = this.afDatabase.list("/Authlist");
    // this.newUser = this.userRef.valueChanges;
    this.creds.type = "user";
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad RegisterPage");
  }

  ionViewDidEnter() {
    this.menuCtrl.swipeEnable(false);
  }

  async register(creds: Register) {
    console.log(creds);
    try {
      if (
        creds.email.search(this.checkEmail) != -1 &&
        creds.pass != null &&
        creds.pass != "" &&
        creds.firstname != null &&
        creds.firstname != "" &&
        creds.middlename != null &&
        creds.middlename != "" &&
        creds.lastname != null &&
        creds.lastname != "" &&
        //  creds.type !=null   &&
        //  creds.type != ""    &&
        creds.pass == creds.passCon &&
        creds.pass.length >= 6 &&
        creds.phone != null
      ) {
        const newUser = this.userRef.push({});

        console.log(this.userRef);
        console.log(creds);

        newUser.set({
          User: creds.email,
          Pass: creds.pass,
          id: newUser.key,
          firstname: creds.firstname,
          middlename: creds.middlename,
          lastname: creds.lastname,
          type: creds.type,
          // photoURL: creds.img
          phone: creds.phone
        });

        this.navCtrl.setRoot(LoginPage);
        let toast = this.toastCtrl.create({
          message:
            "Request sent. Please wait for your account to be authorized.",
          duration: 3000,
          position: "top"
        });

        toast.present();
      } else if (creds.pass != creds.passCon) {
        let toast = this.toastCtrl.create({
          message: "Passwords did not match. Try again",
          duration: 3000,
          position: "top"
        });

        toast.present();
      } else if (creds.email.search(this.checkEmail) == -1) {
        let toast = this.toastCtrl.create({
          message: "Please enter a valid email",
          duration: 3000,
          position: "top"
        });

        toast.present();
      } else if (creds.pass.length < 6) {
        let toast = this.toastCtrl.create({
          message: "Password should be atleast 6 characters.",
          duration: 3000,
          position: "top"
        });

        toast.present();
      } else {
        let toast = this.toastCtrl.create({
          message: "Fill in all fields",
          duration: 3000,
          position: "top"
        });
        toast.present();
      }
    } catch (e) {
      let toast = this.toastCtrl.create({
        message: "Fill in all fields",
        duration: 3000,
        position: "top"
      });

      toast.present();
    }
  }
}
