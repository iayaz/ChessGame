import { Chess } from 'chess.js';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {  Square } from 'chess.js';
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
export class BoardComponent  {
  @Input() chess!: Chess;
  @Input() board: any;
  clicked: Square | null;


  constructor(private ws: WsService) {
    this.clicked = null;
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
