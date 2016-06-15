import {OnInit} from '@angular/core';
import {Page,NavController} from 'ionic-angular';
import {DataService} from '../service/data.service';
import {Task} from '../service/Task';
import {Storage,SqlStorage,Platform} from 'ionic-angular';


@Page({
  templateUrl: 'build/pages/completed-tasks/completed-tasks.html',
  providers: [DataService,Task]
})
export class CompletedTasksPage{

  public completeTask:Task[]=[];

  ngOnInit(){
      this.getCompletedTasks();
  }
  constructor(private nav:NavController,private dataService:DataService,private platform:Platform){

  }


  getCompletedTasks(){
    this.dataService.selectCompletedTasks().then((data)=>{
      //console.log(data);
      if(data.res.rows.length>0){
        for(let i=0;i < data.res.rows.length;i++){
            //console.log(data.res.rows.item(i));
            let task=new Task();
            task.title=data.res.rows.item(i).title;
            task.date=data.res.rows.item(i).date;
            this.completeTask.push(task);
        }
      }
    });
  }

  //on click clear all
  clearAll(){
  //this.dataService.dropCompletedTable();
    this.dataService.deleteCompletedTasks();
    this.updateTasks();

  }
  updateTasks(){
    this.nav.push(CompletedTasksPage);
  }


}
