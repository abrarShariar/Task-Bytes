import {Page,Toast,NavController} from 'ionic-angular';
import {NgForm} from '@angular/Common';
//service
import {DataService} from '../service/data.service';
//ngZone
import {NgZone,OnInit} from '@angular/core';
//date picker
import {Task} from '../service/Task';


@Page({
    templateUrl:'build/pages/add-task/add-task.html',
    providers:[DataService,Task]
})
export class AddTaskPage{

    items:Task[]=[];
    taskTitle:string="";
    taskComment:string="";
    taskDate;
    taskTime;
    currentDate;

    ngOnInit(){
      var time=new Date();
      var day=time.getUTCDate();
      var month=time.getUTCMonth()+1;
      var newMonth="";
      if(month > 12){
        month=1;
      }
      var year=time.getFullYear();
      if(month < 10){
        this.currentDate=year+"-0"+month+"-"+day;
      }else{
        this.currentDate=year+"-"+month+"-"+day;
      }
      // console.log(this.currentDate);
      this.taskDate=this.currentDate;

    }

    constructor(private myTask:Task,private nav:NavController,private zone:NgZone,private dataService:DataService){

        // this.dataService.getData().then((tasks)=>{
        //   if(tasks){
        //     this.zone.run(()=>{
        //       this.items=JSON.parse(tasks);
        //     });
        //   }
        // });
    }
    saveItem(item){
      console.log(item);
      this.dataService.save(this.taskTitle,item);
    }
    onSubmit(){
      this.myTask.title=this.taskTitle;
      this.myTask.comment=this.taskComment;
      this.myTask.date=this.taskDate;
      this.myTask.time=this.taskTime;
      // console.log(this.myTask);
      this.saveItem(this.myTask);
    }
    //show data on toast
    presentToast(){
      let toast=Toast.create({
        message:"New Task Added: "+this.taskTitle,
        duration:3000,
        showCloseButton:true,
        closeButtonText:"OK"
      });
      this.nav.present(toast);
    }
}
