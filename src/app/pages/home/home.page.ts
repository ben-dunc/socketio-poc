import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public roomCode = "";

  constructor(private nav: NavController) {}

  // makeRoom() {
  //   console.log("new room!", this.roomCode);
  // }
  
  connectToRoom(code: string) {
    console.log('Naving to room ' + code);
    this.nav.navigateForward('room/' + code);
  }
}
