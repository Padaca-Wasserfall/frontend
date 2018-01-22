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
      start: this.addressToCity(this.start),
      ziel: this.addressToCity(this.ziel),
      zeitstempel: this.datum.getTime()
    };
    console.log(geplanteRoute);
    this.padacaService.getSucheReise(geplanteRoute).subscribe((res: Response) => {
      console.log('sucheReise', res);
      this.suchergebnisse = res.data;
      if (!this.expander.expanded) {
        this.expander.toggle();
      }
    }, (err) => {
      console.log('sucheReise', err);
    });
  }

  addressToCity(address: string) {
    const split = address.split(',');
    if (split.length > 1) {
      const city = split[1].trim();
      if (city.split(' ').length > 1 && Number(city.split(' ')[0]) != null) {
        let shiftedCity = '';
        let splittedCity = city.split(' ');
        for (let i = 1; i < splittedCity.length; i++) {
          shiftedCity += splittedCity[i] + ' ';
        }
        return shiftedCity.trim();
      } else {
        return city;
      }
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
}
