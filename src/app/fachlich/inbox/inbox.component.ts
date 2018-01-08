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
    // this.padacaService.getChatPartner().subscribe((res: Response) => {
    //   this.userList = res.data.result;
    //   if (this.userList.length > 0) {
    //     this.showChat(this.userList[0]);
    //   }
    // }, (err) => {

    // });
    this.userList = [ // Mock
      {
        'userID': 124,
        'username': 'michi',
        'vorname': 'Michael',
        'nachname': 'Dunsche',
        'alter': 20,
        'pkw': 'VW Golf',
        'beschreibung': 'Kein Essen im Auto'
      },
      {
        'userID': 125,
        'username': 'larsi',
        'vorname': 'Lars',
        'nachname': 'Schoepke',
        'alter': 21,
        'pkw': '---',
        'beschreibung': 'Bin echt lieb.'
      },
      {
        'userID': 126,
        'username': 'jonny',
        'vorname': 'Jonas',
        'nachname': 'Hammerschmidt',
        'alter': 21,
        'pkw': '---',
        'beschreibung': 'Bin echt lieb.'
      }
    ];
  }

  public showChat(selectedUser: User) {
    // this.padacaService.getChat(selectedUser).subscribe((res: Response) => {
    //   this.selectedChat = res.data;
    // }, (err) => {

    // });
    let chatLars = {
      'user': {
        'userID': 111,
        'username': 'tester',
        'vorname': 'Mr.',
        'nachname': 'Test',
        'alter': 20,
        'pkw': 'VW Golf',
        'beschreibung': 'Kein Essen im Auto'
      },
      'chatPartner': {
        'userID': 125,
        'username': 'larsi',
        'vorname': 'Lars',
        'nachname': 'Schoepke',
        'alter': 21,
        'pkw': '---',
        'beschreibung': 'Bin echt lieb.'
      },
      'messages': [
        {
          'message': 'Lars. Hallo, was geht?',
          'zeitstempel': 17823687123,
          'receiverID': 125,
          'reiseID': -1 // Anfrage wenn != -1 ansonsten normale Nachricht
        },
        {
          'message': 'Nix bei dir?',
          'zeitstempel': 17823696551,
          'receiverID': 111,
          'reiseID': -1
        },
        {
          'message': 'Auch nix.',
          'zeitstempel': 17823838890,
          'receiverID': 125,
          'reiseID': -1
        }
      ]
    };
    let chatMichi = {
      'user': {
        'userID': 111,
        'username': 'tester',
        'vorname': 'Mr.',
        'nachname': 'Test',
        'alter': 20,
        'pkw': 'VW Golf',
        'beschreibung': 'Kein Essen im Auto'
      },
      'chatPartner': {
        'userID': 124,
        'username': 'michi',
        'vorname': 'Michael',
        'nachname': 'Dunsche',
        'alter': 20,
        'pkw': 'VW Golf',
        'beschreibung': 'Kein Essen im Auto'
      },
      'messages': [
        {
          'message': 'Michi. Hallo, was geht?',
          'zeitstempel': 1218823687123,
          'receiverID': 124,
          'reiseID': 1 // Anfrage wenn != -1 ansonsten normale Nachricht
        },
        {
          'message': 'Nix bei dir?',
          'zeitstempel': 17823696551,
          'receiverID': 111,
          'reiseID': -1
        },
        {
          'message': 'Auch nix.',
          'zeitstempel': 17823838890,
          'receiverID': 124,
          'reiseID': -1
        }
      ]
    };
    let chatJonas = {
      'user': {
        'userID': 111,
        'username': 'tester',
        'vorname': 'Mr.',
        'nachname': 'Test',
        'alter': 20,
        'pkw': 'VW Golf',
        'beschreibung': 'Kein Essen im Auto'
      },
      'chatPartner': {
        'userID': 126,
        'username': 'jonny',
        'vorname': 'Jonas',
        'nachname': 'Hammerschmidt',
        'alter': 21,
        'pkw': '---',
        'beschreibung': 'Bin echt lieb.'
      },
      'messages': [
        {
          'message': 'Jonas. Hallo, was geht?',
          'zeitstempel': 17823687123,
          'receiverID': 126,
          'reiseID': -1 // Anfrage wenn != -1 ansonsten normale Nachricht
        },
        {
          'message': 'Nix bei dir?',
          'zeitstempel': 17823696551,
          'receiverID': 111,
          'reiseID': -1
        },
        {
          'message': 'Auch nix.',
          'zeitstempel': 17823838890,
          'receiverID': 126,
          'reiseID': -1
        }
      ]
    };

    if (selectedUser.userID == 125) {
      this.selectedChat = chatLars;
    } else if (selectedUser.userID == 124) {
      this.selectedChat = chatMichi;
    } else if (selectedUser.userID == 126) {
      this.selectedChat = chatJonas;
    } else {
      this.selectedChat = null;
    }
  }

  public addMessage(message: Message) {
    // this.padacaService.putSendMessage(message).subscribe(() => {});
    this.selectedChat.messages.push(message);
    console.log('event');
  }
}
