import { Component, OnInit } from '@angular/core';
import { Bewertung, User } from '../interfaces';
import { PadacaService } from '../padaca.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  bewertungen: Array<Bewertung>;
  bewertung: number;
  user: User;
  constructor(private padaService: PadacaService) { }

  ngOnInit() {
    this.user = {
      alter: 15,
      beschreibung: 'Ich fahre gerne Auto... von hier nach da und manchmal auch wieder zurück. Es macht mir einfach Spaß. Aber den Spaß würde ich gerne mit anderen Leuten teilen, indem ich sie mitnehme. Ich habe mich hier bei Padaca registriert, weil Paderborn einfach die beste Stadt in Deutschland ist',
      userID: 1,
      vorname: 'Jeder',
      nachname: 'Bayer',
      username: 'Immer',
      pkw: 'Trabbi'
    };
    this.bewertung = 0;
    this.bewertungen = [];
    this.bewertungen.push({
      rating: 3,
      reiseID: 1
    });
    this.bewertungen.push({
      rating: 5,
      reiseID: 2
    });
    this.bewertungen.push({
      rating: 5,
      reiseID: 3
    });
    this.bewertungen.push({
      rating: 4,
      reiseID: 4
    });
    this.bewertungen.push({
      rating: 2,
      reiseID: 5
    });
    this.bewertungen.push({
      rating: 1,
      reiseID: 1
    });
    for (let bew of this.bewertungen) {
      this.bewertung += bew.rating;
    }
    this.bewertung = this.bewertung / this.bewertungen.length;
    /*let uid = this.padaService.getSession().userID;
    this.padaService.getUser(uid).subscribe(userres => {
      this.padaService.getBewertungen(userres.data).subscribe(bewertungres => {
        this.bewertungen = bewertungres.data;
        for (let bew of this.bewertungen) {
          this.bewertung += bew.rating;
        }
        this.bewertung = this.bewertung / this.bewertungen.length;
      });
    }, error => {
      this.bewertungen = [];
      this.bewertungen.push({
        rating: 10,
        reiseID: 1
      });
    });*/
  }

  private isOwnProfile(): boolean {
    return false;
  }

  private editProfile() {
    console.log('Edit Profile');
  }
  private sendMessage() {
    console.log('Send Message');
  }
}
