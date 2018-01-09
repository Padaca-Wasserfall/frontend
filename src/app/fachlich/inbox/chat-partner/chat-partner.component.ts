import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../interfaces';

@Component({
  selector: 'app-chat-partner',
  templateUrl: './chat-partner.component.html',
  styleUrls: ['./chat-partner.component.css']
})
export class ChatPartnerComponent implements OnInit {

  private selectedUser: User;
  @Input() userList: User[] = [];
  @Output() userSelected = new EventEmitter<User>();

  constructor() { }

  ngOnInit() {
    if (this.userList && this.userList.length > 0) {
      this.changeUser(this.userList[0]);
    }
  }

  public changeUser(user: User) {
    this.selectedUser = user;
    this.userSelected.emit(user);
  }

  public isSelectedUser(user): boolean {
    if (user == this.selectedUser) {
      return true;
    } else {
      return false;
    }
  }
}
