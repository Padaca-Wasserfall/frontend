import { Route, Response, Reise } from './../interfaces';
import { PadacaService } from './../padaca.service';
import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatExpansionPanel } from '@angular/material';
import { Router } from '@angular/router';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements AfterViewInit {

  @ViewChild(MatExpansionPanel) expander: MatExpansionPanel;
  start: string;
  ziel: string;
  datum: Date;
  suchergebnisse: Reise[] = [];

  constructor(public dialogRef: MatDialogRef<SearchComponent>, @Inject(MAT_DIALOG_DATA) data: any,
    private router: Router, private padacaService: PadacaService) { }

  ngAfterViewInit() {
    this.datum = new Date();
  }

  public search() {
    console.log(this.datum);
    let geplanteRoute: Route = {
      start: this.start,
      ziel: this.ziel,
      zeitstempel: this.datum.getTime()
    };
    // this.padacaService.getSucheReise(geplanteRoute).subscribe((result: Response) => {
    //   this.suchergebnisse = result.data;
    // }, (err) => {
    //   // fehlerhafte Eingaben   
    // });
    this.suchergebnisse = this.getResults(geplanteRoute);
    if (!this.expander.expanded) {
      this.expander.toggle();
    }
  }

  public close() {
    this.dialogRef.close();
  }

  public reiseAnzeigen(reiseID: number) {
    this.dialogRef.close(reiseID);
  }

  public setStart() {
    // todo Maps api
  }

  public setZiel() {
    // todo Maps api
  }

  // nur für Mock
  private getResults(route: Route): Reise[] {
    return [
      {
        reiseID: 123,
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
      },
      {
        reiseID: 456,
        fahrer: {
          'userID': 125,
          'username': 'larsi',
          'vorname': 'Lars',
          'nachname': 'Schoepke',
          'alter': 21,
          'pkw': '---',
          'beschreibung': 'Bin echt lieb.'
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
            userID: 126,
            username: 'jonny',
            vorname: 'Jonas',
            nachname: 'Hammerschmidt',
            alter: 21,
            pkw: '---',
            beschreibung: 'Bin echt lieb.'
          }
        ],
        start: 'Paderborn',
        ziel: 'München',
        zeitstempel: 1218823687123,
        plaetzeMax: 7,
        preis: 800,
        beschreibung: 'Die Sonne scheint, der Himmel lacht, nie hat mir programmieren so viel Spaß gemacht. Die Sonne scheint, der Himmel lacht, nie hat mir programmieren so viel Spaß gemacht. Die Sonne scheint, der Himmel lacht, nie hat mir programmieren so viel Spaß gemacht. Die Sonne scheint, der Himmel lacht, nie hat mir programmieren so viel Spaß gemacht. Die Sonne scheint, der Himmel lacht, nie hat mir programmieren so viel Spaß gemacht. Die Sonne scheint, der Himmel lacht, nie hat mir programmieren so viel Spaß gemacht. Die Sonne scheint, der Himmel lacht, nie hat mir programmieren so viel Spaß gemacht.',
        umwegMax: 50
      }
    ];
  }
}
