import { Router } from '@angular/router';
import { PadacaService } from './../../../padaca.service';
import { Message } from './../../../interfaces';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() message: Message;
  @Output() permited = new EventEmitter<number>();
  @Output() denied = new EventEmitter<number>();

  constructor(private padacaService: PadacaService, private router: Router) { }

  ngOnInit() { }

  public isSender() {
    if (this.padacaService.getSession().userID == this.message.receiverID) {
      return false;
    } else {
      return true;
    }
  }

  public getTimeStamp(): string {
    let date = new Date(this.message.zeitstempel);
    return date.toLocaleDateString('de-DE', {
      hour: '2-digit', minute: '2-digit'
    }) + '  Uhr';
  }

  public reiseAnzeigen()  {
    this.router.navigate(['/reiseAnzeigen/' + this.message.reiseID]);
  }

  public annehmen() {
    this.permited.emit(this.message.reiseID);
  }

  public ablehnen() {
    this.denied.emit(this.message.reiseID);
  }
}
