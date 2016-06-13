/*
  This service handles all the SqlStorage related work
*/
import {Injectable} from '@angular/core';
import {Platform, Storage, SqlStorage} from 'ionic-angular';
import {Task} from './Task';

@Injectable()
export class DataService {

    storage;

    constructor(private platform: Platform) {
        this.platform.ready().then(() => {
            this.storage = new Storage(SqlStorage);
        });
    }

    //get all tasks [SELECT]
    selectAllTasks(): Promise<any> {
        return this.storage.query("SELECT * FROM myTasks ORDER BY id DESC");
    }

    //delete specific task (on click remove) [DELETE]
    deleteTask(taskTitle) {
        this.storage.query("DELETE FROM myTasks WHERE title='" + taskTitle + "'").then((data) => {
            //console.log(data);
        }, (error) => {
            console.log("error->" + JSON.stringify(error.err));
        });
    }

    //delete all tasks [DELETE]
    deleteAllTasks() {
        this.storage.query("DELETE FROM myTasks").then((data) =>{
          console.log(data);  //debug only
        },(error) => {
            console.log("error->" + JSON.stringify(error.err));
        });
    }

    //create table for completed tasks [CREATE]
    createCompletedTable(){
      this.storage.query('CREATE TABLE IF NOT EXISTS completedTasks (title TEXT,date TEXT)').then((data)=>{
          //console.log(data);
        },(error)=>{
          console.log("Error->"+JSON.stringify(error.err));
        });
    }
    //add task to completed tasks [INSERT]
    insertCompletedTask(item:Task){
      this.storage.query("INSERT INTO completedTasks (title,date) VALUES("+"'"+item.title+"','"+item.date+"'"+")").then((data)=>{
        //console.log(data);    //debug only
      },(error)=>{
          console.log("error->"+JSON.stringify(error.err));
      });
    }

    //get all completed tasks
    getCompletedTasks(){
      this.storage.query("SELECT * FROM completedTasks").then((data)=>{
        console.log(data);
      },(error)=>{
        console.log("error->"+JSON.stringify(error.err));
      });
    }
}
