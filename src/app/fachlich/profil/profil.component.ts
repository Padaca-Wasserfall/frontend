import { Component, OnInit } from '@angular/core';
import { Bewertung, User, Response } from '../interfaces';
import { PadacaService } from '../padaca.service';
import { BewertungComponent } from './bewertung/bewertung.component';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  bewertungen: Bewertung[] = [];
  bewertung: number;
  user: User = {
    username: null,
    nachname: null,
    vorname: null,
    alter: null,
    pkw: null,
    beschreibung: null
  };
  edit: boolean;
  isOwnProfile: boolean;

  constructor(private route: ActivatedRoute, private padacaService: PadacaService, private dialog: MatDialog, private router: Router) { }

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
        if (user) {
          this.user = user;
          this.padacaService.getBewertungen(user.userID).subscribe((res2: Response) => {
            console.log('getBewertungen', res2);
            this.bewertung = 0;
            this.bewertungen = res2.data.result;
            for (let bew of this.bewertungen) {
              this.bewertung += bew.rating;
            }
            this.bewertung = this.bewertung / this.bewertungen.length;
          }, (err) => {
            console.log('getBewertungen', err);
            this.bewertung = 0;
            this.bewertungen = [];
          });
        }
      }, (err) => {
        console.log('user', err);
      });
    });

    for (let bew of this.bewertungen) {
      this.bewertung += bew.rating;
    }
    this.bewertung = this.bewertung / this.bewertungen.length;
    this.edit = false;
  }

  private editProfile() {
    this.edit = !this.edit;
    console.log('Edit Profile');
  }
  private sendMessage() {
    this.dialog.open(MessageDialogComponent, {
      disableClose: true
    }).afterClosed().subscribe((message: string) => {
      if (message) {
        this.padacaService.putSendMessage({
          message: message,
          receiverID: this.user.userID
        }).subscribe((res: Response) => {
          console.log('sendMessage', res);
          this.router.navigate(['/inbox']);
        }, (err) => {
          console.log('sendMessage', err);
        });
      }
    });
  }

  private showReviews() {
    console.log('showReviews');
    this.dialog.open(BewertungComponent, {
      data: { user: this.user, bewertungen: this.bewertungen },
      width: '100%'
    });
  }

  public saveProfile() {
    this.padacaService.postChangeProfile(this.user).subscribe((res: Response) => {
      console.log('changeProfile', res);
      this.edit = false;
    }, (err) => {
      console.log('changeProfile', err);
    });
  }
}
