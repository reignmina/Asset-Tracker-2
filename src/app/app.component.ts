import { Component, ViewChild } from "@angular/core";
import { Nav, Platform, ToastController } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { AppMinimize } from "@ionic-native/app-minimize";

import { DataProvider } from    "../providers/data/data";
import { AngularFireAuth } from "angularfire2/auth";

import { PeoplePage } from    "../pages/people/people";
import { CustodianPage } from "../pages/custodian/custodian";
import { AssetsPage } from    "../pages/assets/assets";
import { PeripheralsPage } from "../pages/peripherals/peripherals";
import { TagsPage } from      "../pages/tags/tags";
import { ProjectsPage } from  "../pages/projects/projects";
import { TypesPage } from     "../pages/types/types";
import { BrandsPage } from    "../pages/brands/brands";
import { CubesPage } from     "../pages/cubes/cubes";
import { OsPage } from        "../pages/os/os";
import { LogsPage } from      "../pages/logs/logs";
import { LoginPage } from     "../pages/login/login";
import { ProfilePage } from   "../pages/profile/profile";
import { ConfCredsPage } from "../pages/conf-creds/conf-creds";
import { ProfileDetailsPage } from "../pages/profile-details/profile-details";
import { HomePage } from        "../pages/home/home";
import { Vibration } from "@ionic-native/vibration";
import { AlertController } from "ionic-angular/components/alert/alert-controller";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  pushPage: any = ProfilePage;
  pages: Array<{ icon: string; letter: string; title: string; component: any }>;



  // accType = this.afAuth.auth.currentUser.displayName;
  // accEmail = this.afAuth.auth.currentUser.email;
  private items: any;
  private asset: any;
  private searchTerm: string = "";
  constructor(

    private platform: Platform,
    private min: AppMinimize,
    private toastCtrl: ToastController,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private afAuth: AngularFireAuth,
    private dataService: DataProvider,
    private vibrate: Vibration,
    public  alertCtrl: AlertController
  ) {
    this.initializeApp();
    this.pages =
    [
      { icon: "people",  letter: "",  title: "People",            component: PeoplePage         },
      { icon: "star",    letter: "",  title: "Custodian",         component: CustodianPage      },
      { icon: "desktop", letter: "",  title: "Assets",            component: AssetsPage         },
      { icon: "settings",  letter: "",  title: "Peripherals",       component: PeripheralsPage    },
      { icon: "pricetag",letter: "",  title: "Tags",              component: TagsPage           },
      { icon: "pie",     letter: "",  title: "Projects",          component: ProjectsPage       },
      { icon: "",        letter: "T", title: "Types",             component: TypesPage          },
      { icon: "",        letter: "B", title: "Brands",            component: BrandsPage         },
      { icon: "compass", letter: "",  title: "Cubes",             component: CubesPage          },
      { icon: "",        letter: "O", title: "Operating Systems", component: OsPage             },
      { icon: "list",    letter: "",  title: "Logs",              component: LogsPage           },
      { icon: "person-add",  letter: "",  title: "Requests",          component: ConfCredsPage      },
      { icon: "person",  letter: "",  title: "Profile",           component: ProfileDetailsPage }
    ];

    this.platform.registerBackButtonAction(() => {
      console.log("Minimized");
      this.min.minimize();
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleBlackTranslucent();
      this.splashScreen.hide();
      console.log(this.pages);
      this.setFilteredItems();
      this.setFilteredAssets();
    });
  }

  openPage(page) {

    if (page.component == ConfCredsPage || page.component == CubesPage) {
      var accType = this.afAuth.auth.currentUser.displayName;
      if (accType == "admin") {
        this.nav.push(page.component);
      } else {
        let toast = this.toastCtrl.create({
          message: "Sorry, This page is unavailable for your access level.",
          duration: 2500,
          position: "top"
        });

        toast.present(); this.vibrate.vibrate(250);
      }
   } else {
      this.nav.push(page.component);
    }
  }
  logOut() {
      // Reset the content nav to have just this page
      // we wouldn't want the back button to show in this scenario
      let confirm = this.alertCtrl.create({
        title: 'Logout',
        message: "Are you sure you want to logout?",
        buttons: [
          {
            text: 'No',
            handler: data => {
              this.nav.setRoot(HomePage);
            }
          },
          {
            text: 'Yes',
            handler: data => {
              this.afAuth.auth.signOut();
              this.nav.setRoot(LoginPage);
            }
          }
        ]
      });
      confirm.present();
    }

  initList() {
    this.items = this.dataService.people;
  }

  submitKeyword(searchTerm) {
    this.nav.setRoot(HomePage, { searchTerm });
  }
  setFilteredItems() {
    this.items = this.dataService.filterItems(this.searchTerm);
    console.log("items" + this.items);
  }
  setFilteredAssets() {
    this.asset = this.dataService.filterAssets(this.searchTerm);
    console.log("items" + this.asset);
  }

  goProfile(){
    this.nav.push(ProfileDetailsPage);
  }
}
