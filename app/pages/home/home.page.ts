import {Page, NavController} from 'ionic-angular';
import {ViewChild} from '@angular/core';
import {AddTaskPage} from '../add-task/add-task.page';


@Page({
  templateUrl:'build/pages/home/home.html',
})
export class HomePage{

    constructor(private nav:NavController){
      console.log("Home");
    }

    addTask(){
      this.nav.push(AddTaskPage);
    }
}
