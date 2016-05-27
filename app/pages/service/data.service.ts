/*
  This service handles all the SqlStorage related work
*/
import {Injectable} from '@angular/core';
import {Platform,Storage,SqlStorage} from 'ionic-angular';

@Injectable()
export class DataService{

  storage;

  constructor(private platform:Platform){
    this.platform.ready().then(()=>{
        this.storage=new Storage(SqlStorage);
    });
  }

  //get all tasks [SELECT]
  selectAllTasks():Promise<any>{
    return this.storage.query("SELECT * FROM myTasks ORDER BY id DESC");
  }
}
