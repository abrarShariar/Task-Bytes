import {ViewChild,OnInit} from '@angular/core';
import {App, Platform, MenuController, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
//components
import {HomePage} from './pages/home/home.page';
import {ListPage} from './pages/list/list';
import {TaskPage} from './pages/tasks/task';
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

  ngOnInit(){
    // this.dataService.clearData().then((tasks)=>{
    //   this.zone.run(()=>{
    //     this.data=JSON.parse(tasks);
    //     console.log(tasks);
    //   });
    // });
    // this.dataService.showAll().then((data)=>{
    //   console.log(data);
    // });

    this.dataService.getData("ng2").then((tasks)=>{
        console.log(tasks);
    });
  }
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
      {title: 'My Tasks',component: TaskPage},
      {title: 'My First List', component: ListPage},
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
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
