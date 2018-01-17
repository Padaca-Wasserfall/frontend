import { Route, Response, Reise } from './../interfaces';
import { PadacaService } from './../padaca.service';
import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatExpansionPanel } from '@angular/material';
import { Router } from '@angular/router';
import { AfterViewInit, OnInit } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { } from '@types/googlemaps';
import { NgZone } from '@angular/core';
import { ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, AfterViewInit {

  @ViewChild(MatExpansionPanel) expander: MatExpansionPanel;
  start: string;
  ziel: string;
  datum: Date;
  suchergebnisse: Reise[] = [];

  public searchControlStart: FormControl;
  public searchControlStop: FormControl;

  @ViewChild('searchStart')
  public searchStartElementRef: ElementRef;
  
  @ViewChild('searchStop')
  public searchStopElementRef: ElementRef;

  constructor(public dialogRef: MatDialogRef<SearchComponent>, @Inject(MAT_DIALOG_DATA) data: any,
    private router: Router, private padacaService: PadacaService, private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) { }

  ngOnInit() {

    this.searchControlStart = new FormControl();
    this.searchControlStop = new FormControl();

    this.mapsAPILoader.load().then(() => {
      const autocompleteStart = new google.maps.places.Autocomplete(this.searchStartElementRef.nativeElement, {
        types: ['address']
      });
      autocompleteStart.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocompleteStart.getPlace();

          this.start = place.formatted_address;

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
        });
      });
      const autocompleteStop = new google.maps.places.Autocomplete(this.searchStopElementRef.nativeElement, {
        types: ['address']
      });
      autocompleteStop.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocompleteStop.getPlace();

          this.ziel = place.formatted_address;

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
        });
      });
    });
  }

  ngAfterViewInit() {
    this.datum = new Date();
  }

  public search() {
    console.log(this.datum);
    let geplanteRoute: Route = {
      start: this.addressToCity(this.start).trim(),
      ziel: this.addressToCity(this.ziel).trim(),
      zeitstempel: this.datum.getTime()
    };
    console.log(geplanteRoute);
    // TODO
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

  addressToCity(address: string) {
    const split = address.split(',');
    if (split.length > 1) {
      return split[1];
    } else {
      return address;
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
