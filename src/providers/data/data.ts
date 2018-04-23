import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Observable } from "rxjs";

@Injectable()
export class DataProvider {
  peopleRef: AngularFireList<any>;
  people: Observable<any>;

  assetRef: AngularFireList<any>;
  asset: Observable<any>;
  
  constructor(public http: Http, public afDatabase: AngularFireDatabase) {
    

    this.peopleRef = afDatabase.list("People/");
    this.people = this.peopleRef.valueChanges();

    this.assetRef = afDatabase.list("Assets/items/");
    this.asset = this.assetRef.valueChanges();
  }

  filterItems(searchTerm) {
    if (searchTerm != "") {
      // console.log("data filter");
      return this.people.map(searched => {
        searched;
        //   console.log("result" + searched); , ref => ref.limitToFirst(5)
        return searched
          .filter(
            people =>
              people.First_name.toLowerCase().indexOf(
                searchTerm.toLowerCase()
              ) > -1
          )
          .slice(0, 5);
      });
    } else {
      return this.people;
    }
  }

  searchItems(searchTerm) {
    if (searchTerm != "") {
      // console.log("data filter");
      return this.people.map(searched => {
        searched;
        //   console.log("result" + searched); , ref => ref.limitToFirst(5)
        return searched.filter(
          people =>
            people.First_name.toLowerCase().indexOf(searchTerm.toLowerCase()) >
            -1
        );
      });
    } else {
      return this.people;
    }
  }

  filterAssets(searchTerm) {
    if (searchTerm != "") {
      // console.log("data filter");
      return this.asset.map(searched => {
        searched;
        //   console.log("result" + searched); , ref => ref.limitToFirst(5)
        return searched
          .filter(
            asset =>
              asset.Model.toLowerCase().indexOf(
                searchTerm.toLowerCase()
              ) > -1
          )
          .slice(0, 5);
      });
    } else {
      return this.asset;
    }
  }

  searchAssets(searchTerm) {
    if (searchTerm != "") {
      // console.log("data filter");
      return this.asset.map(searched => {
        searched;
        //   console.log("result" + searched); , ref => ref.limitToFirst(5)
        return searched.filter(
          asset =>
            asset.Model.toLowerCase().indexOf(searchTerm.toLowerCase()) >
            -1
        );
      });
    } else {
      return this.asset;
    }
  }
}
