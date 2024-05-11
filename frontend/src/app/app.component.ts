import { GAME_OVER, INIT_GAME, MOVE } from './../../../backend/src/messages';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BoardComponent } from './components/board/board.component';
import { WsService } from './service/ws.service';
import { Chess } from 'chess.js';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, BoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  isStarted: boolean;
  chess: Chess;
  board: any;
  constructor(private ws: WsService) {
    this.chess = new Chess();
    this.board = this.chess.board();
    this.isStarted = false;
    this.ws.createConnection();
  }

  ngOnInit(): void {
    this.ws.messages$.subscribe((message) => {
      switch (message.type) {
        case INIT_GAME:
          this.board = this.chess.board();
          break;
        case MOVE:
          const move = message.payload;
          this.chess.move(move);
          break;
        case GAME_OVER:
          console.log('Game Over');
      }
    });
  }

  initGame() {
    this.ws.sendMessage({
      type: INIT_GAME,
    });
    this.isStarted = true;
  }
}
