import { Chess } from "chess.js";
import { WebSocket } from "ws";
import { GAME_OVER, INIT_GAME, MOVE } from "./messages";

export class Game {
  public player1: WebSocket;
  public player2: WebSocket;
  private board: Chess;
  private moveCount = 0;

  constructor(player1: WebSocket, player2: WebSocket) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = new Chess();
    this.player1.send(
      JSON.stringify({
        type: INIT_GAME,
        payload: {
          color: "white",
        },
      })
    );
    this.player2.send(
      JSON.stringify({
        type: INIT_GAME,
        payload: {
          color: "black",
        },
      })
    );
  }

  makeMove(socket: WebSocket, move: { from: string; to: string }) {
    if (socket != this.player1 && socket != this.player2) return;

    try {
      this.board.move(move);
    } catch (e) {
      console.error("Invalid move:", e);
      return;
    }
    if (this.board.isGameOver()) {
      const winner = this.board.turn() === "w" ? "black" : "white";
      this.player1.send(JSON.stringify({ type: GAME_OVER, payload: { winner } }));
      this.player2.send(JSON.stringify({ type: GAME_OVER, payload: { winner } }));
      return;
    }

    this.moveCount++;

    const nextPlayer = socket === this.player1 ? this.player2 : this.player1;
    nextPlayer.send(JSON.stringify({ type: MOVE, payload: move }));
  }
}
