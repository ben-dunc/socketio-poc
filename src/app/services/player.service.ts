import { Injectable } from '@angular/core';
import { io } from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  public playerPositions = [];
  public roomId;
  public socket;
  public userId;
  
  constructor() {}

  async connectToRoom(room: string) {
    if (!this.socket) {
      this.socket = io('http://localhost:3000');
      await this.socket.on('connect', () => {
        this.userId = this.socket.id;
        console.log(this.userId);
      });
    }

    this.roomId = room.toUpperCase();
    this.socket.emit('join room', this.roomId);
    this.socket.on('update all', (data) => this.updateAll(data));
  }

  disconnect() {
    console.log('leave room');
    this.socket.emit('leave room', this.roomId);
    this.playerPositions = [];
  }

  updateAll(data) {
    delete data[this.userId];
    this.playerPositions = Object.values(data);
  }

  updatePlayerPosition(position: any) {
    this.socket.emit('update player position', position);
  }
}
