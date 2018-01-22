import { PadacaService } from './../padaca.service';
import { Bewertung, Reise, Response, User } from './../interfaces';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-bewertung-schreiben',
  templateUrl: './bewertung-schreiben.component.html',
  styleUrls: ['./bewertung-schreiben.component.css']
})
export class BewertungSchreibenComponent {

  public message = '';
  public bewertung = 0;
  public indices = [1, 2, 3, 4, 5];
  private reise: Reise = {};
  private user: User = {};

  constructor(public dialogRef: MatDialogRef<BewertungSchreibenComponent>, @Inject(MAT_DIALOG_DATA) data: any, private padacaService: PadacaService) {
    this.reise = data.reise;
    this.user = data.user;
  }

  public send() {
    let bew: Bewertung = {
      reiseID: this.reise.reiseID,
      fahrer: this.reise.fahrer,
      mitfahrer: this.user,
      rating: this.bewertung,
      ratingText: this.message
    };
    this.padacaService.putBewertenAlsMitfahrer(bew).subscribe((res: Response) => {
      console.log('Mitfahrer bewertet Fahrer', res);
      this.dialogRef.close();
    }, (err) => {
      console.log('Mitfahrer bewertet Fahrer', err);
    });
  }

  public cancel() {
    this.dialogRef.close();
  }

  public setBewertung(bewertung: number) {
    this.bewertung = bewertung;
  }

  public isCorrect(): boolean {
    if (this.bewertung > 0 && this.message.length > 0) {
      return true;
    } else {
      return false;
    }
  }
}
