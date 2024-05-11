import { INIT_GAME } from './../../../backend/src/messages';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BoardComponent } from './components/board/board.component';
import { WsService } from './service/ws.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, BoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  isStarted = false;
  constructor(private ws: WsService) {}

  

  initGame() {
    this.ws.sendMessage({
      type: INIT_GAME,
    });
    this.isStarted = true;
  }
}
