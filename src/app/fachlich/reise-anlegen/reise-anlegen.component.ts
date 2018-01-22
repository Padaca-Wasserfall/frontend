import { Mitfahrer, Response } from './../interfaces';
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
    this.plaetzeMax = null;
    this.preis = null;
    this.beschreibung = '';
    this.umwegMax = null;
  }

  public clickMapPunkt(wert: string) {
    /*
    * if start
    *   this.start auf den api call
    * else
    *   this.ziel auf den api call
    */
    console.log('clickMapPunkt mit ' + wert + ' aufgerufen geht!');
  }

  public clickMapStrecke() {
    console.log('MapStrecke geht');
  }

  public clickAnlegen() {
    console.log(this.zeitpunkt);
    let uid = this.padaService.getSession().userID;
    this.padaService.getUser(uid).subscribe((res1: Response) => {
      console.log('user', res1);

      let tmpFahrer: User = res1.data;
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
      console.log('neueReise', neueReise);
      this.padaService.postReiseErstellen(neueReise).subscribe((res2: Response) => {
        console.log('reiseErstellen', res2);
      }, (err) => {
        console.log('reiseErstellen', err);        
      });
    }, (err) => {      
      console.log('user', err);
    });
    this.router.navigate(['/home']);
  }

  public clickAbbrechen() {
    console.log('Abbrechen geht');
    this.router.navigate(['/home']);
  }
}
