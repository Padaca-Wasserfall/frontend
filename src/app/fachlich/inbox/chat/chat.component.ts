import { Router } from '@angular/router';
import { PadacaService } from './../../padaca.service';
import { Message, Chat, Response, User } from './../../interfaces';
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

  private answeredRequests: number[] = [];

  constructor(private padacaService: PadacaService, private router: Router) { }

  ngOnInit() {

  }

  public showProfile() {
    this.router.navigate(['/profil/' + this.chat.chatPartner.userID]);
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
    // this.scrollToBottom();
  }

  public scrollToBottom() {
    try {
      this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
    } catch (err) { }
  }

  public keypress(keycode) {
    if (keycode == 13) {
      this.sendMessage();
    }
  }

  public deny(reiseID: number) {
    this.padacaService.postMitfahrtBestätigen(reiseID, this.chat.chatPartner.userID, false).subscribe((res: Response) => {
      console.log('Mitfahrt ablehnen', res);
      this.chat.messages.push({
        message: 'Kannst leider nicht mitfahren',
        zeitstempel: 0,
        receiverID: this.chat.chatPartner.userID,
        reiseID: reiseID
      });
      // this.answeredRequests.push(reiseID);
      // this.sendMessage('Die Anfrage wurde abgelehnt.');
    }, (err) => {
      console.log('Mitfahrt ablehnen', err);
    });
  }

  public permit(reiseID: number) {
    this.padacaService.postMitfahrtBestätigen(reiseID, this.chat.chatPartner.userID, true).subscribe((res: Response) => {
      console.log('Mitfahrt bestätigen', res);
      this.chat.messages.push({
        message: 'Kannst mitfahren',
        zeitstempel: 0,
        receiverID: this.chat.chatPartner.userID,
        reiseID: reiseID
      });
      // this.answeredRequests.push(reiseID);
      // this.sendMessage('Die Anfrage wurde angenommen.');
    }, (err) => {
      console.log('Mitfahrt bestätigen', err);
    });
  }

  public isRequestAnswerable(reiseID: number): boolean {
    let count = 0;
    let singleId = -1;
    for (let i = 0; i < this.chat.messages.length; i++) {
      if (this.chat.messages[i].reiseID == reiseID) {
        count++;
        singleId = i;
      }
    }
    if (count == 1 && this.chat.messages[singleId].receiverID == this.chat.user.userID) {
      return true;
    }
    return false;
  }

  public selectChat(chatPartner: User) {
    
  }
}
