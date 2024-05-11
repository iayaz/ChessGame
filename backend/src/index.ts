import { WebSocketServer } from "ws";
import { GameManager } from "./GameManager";

const wss = new WebSocketServer({ port: 8080 });
const gameManager = new GameManager();

wss.on("connection", function connection(ws) {
  gameManager.addUser(ws);

  ws.on("message", (msg) => {
    try {
      const message = JSON.parse(msg.toString());
      console.log(JSON.stringify(message));
    } catch (error) {
      console.error("Error parsing incoming message:", error);
    }
  });

  ws.on("close", () => {
    gameManager.removeUser(ws);
  });
});
