import { Response } from './../interfaces';
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

    this.padaService.getPinned().subscribe((res: Response) => {
      console.log('getPinned', res);
      this.gepinnteReisen = res.data.result;

      this.gepinnteReisen.forEach(reise => {
        let d = new Date(reise.zeitstempel);
        reise.datum = d.toLocaleDateString();
        reise.reisedauer = this.berechenFahrzeit(reise);
      });
    }, (err) => {
      console.log('getPinned', err);
      this.gepinnteReisen = [];
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
    this.padaService.deletePinned(reise).subscribe((res: Response) => {
      console.log('deletePinned', res);
    }, (err) => {
      console.log('deletePinned', err);
    });
  }
}

