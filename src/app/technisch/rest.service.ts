import { Http, Headers, RequestOptions, Request, RequestMethod } from '@angular/http';
import { Component, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RestService {

  public BASEPATH = 'http://localhost:1234';

  constructor(private http: Http) { }

  public getRequest(ressourceAPI: string) {
    return this.http.get(this.BASEPATH + ressourceAPI).map(data => data.json()).catch((e) => {
      if (e.status >= 400) {
        return Observable.throw(e);
      }
    });
  }

  public postFormRequest(ressourceAPI: string, body: any) {
    return this.http.post(this.BASEPATH + ressourceAPI, body).catch((e) => {
      if (e.status >= 400) {
        return Observable.throw(e);
      }
    });
  }

  public postRequest(ressourceAPI: string, body: any) {
    return this.http.post(this.BASEPATH + ressourceAPI, body).map(data => data.json()).catch((e) => {
      if (e.status >= 400) {
        return Observable.throw(e);
      }
    });
  }

  public putRequest(ressourceAPI: string, body: any) {
    return this.http.put(this.BASEPATH + ressourceAPI, body).map(data => data.json()).catch((e) => {
      if (e.status >= 400) {
        return Observable.throw(e);
      }
    });
  }

  public deleteRequest(ressourceAPI: string) {
    return this.http.delete(this.BASEPATH + ressourceAPI).catch((e) => {
      if (e.status >= 400) {
        return Observable.throw(e);
      }
    });
  }
}
