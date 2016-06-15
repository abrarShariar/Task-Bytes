import {Page,Toast,NavController,Storage,SqlStorage,Platform} from 'ionic-angular';
import {NgForm} from '@angular/Common';
//ngZone
import {NgZone,OnInit} from '@angular/core';
//date picker
import {Task} from '../service/Task';
//All tasks page
import {AllTaskPage} from '../all-tasks/all-task.page';


@Page({
    templateUrl:'build/pages/add-task/add-task.html'
})
export class AddTaskPage{

    taskTitle:string="";
    taskComment:string="";
    taskDate;
    taskTime;
    taskTag;
    currentDate;
    storage;
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

    constructor(private nav:NavController,private platform:Platform){
      this.platform.ready().then(()=>{
        this.storage=new Storage(SqlStorage);
      });
    }

    //INSERT data
    onSubmit(){
      this.platform.ready().then(()=>{
          this.storage.query("INSERT INTO myTasks (title,comment,date,time,tag) VALUES("+"'"+this.taskTitle+"'"+","+"'"+this.taskComment+"','"+this.taskDate+"','"+this.taskTime+"','"+this.taskTag+"')").then((data)=>{
            console.log(data);    //debug only
          },(error)=>{
              console.log("error->"+JSON.stringify(error.err));
          });
      });
      this.presentToast();
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

      //redirect to all tasks
      this.nav.push(AllTaskPage);
    }

    //Drop table myTasks [test only]
    dropMyTasks(){
      this.storage.query("DROP TABLE myTasks").then((data)=>{
        console.log(data);
      });
    }
}
