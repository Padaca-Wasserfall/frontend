import { Router } from '@angular/router';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RestService } from '../technisch/rest.service';

@Injectable()
export class GoogleMapsService {

  private BASEPATH = 'https://maps.googleapis.com/maps/api';

  constructor (private restService: RestService) {}

  public getLocationOfCity(city: string): Observable<any> {
    return this.restService.getRequestForMaps(this.BASEPATH + '/geocode/json?address=' + city + '&key=AIzaSyCj1t_DyxaGKTN1yqufTp7ORfPS4mZ0h30');;
  }

}
