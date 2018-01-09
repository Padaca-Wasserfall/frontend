import { User } from './../interfaces';
import { PricePipe } from './../../technisch/price.pipe';
import { Component, OnInit } from '@angular/core';
import { Reise } from '../interfaces';
import { PadacaService } from '../padaca.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

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

  constructor(private route: ActivatedRoute, private padacaService: PadacaService, private router: Router, private pricePipe: PricePipe) { }

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

  public contact(message: string) {
    if (this.isOwnReise) {
      this.reise.mitfahrer.forEach((mitfahrer: User) => {
        this.padacaService.putSendMessage({
          message: message,
          receiverID: mitfahrer.userID
        }).subscribe(); // todo
      });
    } else {
      this.padacaService.putSendMessage({
        message: message,
        receiverID: this.reise.fahrer.userID
      }).subscribe(); // todo
    }
  }

  public anfragen() {
    this.padacaService.putReiseAnfragen(this.reise).subscribe(); // todo
  }

  public delete(message: string) {
    if (this.isOwnReise) {
      this.padacaService.postReiseAbsagen(this.reise, message).subscribe(); // todo
    } else {
      this.padacaService.postReiseAbmelden(this.reise, message).subscribe(); // todo
    }
  }

  public pin() {
    this.padacaService.putPinned(this.reise).subscribe(); // todo
  }
}
