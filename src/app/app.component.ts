import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { PeoplePage } from '../pages/people/people';
import { CustodianPage } from '../pages/custodian/custodian';
import { AssetsPage } from '../pages/assets/assets';
import { PeripheralsPage } from '../pages/peripherals/peripherals';
import { TagsPage } from '../pages/tags/tags';
import { ProjectsPage } from '../pages/projects/projects';
import { TypesPage } from '../pages/types/types';
import { BrandsPage } from '../pages/brands/brands'; 
import { CubesPage } from '../pages/cubes/cubes';
import { OsPage } from '../pages/os/os';
import { LogsPage } from '../pages/logs/logs';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { ConfCredsPage } from '../pages/conf-creds/conf-creds';
import { ProfileDetailsPage } from '../pages/profile-details/profile-details';
import { DataProvider } from '../providers/data/data';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../pages/home/home';
import { RegisterPhonePage } from '../pages/register-phone/register-phone';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  pushPage: any = ProfilePage;
  pages: Array<{icon: string, title: string, component: any}>;
  public items: any;
  public searchTerm: string = '' ;
  name: any;
  img: any;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private afAuth: AngularFireAuth, public dataService: DataProvider) {
    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      {icon: 'people', title: 'People', component: PeoplePage },
      {icon: 'star', title: 'Custodian', component: CustodianPage },
      {icon: 'desktop', title: 'Assets', component: AssetsPage },
      {icon: 'flower', title: 'Peripherals', component: PeripheralsPage },
      {icon: 'pricetag', title: 'Tags', component: TagsPage},
      {icon: 'pie', title: 'Projects', component: ProjectsPage},
      {icon: 'T', title: 'Types', component: TypesPage },
      {icon: 'B', title: 'Brands', component: BrandsPage},
      {icon: 'compass', title: 'Cubes', component: CubesPage},
      {icon: 'Opera', title: 'Operating Systems', component: OsPage },
      {icon: 'list', title: 'Logs', component: LogsPage},
      {icon: 'people', title: 'Requests', component: ConfCredsPage},
      {icon: 'people', title: 'Profile', component: ProfileDetailsPage}
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      console.log('awla');
      this.initList();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }
  logOut() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.afAuth.auth.signOut();
    this.nav.setRoot(LoginPage);
  }
  initList(){
    this.items = this.dataService.people;
  }
  
  submitKeyword(searchTerm)
  {
    this.nav.setRoot(HomePage, {searchTerm});
  }
  setFilteredItems() {
    this.items = this.dataService.filterItems(this.searchTerm);
    console.log('items' + this.items)
}
  
}
