import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('content') content: any;
  
  public roomCode = '';
  public mouse = {
    x: 50,
    y: 50
  };

  public playerPositions = [];

  private updateObs: NodeJS.Timeout;
  
  constructor(private route: ActivatedRoute, private nav: NavController, public playerService: PlayerService) { }
  
  ngOnInit() {
    this.route.paramMap.subscribe(map => {
      this.roomCode = map.get('room');
      this.playerService.connectToRoom(this.roomCode);
    })
  }

  ngAfterViewInit(): void {
    this.content.el.onmousemove = (event) => {
      this.mouse = {
        x: event.x - 8,
        y: event.y - 63
      };
      this.playerService.updatePlayerPosition(this.mouse);
    }
  }

  ngOnDestroy(): void {
    this.playerService.disconnect();
  }

  exitRoom() {
    this.playerService.disconnect();
    this.nav.navigateBack('');
  }
}
