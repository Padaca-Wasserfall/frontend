import { Response, Message } from './../interfaces';
import { Component, OnInit } from '@angular/core';
import { Chat, User } from '../interfaces';
import { PadacaService } from '../padaca.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  userList: User[];
  selectedChat: Chat;

  constructor(private padacaService: PadacaService) { }

  ngOnInit() {
    this.padacaService.getChatPartner().subscribe((res: Response) => {
      console.log('chatPartner', res);
      this.userList = res.data;
      if (this.userList.length > 0) {
        this.showChat(this.userList[0]);
      }
    }, (err) => {
      console.log('chatPartner', err);
    });
  }

  public showChat(selectedUser: User) {
    this.padacaService.getChat(selectedUser).subscribe((res: Response) => {
      console.log('getChat', res);
      this.selectedChat = res.data;
    }, (err) => {
      console.log('getChat', err);
    });
  }

  public addMessage(message: Message) {
    this.padacaService.putSendMessage(message).subscribe((res: Response) => {
      console.log('sendMessage', res);
      this.selectedChat = res.data;
    }, (err) => {
      console.log('sendMessage', err);
    });
    this.selectedChat.messages.push(message);
  }
}
