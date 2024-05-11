import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Chess } from 'chess.js';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {
  chess = new Chess();

}
