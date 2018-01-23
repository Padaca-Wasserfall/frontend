import { ChatComponent } from './chat/chat.component';
import { Response, Message } from './../interfaces';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Chat, User } from '../interfaces';
import { PadacaService } from '../padaca.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  @ViewChild('app-chat') chatView: ChatComponent;
  userList: User[];
  selectedChat: Chat;

  constructor(private padacaService: PadacaService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.padacaService.getChatPartner().subscribe((res: Response) => {
      console.log('chatPartner', res);
      if (res.success) {
        this.userList = res.data;
        if (this.userList.length > 0) {
          this.showChat(this.userList[0].userID);
          this.chatView.selectChat(this.userList[0]);
        } else {
          this.userList = [];
        }
      }
    }, (err) => {
      console.log('chatPartner', err);
      this.userList = [];
    });

    this.route.params.forEach((params: Params) => {
      let userID = params['userID'];
      if (userID) {
        this.showChat(userID);
      }
    });
  }

  public showChat(userID: number) {
    this.padacaService.getChat(userID).subscribe((res1: Response) => {
      console.log('getChat', res1);
      this.selectedChat = res1.data;
    }, (err1) => {
      console.log('getChat', err1);
      this.padacaService.getUser(userID).subscribe((res2: Response) => {
        console.log('user', res2);
        let chatPartner: User = res2.data;
        if (chatPartner) {
          this.userList.push(chatPartner);
          this.chatView.selectChat(chatPartner); // todo leerer chat bei getChat() als response, wenn chat nicht existiert
        }
      }, (err2) => {
        console.log('user', err2);
      });
    });
  }

  public addMessage(message: Message) {
    this.padacaService.putSendMessage(message).subscribe((res: Response) => {
      console.log('sendMessage', res);
      this.selectedChat = res.data;
    }, (err) => {
      console.log('sendMessage', err);
    });
    this.showChat(this.selectedChat.chatPartner.userID);
  }
}
