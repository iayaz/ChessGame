import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WsService {
  socket!: WebSocket | null;
  ws_url = 'ws://localhost:8080';
  private ws;
  public messages$: Subject<any> = new Subject<any>();

  constructor() {
    this.ws = new WebSocket(this.ws_url);

    this.ws.onopen = () => {
      this.socket = this.ws;
      console.log('Connected to the backend');
      this.ws.onmessage = (event) => {
        this.messages$.next(JSON.parse(event.data));
      };
    };

    this.ws.onclose = () => {
      this.socket = null;
      console.log('Connection closed');
    };
  }

  sendMessage(msg: any) {
    this.socket?.send(JSON.stringify(msg));
  }
}
