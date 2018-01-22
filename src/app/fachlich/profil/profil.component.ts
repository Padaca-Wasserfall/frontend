import { Component, OnInit } from '@angular/core';
import { Bewertung, User, Response } from '../interfaces';
import { PadacaService } from '../padaca.service';
import { BewertungComponent } from './bewertung/bewertung.component';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  bewertungen: Bewertung[] = [];
  bewertung: number;
  user: User = {
    nachname: null,
    vorname: null,
    alter: null,
    pkw: null,
    beschreibung: null
  };
  edit: boolean;
  isOwnProfile: boolean;

  constructor(private route: ActivatedRoute, private padacaService: PadacaService, private dialog: MatDialog) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let userID = params['userID'];
      this.isOwnProfile = false;
      if (!userID) {
        userID = this.padacaService.getSession().userID;
      }
      if (userID == this.padacaService.getSession().userID) {
        this.isOwnProfile = true;
      }

      this.padacaService.getUser(userID).subscribe((res1: Response) => {
        console.log('user', res1);
        let user: User = res1.data;
        if (res1.data) {
          this.padacaService.getBewertungen(user.userID).subscribe((res2: Response) => {
        console.log('getBewertungen', res2);
        this.bewertungen = res2.data;
            for (let bew of this.bewertungen) {
              this.bewertung += bew.rating;
            }
            this.bewertung = this.bewertung / this.bewertungen.length;
          }, (err) => {
            console.log('getBewertungen', err);
          });
        }
      }, (err) => {
        console.log('user', err);
      });
    });
    this.bewertung = 0;
    this.bewertungen = [];

    for (let bew of this.bewertungen) {
      this.bewertung += bew.rating;
    }
    this.bewertung = this.bewertung / this.bewertungen.length;
    this.edit = false;
  }

  private editProfile() {
    this.edit = true;
    console.log('Edit Profile');
  }
  private sendMessage() {
    console.log('Send Message');
  }

  private showReviews() {
    let dialogRef = this.dialog.open(BewertungComponent, {
      data: { user: this.user, bewertungen: this.bewertungen },
      width: '100%',
    });
  }
}
