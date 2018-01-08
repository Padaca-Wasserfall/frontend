import { Router } from '@angular/router';
import { PadacaService } from './../../padaca.service';
import { Message, Chat } from './../../interfaces';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { MatCardContent } from '@angular/material';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @ViewChild(MatCardContent) content: ElementRef;
  @Input() chat: Chat;
  message: string;
  @Output() addMessage = new EventEmitter<Message>();

  constructor(private padacaService: PadacaService, private router: Router) { }

  ngOnInit() { }

  public showProfile() {
    this.router.navigate(['/profil/' + this.chat.chatPartner]);
  }

  public sendMessage(info?: string) {
    let dto: Message = {
      message: info ? info : this.message,
      receiverID: this.chat.chatPartner.userID,
      reiseID: -1,
      zeitstempel: +Date.now()
    };
    this.addMessage.emit(dto);
    this.message = null;

    // scroll down
    let objDiv = document.getElementById('content');
    console.log(objDiv.scrollTop, objDiv.scrollHeight);
    objDiv.scrollTop = objDiv.scrollHeight + 100;
    console.log(objDiv.scrollTop, objDiv.scrollHeight);
  }

  public keypress(keycode) {
    if (keycode == 13) {
      this.sendMessage();
    }
  }

  public deny(reiseID: number) {
    this.padacaService.postMitfahrtBestätigen(reiseID, this.chat.chatPartner.userID, false).subscribe();
    this.sendMessage('Die Anfrage wurde abgelehnt.');
  }

  public permit(reiseID: number) {
    this.padacaService.postMitfahrtBestätigen(reiseID, this.chat.chatPartner.userID, true).subscribe();
    this.sendMessage('Die Anfrage wurde angenommen.');
  }
}
