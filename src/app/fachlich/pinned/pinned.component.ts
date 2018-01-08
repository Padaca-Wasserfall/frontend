import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Reise, User, ReiseDatum } from '../interfaces';
import { PadacaService } from '../padaca.service';

@Component({
  selector: 'app-pinned',
  templateUrl: './pinned.component.html',
  styleUrls: ['./pinned.component.css']
})
export class PinnedComponent implements OnInit {
  gepinnteReisen: ReiseDatum[];

  constructor(public dialogRef: MatDialogRef<PinnedComponent>, @Inject(MAT_DIALOG_DATA) data: any, private padaService: PadacaService) { }

  ngOnInit() {
    this.gepinnteReisen = [];

    this.gepinnteReisen.push({
      reiseID: 123,
      fahrer: { username: 'Jonny Bleifuß' },
      start: 'Paderborn',
      ziel: 'Buxtehude',
      zeitstempel: 123456
    });

    this.gepinnteReisen.push({
      reiseID: 456,
      fahrer: { username: 'Renate Rastnicht' },
      start: 'Magdeburg',
      ziel: 'Sonstwo',
      zeitstempel: Date.now()
    });

    // TODO schnittstelle umbauen
    // this.padaService.getPinned().subscribe(pinnedRes =>{
    //  this.gepinnteReisen = pinnedRes.data;
    // });

    this.gepinnteReisen.forEach(reise => {
      let d = new Date(reise.zeitstempel);
      reise.datum = d.toLocaleDateString();
      reise.reisedauer = this.berechenFahrzeit(reise);
    });
  }

  berechenFahrzeit(reise: ReiseDatum): string {
    let url = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=' + reise.start + '&destinations=' + reise.ziel + '&key=YOUR_API_KEY';
    let response = 'So und so lange';
    
    return response;
  }

  clickAnzeigen(reise: ReiseDatum) {
    this.dialogRef.close(reise.reiseID);
  }

  clickEntfernen(reise: Reise, index: number) {
    this.gepinnteReisen.splice(index, 1);
    this.padaService.deletePinned(reise).subscribe();
  }
}

