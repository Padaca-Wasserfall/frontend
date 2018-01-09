import { Mitfahrer } from './../interfaces';
import { Component, OnInit } from '@angular/core';
import { Reise, User } from '../interfaces';
import { PadacaService } from '../padaca.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reise-anlegen',
  templateUrl: './reise-anlegen.component.html',
  styleUrls: ['./reise-anlegen.component.css']
})
export class ReiseAnlegenComponent implements OnInit {

  today: Date = new Date();
  minDate: Date = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate());
  zeitpunkt: Date;
  start: any;
  ziel: any;
  zeitstempel: number;
  dpZeitpunkt: Date;
  plaetzeMax: number;
  preis: number;
  beschreibung: string;
  umwegMax: number;

  constructor(private padaService: PadacaService, private router: Router) { }

  ngOnInit() {
    this.zeitpunkt = new Date;
    this.start = '';
    this.ziel = '';
    this.zeitstempel = null;
    this.dpZeitpunkt = null;
    this.plaetzeMax = null;
    this.preis = null;
    this.beschreibung = '';
    this.umwegMax = null;
  }

  clickMapPunkt(wert: string) {
    /*
    * if start
    *   this.start auf den api call
    * else
    *   this.ziel auf den api call
    */
    console.log('clickMapPunkt mit ' + wert + ' aufgerufen geht!');
  }

  clickMapStrecke() {
    console.log('MapStrecke geht');
  }

  clickAnlegen() {
    console.log(this.zeitpunkt);
    let uid = this.padaService.getSession().userID;
    this.padaService.getUser(uid).subscribe((data) => {
      let tmpFahrer: User = data.data;

      this.zeitstempel = this.zeitpunkt.getTime() / 1000;

      let neueReise: Reise = {
        start: this.start,
        ziel: this.ziel,
        zeitstempel: this.zeitstempel,
        plaetzeMax: this.plaetzeMax,
        platzeFrei: this.plaetzeMax,
        preis: this.preis,
        beschreibung: this.beschreibung,
        umwegMax: this.umwegMax,
        mitfahrer: [],
        fahrer: tmpFahrer
      };

      console.log(neueReise);

      this.padaService.postReiseErstellen(neueReise).subscribe(); // todo
    });
    this.router.navigate(['/home']);
  }

  clickAbbrechen() {
    console.log('Abbrechen geht');
    this.router.navigate(['/home']);
  }
}
