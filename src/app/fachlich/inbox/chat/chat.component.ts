import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../interfaces';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Input() messages: Message[];
  message: string;

  constructor() { }

  ngOnInit() { }

  public sendMessage() {
    console.log('Message', this.message);
    console.log('Chat', this.messages);
    this.message = null;
  }
  
  keypress(keycode) {
    console.log(keycode);
    if (keycode == 13) {
      this.sendMessage();
    }
  }
}
