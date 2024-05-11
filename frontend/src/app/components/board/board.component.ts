import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Chess, Square } from 'chess.js';
import { WsService } from '../../service/ws.service';
import {
  GAME_OVER,
  INIT_GAME,
  MOVE,
} from '../../../../../backend/src/messages';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent implements OnInit {
  chess = new Chess();
  clicked: Square | null;

  board: any;

  constructor(private ws: WsService) {
    this.clicked = null;
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
          console.log('GAme Over|| ');
      }
    });
  }

  handleClick(row: any, col: any) {
    const squareRep = (String.fromCharCode(97 + (col % 8)) +
      '' +
      (8 - row)) as Square;
    if (!this.clicked) {
      this.clicked = squareRep;
      return;
    }
    this.chess.move({ from: this.clicked, to: squareRep });
    this.ws.sendMessage({
      type: MOVE,
      payload: {
        move: {
          from: this.clicked,
          to: squareRep,
        },
      },
    });
    this.clicked = null;
  }
}
