import {Page} from 'ionic-angular';


@Page({
  templateUrl: 'build/pages/hello-ionic/hello-ionic.html'
})
export class HelloIonicPage {
  smallText:string="";

  constructor() {
    this.smallText="My name is Abrar Shariar";
  }
}
