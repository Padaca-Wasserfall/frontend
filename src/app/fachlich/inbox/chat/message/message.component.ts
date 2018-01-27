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
  @Input() requestAnswerable: boolean;
  @Output() permited = new EventEmitter<number>();
  @Output() denied = new EventEmitter<number>();

  private time = '';

  epochTicks = 621355968000000000;
  ticksPerMillisecond = 10000;
  maxDateMilliseconds = 8640000000000000;

  constructor(private padacaService: PadacaService, private router: Router) { }

  ngOnInit() { 
    const date: Date = this.ticksToDateString(this.message.zeitstempel);
    date.setHours(date.getHours() - 1);
    this.time = date.toISOString();
  }

  ticksToDateString(ticks) {
    const ticksSinceEpoch = ticks - this.epochTicks;
    const millisecondsSinceEpoch = ticksSinceEpoch / this.ticksPerMillisecond;
 
    return new Date(millisecondsSinceEpoch);
  }


  public isSender() {
    if (this.padacaService.getSession().userID == this.message.receiverID) {
      return false;
    } else {
      return true;
    }
  }

  // public getTimeStamp(): string {
  //   let date = new Date(this.message.zeitstempel);
  //   return date.toLocaleDateString('de-DE', {
  //     hour: '2-digit', minute: '2-digit'
  //   }) + '  Uhr';
  // }

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
