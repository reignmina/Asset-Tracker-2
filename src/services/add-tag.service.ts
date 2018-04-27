import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Tag } from "../models/tag";


@Injectable()
export class AddTagService{

  private tagListRef = this.db.list<Tag>('tagList');


  constructor(private db: AngularFireDatabase ){

  }
getTagList(){

    return this.tagListRef;
  }

addTag(tag:Tag) {
  return this.tagListRef.push(tag);
}

editTag(tag:Tag){
  return this.tagListRef.update(tag.key, tag);
}

removeTag(tag:Tag){
  return this.tagListRef.remove(tag.key);
}


}
