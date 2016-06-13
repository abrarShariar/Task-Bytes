import {OnInit} from '@angular/core';
import {Page,NavController} from 'ionic-angular';
import {DataService} from '../service/data.service';
import {Task} from '../service/Task';
import {Storage,SqlStorage,Platform} from 'ionic-angular';

@Page({
  template: '<h1>Completed Tasks</h1>',
  providers: [DataService,Task]
})
export class CompletedTasksPage{

  ngOnInit(){
    this.dataService.getCompletedTasks();

  }
  constructor(private nav:NavController,private dataService:DataService,private platform:Platform){

  }

}
