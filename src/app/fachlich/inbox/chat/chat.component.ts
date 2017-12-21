import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../interfaces';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Input() messages: Message[];

  constructor() { }

  ngOnInit() { }

  public sendMessage() {
    console.log(this.messages);
  }
}
