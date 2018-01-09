import { Component, OnInit } from '@angular/core';
import { PadacaService } from '../padaca.service';
import { Reise, Response, User } from '../interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  teilnahmen: Reise[] = [];
  angebote: Reise[] = [];
  user: User;
  constructor(private padacaService: PadacaService, private router: Router) { }

  ngOnInit() {
    let session = this.padacaService.getSession();
    if (session) {
      this.padacaService.getUser(session.userID).subscribe((res: Response) => {
        this.user = res.data;
        this.padacaService.getReisenAlsMitfahrer(this.user).subscribe((res2: Response) => {
          this.teilnahmen = res.data;
        });
        this.padacaService.getReisenAlsFahrer(this.user).subscribe((res3: Response) => {
          this.angebote = res.data;
        });
        this.teilnahmen.sort((a1, a2) => a2.zeitstempel - a1.zeitstempel);
        this.angebote.sort((a1, a2) => a2.zeitstempel - a1.zeitstempel);
      }, (err) => {
        // this.user = null;
        this.user = {
          'userID': 124,
          'username': 'michi',
          'vorname': 'Test',
          'nachname': 'User',
          'alter': 20,
          'pkw': 'VW Golf',
          'beschreibung': 'Kein Essen im Auto'
        };
        this.teilnahmen.push({
          reiseID: 123,
          fahrer: { username: 'Jonny Bleifuß' },
          start: 'Paderborn',
          ziel: 'Buxtehude',
          zeitstempel: 123456789
        });
        this.teilnahmen.push({
          reiseID: 456,
          fahrer: { username: 'Renate Rastnicht' },
          start: 'Magdeburg',
          ziel: 'Sonstwo',
          zeitstempel: Date.now()
        });

        this.angebote.push({
          reiseID: 456,
          fahrer: { username: 'Renate Rastnicht' },
          start: 'Magdeburg',
          ziel: 'Sonstwo',
          zeitstempel: Date.now()
        });
        this.angebote.push({
          reiseID: 123,
          fahrer: { username: 'Jonny Bleifuß' },
          start: 'Paderborn',
          ziel: 'Buxtehude',
          zeitstempel: 123456789
        });
        this.teilnahmen.sort((a1, a2) => a2.zeitstempel - a1.zeitstempel);
        this.angebote.sort((a1, a2) => a2.zeitstempel - a1.zeitstempel);
      });
    }
  }

  private isLoggedIn(): boolean {
    return true;
  }

  private reiseAnzeigen(reise: Reise) {
    this.router.navigate(['/reiseAnzeigen/' + reise.reiseID]);
  }
}
