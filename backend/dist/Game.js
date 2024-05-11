"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const messages_1 = require("./messages");
class Game {
    constructor(player1, player2) {
        this.moveCount = 0;
        this.player1 = player1;
        this.player2 = player2;
        this.board = new chess_js_1.Chess();
        this.player1.send(JSON.stringify({
            type: messages_1.INIT_GAME,
            payload: {
                color: "white",
            },
        }));
        this.player2.send(JSON.stringify({
            type: messages_1.INIT_GAME,
            payload: {
                color: "black",
            },
        }));
    }
    makeMove(socket, move) {
        if (socket != this.player1 && socket != this.player2)
            return;
        try {
            console.log(move);
            this.board.move(move);
        }
        catch (e) {
            console.error("Invalid move:", e);
            return;
        }
        console.log("herr::", move, socket);
        if (this.board.isGameOver()) {
            const winner = this.board.turn() === "w" ? "black" : "white";
            this.player1.send(JSON.stringify({ type: messages_1.GAME_OVER, payload: { winner } }));
            this.player2.send(JSON.stringify({ type: messages_1.GAME_OVER, payload: { winner } }));
            return;
        }
        this.moveCount++;
        console.log(this.moveCount);
        const nextPlayer = socket === this.player1 ? this.player2 : this.player1;
        nextPlayer.send(JSON.stringify({ type: messages_1.MOVE, payload: move }));
    }
}
exports.Game = Game;
