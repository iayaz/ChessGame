import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Chess, Square } from 'chess.js';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent {
  chess = new Chess();
  clicked: Square | null;
  constructor() {
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
    this.clicked = null;
  }
}
