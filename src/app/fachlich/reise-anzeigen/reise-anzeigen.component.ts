import { MessageDialogComponent } from './../message-dialog/message-dialog.component';
import { User, Response } from './../interfaces';
import { PricePipe } from './../../technisch/price.pipe';
import { Component, OnInit } from '@angular/core';
import { Reise } from '../interfaces';
import { PadacaService } from '../padaca.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';

@Component({
  selector: 'app-reise-anzeigen',
  templateUrl: './reise-anzeigen.component.html',
  styleUrls: ['./reise-anzeigen.component.css']
})
export class ReiseAnzeigenComponent implements OnInit {

  reise: Reise = {};
  reiseZeitpunkt: Date;
  preis: string;
  freiePlaetze: number;
  isOwnReise: boolean;

  constructor(private route: ActivatedRoute, private padacaService: PadacaService, private router: Router,
    private pricePipe: PricePipe, private snackbar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let reiseID = params['reiseID'];
      if (reiseID) {
        this.padacaService.getReise(reiseID).subscribe(); // todo
        // MOCK-Reise
        this.reise = {
          reiseID: reiseID,
          fahrer: {
            userID: 126,
            username: 'jonny',
            vorname: 'Jonas',
            nachname: 'Hammerschmidt',
            alter: 21,
            pkw: '---',
            beschreibung: 'Bin echt lieb.'
          },
          mitfahrer: [
            {
              'userID': 111,
              'username': 'tester',
              'vorname': 'Mr.',
              'nachname': 'Test',
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
          ],
          start: 'Paderborn',
          ziel: 'München',
          zeitstempel: 1218823687123,
          plaetzeMax: 4,
          preis: 1000,
          beschreibung: 'Die Sonne scheint, der Himmel lacht, nie hat mir programmieren so viel Spaß gemacht. Die Sonne scheint, der Himmel lacht, nie hat mir programmieren so viel Spaß gemacht. Die Sonne scheint, der Himmel lacht, nie hat mir programmieren so viel Spaß gemacht. Die Sonne scheint, der Himmel lacht, nie hat mir programmieren so viel Spaß gemacht. Die Sonne scheint, der Himmel lacht, nie hat mir programmieren so viel Spaß gemacht. Die Sonne scheint, der Himmel lacht, nie hat mir programmieren so viel Spaß gemacht. Die Sonne scheint, der Himmel lacht, nie hat mir programmieren so viel Spaß gemacht.',
          umwegMax: 50
        };
        this.isOwnReise = this.reise.fahrer.userID == this.padacaService.getSession().userID ? true : false;
        this.reiseZeitpunkt = new Date(this.reise.zeitstempel);
        this.preis = this.pricePipe.transform(this.reise.preis);
        this.freiePlaetze = this.reise.mitfahrer ? this.reise.plaetzeMax - this.reise.mitfahrer.length : this.reise.plaetzeMax;
      } else {
        this.router.navigate(['/home']);
      }
    });
  }

  public gesamteReiseAnzeigen() {
    // todo Maps api
  }

  public showStart() {
    // todo Maps api
  }

  public showZiel() {
    // todo Maps api
  }

  public showUserProfile() {
    if (this.reise.fahrer) {
      this.router.navigate(['/profil/' + this.reise.fahrer.userID]);
    }
  }

  public contact() {
    this.dialog.open(MessageDialogComponent, {
      disableClose: true
    }).afterClosed().subscribe((message: string) => {
      if (message) {
        if (this.isOwnReise) {
          this.reise.mitfahrer.forEach((mitfahrer: User) => {
            this.padacaService.putSendMessage({
              message: message,
              receiverID: mitfahrer.userID
            }).subscribe((result: Response) => { }); // todo
          });
        } else {
          this.padacaService.putSendMessage({
            message: message,
            receiverID: this.reise.fahrer.userID
          }).subscribe((result: Response) => { }); // todo
        }
      }
    });
  }

  public anfragen() {
    this.padacaService.putReiseAnfragen(this.reise).subscribe((result: Response) => {
      this.snackbar.open('Die Anfrage wurde versendet.', 'OK', {
        duration: 5000,
      });
    });
  }

  public isAngemeldet(): boolean {
    for (let i = 0; i < this.reise.mitfahrer.length; i++) {
      if (this.padacaService.getSession().userID == this.reise.mitfahrer[i].userID) {
        return true;
      }
    }
    return false;
  }

  public delete() {
    this.dialog.open(MessageDialogComponent, {
      disableClose: true
    }).afterClosed().subscribe((message: string) => {
      if (message) {
        if (this.isOwnReise) {
          this.padacaService.postReiseAbsagen(this.reise, message).subscribe((result: Response) => { });
        } else {
          this.padacaService.postReiseAbmelden(this.reise, message).subscribe((result: Response) => { });
        }
      }
    });
  }

  public pin() {
    this.padacaService.putPinned(this.reise).subscribe((result: Response) => { });
  }
}
