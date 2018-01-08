import { PadacaService } from './../../../padaca.service';
import { Message } from './../../../interfaces';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() message: Message;

  constructor(private padacaService: PadacaService) { }

  ngOnInit() { }

  isSender() {
    if (this.padacaService.getSession().userID == this.message.receiverID) {
      return false;
    } else {
      return true;
    }
  }

}
