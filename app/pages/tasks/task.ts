//for ionic
import {Page, NavController} from 'ionic-angular';

import {OnInit} from '@angular/core';
import {TaskService} from '../service/task.service';
import {Task} from '../service/Task';

@Page({
  templateUrl:'build/pages/tasks/task.html',
  providers:[TaskService]
})
export class TaskPage{
    public allTasks:Task[]=[];

    constructor(private nav:NavController,private taskService:TaskService){}
    ngOnInit(){
      this.allTasks=this.taskService.getTasks();
    }

}
