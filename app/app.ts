import {ViewChild,OnInit} from '@angular/core';
import {App, Platform, MenuController, Nav,SqlStorage,Storage} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
//components/pages
import {HomePage} from './pages/home/home.page';
import {AllTaskPage} from './pages/all-tasks/all-task.page';
import {AddTaskPage} from './pages/add-task/add-task.page';
import {CompletedTasksPage} from './pages/completed-tasks/completed-tasks.page';
//data service
import {DataService} from './pages/service/data.service';

import {NgZone} from '@angular/core';


class MyPages{
  title:string;
  component:any;
}
@App({
  templateUrl: 'build/app.html',
  providers:[DataService],
  config: {
    mode:'md'
  } // http://ionicframework.com/docs/v2/api/config/Config/
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = HomePage;
  pages:MyPages[]=[];
  data:any[]=[];
  storage;

  constructor(
    private platform: Platform,
    private menu: MenuController,
    private dataService:DataService,
    private zone:NgZone
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      {title: 'Home', component: HomePage },
      {title:'New',component: AddTaskPage},
      {title: 'All',component: AllTaskPage},
      {title: 'Completed', component: CompletedTasksPage}
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.storage=new Storage(SqlStorage);
      this.storage.query('CREATE TABLE IF NOT EXISTS myTasks (id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT,comment TEXT,date TEXT,time TEXT,tag TEXT)').then((data)=>{
          //console.log(data);
        },(error)=>{
          console.log("Error->"+JSON.stringify(error.err));
        });
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
