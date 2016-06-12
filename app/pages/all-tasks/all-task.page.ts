import {OnInit} from '@angular/core';
import {Page,NavController} from 'ionic-angular';
import {DataService} from '../service/data.service';
import {Task} from '../service/Task';
//SqlStorage
import {Storage,SqlStorage,Platform} from 'ionic-angular';


@Page({
  templateUrl: 'build/pages/all-tasks/all-task.html',
  providers:[DataService,Task]
})
export class AllTaskPage implements OnInit{

  public allTasks:Task[]=[];
  storage;

  constructor(private nav:NavController,private dataService:DataService,private platform:Platform){
/*
    this.platform.ready().then(()=>{
        this.storage=new Storage(SqlStorage);
    });
    */
  }

  ngOnInit(){
    this.showAllTasks();

  }

  //show all tasks
  showAllTasks(){
    this.dataService.selectAllTasks().then((data)=>{
          if(data.res.rows.length>0){
            for(var i=0;i < data.res.rows.length;i++){
              // console.log(data.res.rows.item(i));
              let myTask=new Task();
              myTask.title=data.res.rows.item(i).title;
              myTask.comment=data.res.rows.item(i).comment;
              myTask.date=data.res.rows.item(i).date;
              myTask.time=data.res.rows.item(i).time;
              this.allTasks.push(myTask);
              //console.log(myTask);  //debug only
            }
          }
    });
  }


  //on done click
  taskDone(item:Task){

  }

  //on remove click
  removeTask(item:Task){
      //local remove
      this.dataService.deleteTask(item.title);
  }

  //on update click
  updateTasks(){
    this.nav.push(AllTaskPage);
  }


}
