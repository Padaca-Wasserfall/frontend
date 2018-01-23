import { MessageDialogComponent } from './../message-dialog/message-dialog.component';
import { User, Response } from './../interfaces';
import { PricePipe } from './../../technisch/price.pipe';
import { Component, OnInit } from '@angular/core';
import { Reise } from '../interfaces';
import { PadacaService } from '../padaca.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { GoogleMapsService } from '../googlemaps.service';

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
    private pricePipe: PricePipe, private snackbar: MatSnackBar, private dialog: MatDialog, 
    private googleMaps: GoogleMapsService) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let reiseID = params['reiseID'];
      if (reiseID) {
        this.padacaService.getReise(reiseID).subscribe((res: Response) => {
          console.log('reiseAnzeigen', res);
          this.reise = res.data;
          if (this.padacaService.getSession() == null) {
            this.isOwnReise = false;
          } else {
            this.isOwnReise = this.reise.fahrer.userID == this.padacaService.getSession().userID ? true : false;
          }
          this.reiseZeitpunkt = new Date(this.reise.zeitstempel);
          this.preis = this.pricePipe.transform(this.reise.preis);
          this.freiePlaetze = this.reise.mitfahrer ? this.reise.plaetzeMax - this.reise.mitfahrer.length : this.reise.plaetzeMax;
        }, (err) => {
          console.log('reiseAnzeigen', err);
        });
        // this.determineLocation(); // todo
      } else {
        this.router.navigate(['/home']);
      }
    });
  }

  public determineLocation() {
    this.googleMaps.getLocationOfCity(this.reise.start).subscribe((data) => {
      console.log(data);
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
            }).subscribe((res: Response) => {
              console.log('sendMessage', res);
            }, (err) => {
              console.log('sendMessage', err);              
            });
          });
        } else {
          this.padacaService.putSendMessage({
            message: message,
            receiverID: this.reise.fahrer.userID
          }).subscribe((res: Response) => {
            console.log('sendMessage', res);
          }, (err) => {
            console.log('sendMessage', err);              
          });
        }
      }
    });
  }

  public anfragen() {
    this.padacaService.putReiseAnfragen(this.reise).subscribe((res: Response) => {
      console.log('reiseAnfragen', res);
      this.snackbar.open('Die Anfrage wurde versendet.', 'OK', {
        duration: 5000,
      });
    }, (err) => {
      console.log('reiseAnfragen', err);      
    });
  }

  public isAngemeldet(): boolean {
    if (this.reise == null || this.reise.mitfahrer == null) {
      return false;
    }
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
          this.padacaService.postReiseAbsagen(this.reise, message).subscribe((res: Response) => {
            console.log('reiseAbsagen', res);
          }, (err) => {
            console.log('reiseAbsagen', err);
          });
        } else {
          this.padacaService.postReiseAbmelden(this.reise, message).subscribe((res: Response) => {
            console.log('reiseAbmelden', res);
          }, (err) => {
            console.log('reiseAbmelden', err);
          });
        }
      }
    });
  }

  public pin() {
    this.padacaService.putPinned(this.reise).subscribe((res: Response) => {
      console.log('putPinned', res);
    }, (err) => {
      console.log('putPinned', err);
    });
  }
}
