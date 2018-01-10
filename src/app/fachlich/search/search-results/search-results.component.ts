import { Component, Input } from '@angular/core';
import { Reise, User } from '../../interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {

  @Input() searchResults: Reise[] = [];

  constructor(private router: Router) { }

  public userAnzeigen(user: User) {
    let url = window.location.origin + '/#/profil/' + user.userID;
    window.open(url, '_blank');
  }

  public getAnzahlMitfahrer(reise: Reise): string {
    return (reise.mitfahrer ? reise.mitfahrer.length : 0) + '/' + reise.plaetzeMax;
  }

  public reiseAnzeigen(reise: Reise) {
    let url = window.location.origin + '/#/reiseAnzeigen/' + reise.reiseID;
    window.open(url, '_blank');
  }
}
