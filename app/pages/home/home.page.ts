import {OnInit} from '@angular/core';
import {Page, NavController} from 'ionic-angular';
import {ViewChild} from '@angular/core';
import {AddTaskPage} from '../add-task/add-task.page';
//data service
import {DataService} from '../service/data.service';
//SqlStorage
import {Storage,SqlStorage,Platform} from 'ionic-angular';


@Page({
  templateUrl:'build/pages/home/home.html',
  providers:[DataService]
})
export class HomePage{
    studyCount=0;
    workCount=0;
    familyCount=0;
    friendsCount=0;
    foodCount=0;
    playCount=0;

    storage;
    constructor(private nav:NavController,private dataService:DataService,private platform:Platform){
      //console.log("Home");
      this.platform.ready().then(() => {
          this.storage = new Storage(SqlStorage);
          this.storage.query("SELECT tag FROM myTasks").then((data)=>{
            //console.log(data);
            this.countTag(data);

          });
      });
    }

    ngOnInit(){

    }

    //get recently added task
    getRecentlyAddedTask(){
      this.storage.query("SELECT * FROM myTasks").then((data)=>{
        console.log(data);
      },(error)=>{
        console.log("ERROR");
      });
    }

    addTask(){
      this.nav.push(AddTaskPage);
    }

    countTag(data){
      if(data.res.rows.length>0){
        for(let i=0;i < data.res.rows.length;i++){
          let taskTag=data.res.rows.item(i).tag;
          if(taskTag=="study"){
            this.studyCount++;
          }
          if(taskTag=="work"){
            this.workCount++;
          }
          if(taskTag=="family"){
            this.familyCount++;
          }
          if(taskTag=="friends"){
            this.friendsCount++;
          }
          if(taskTag=="Food"){
            this.foodCount++;
          }
          if(taskTag=="play"){
            this.playCount++;
          }
        }
      }
    }
}
