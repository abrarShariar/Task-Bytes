import {Storage,SqlStorage} from 'ionic-angular';
import {Task} from './Task';
import {Injectable} from '@angular/core';

@Injectable()
export class DataService{
  storage;
  data;
  constructor(){
    this.storage=new Storage(SqlStorage,{name:'taskDB'});
    this.data=null;
  }


  getData(key:string){
    return this.storage.get(key);
  }

  clearData(){
    return this.storage.remove("tasks");
  }

  // showAll(){
  //   return this.storage.query("DESC taskDB");
  // }

  save(title,data){
    let newData=JSON.stringify(data);
    console.log(title);
    this.storage.set(title,newData);
  }

}
