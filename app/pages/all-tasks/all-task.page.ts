import {OnInit} from '@angular/core';
import {Page,NavController} from 'ionic-angular';
import {DataService} from '../service/data.service';
import {Task} from '../service/Task';


@Page({
  templateUrl: 'build/pages/all-tasks/all-task.html',
  providers:[DataService,Task]
})
export class AllTaskPage implements OnInit{

  public allTasks:Task[]=[];

  constructor(private nav:NavController,private dataService:DataService){}

  ngOnInit(){
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
                console.log(myTask);
              }
            }
      });
  }
}
