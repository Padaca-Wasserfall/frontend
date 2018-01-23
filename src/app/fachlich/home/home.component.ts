import { MatDialog } from '@angular/material';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PadacaService } from '../padaca.service';
import { Reise, Response, User, Session, Bewertung } from '../interfaces';
import { Router } from '@angular/router';
import { LoginComponent } from '../../technisch/login/login.component';
import { BewertungSchreibenComponent } from '../bewertung-schreiben/bewertung-schreiben.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  teilnahmen: Reise[] = [];
  angebote: Reise[] = [];
  archivierte: Reise[] = [];
  user: User;

  constructor(private padacaService: PadacaService, private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    this.updateSession();
    // Listen to Login & Logout
    this.padacaService.loggedIn.subscribe(data => {
      this.updateSession();
    });
    this.padacaService.loggedOut.subscribe(data => {
      this.user = null;
    });
  }

  private updateSession() {
    let session = this.padacaService.getSession();
    if (session) {
      this.padacaService.getUser(session.userID).subscribe((res: Response) => {
        console.log('user', res);
        this.user = res.data;
        this.padacaService.getReisenAlsMitfahrer(this.user).subscribe((res2: Response) => {
          console.log('teilnahmen', res2);
          if (res2.data != null) {
            this.teilnahmen = res2.data.result;
          } else {
            this.teilnahmen = [];
          }
        }, (err) => {
          console.log('teilnahmen', err);
          this.teilnahmen = [];
        });
        this.padacaService.getReisenAlsFahrer(this.user).subscribe((res3: Response) => {
          console.log('angebote', res3);
          if (res3.data != null) {
            this.angebote = res3.data.result;
          } else {
            this.angebote = [];
          }
        }, (err) => {
          console.log('angebote', err);
          this.angebote = [];
        });
        this.teilnahmen.sort((a1, a2) => a2.zeitstempel - a1.zeitstempel);
        this.angebote.sort((a1, a2) => a2.zeitstempel - a1.zeitstempel);
      }, (err) => {
        console.log('user', err);
      });
    }
  }

  private isLoggedIn(): boolean {
    return this.user ? true : false;
  }

  private reiseAnzeigen(reise: Reise) {
    this.router.navigate(['/reiseAnzeigen/' + reise.reiseID]);
  }

  public login() {
    this.dialog.open(LoginComponent, {
      disableClose: true,
      data: { popupType: 'login' }
    }).afterClosed().subscribe((success: boolean) => {
      if (success) {
        this.padacaService.sessionUpdated.emit();
      }
    });
  }

  private register() {
    this.dialog.open(LoginComponent, {
      disableClose: true,
      data: { popupType: 'register' }
    }).afterClosed().subscribe((success: boolean) => {
      if (success) {
        this.padacaService.sessionUpdated.emit();
      }
    });
  }

  public isBewertet(reise: Reise): boolean { // muss noch getestet werden
    if (reise.fahrer.userID != this.user.userID) {
      this.padacaService.getBewertungen(reise.fahrer.userID).subscribe((res: Response) => {
        console.log('getBewertungen', res);
        let bewertungen: Bewertung[] = res.data;
        bewertungen.forEach((bew: Bewertung) => {
          if (bew.reiseID == reise.reiseID && bew.mitfahrer.userID == this.user.userID) {
            return true;
          }
        });
        return false;
      }, (err) => {        
        console.log('getBewertungen', err);
      });
    } else {
      return true; // man kann sich nicht selbst bewerten
    }
  }

  public bewerten(reise: Reise) {
    this.dialog.open(BewertungSchreibenComponent, {
      disableClose: true,
      data: {
        reise: reise,
        user: this.user
      }
    });
  }
}
