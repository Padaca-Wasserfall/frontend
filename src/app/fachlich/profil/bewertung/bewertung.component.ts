import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Bewertung, User } from '../../interfaces';

@Component({
  selector: 'app-bewertung',
  templateUrl: './bewertung.component.html',
  styleUrls: ['./bewertung.component.css']
})
export class BewertungComponent {
  user: User;
  bewertungen: Bewertung[] = [];
  sichtbareBewertungen: Bewertung[] = [];
  filterid: number;
  Arr = Array;

  constructor( @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<BewertungComponent>) {
    this.user = data.user;
    this.bewertungen = data.bewertungen;
    this.sichtbareBewertungen = this.bewertungen;
    this.filterid = 0;
  }

  private anzahlBewertungen(sterne: number): Number {
    return this.bewertungen.filter((bewertung) => bewertung.rating == sterne).length;
  }

  private filter(sterne: number) {
    if (this.filterid == sterne) {
      this.filterid = 0;
    } else {
      this.filterid = sterne;
    }

    if (this.filterid != 0) {
      this.sichtbareBewertungen = this.bewertungen.filter(bewertung => bewertung.rating == this.filterid);
    } else {
      this.sichtbareBewertungen = this.bewertungen;
    }
  }
}
