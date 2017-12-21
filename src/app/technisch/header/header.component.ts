import { PinnedComponent } from './../../fachlich/pinned/pinned.component';
import { PadacaService } from './../../fachlich/padaca.service';
import { SearchComponent } from './../../fachlich/search/search.component';
import { LoginComponent } from './../login/login.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { Response, User } from '../../fachlich/interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

<<<<<<< HEAD
  public username = 'Username';
  public password = 'test';
=======
  user: User;
>>>>>>> b1feee427533cd3df48c3015511a21155a593f35

  constructor(private dialog: MatDialog, private router: Router, private padacaService: PadacaService) { }

  ngOnInit() {
    let session = this.padacaService.getSession();
    if (session) {
      this.padacaService.getUser(session.userID).subscribe((res: Response) => {
        this.user = res.data;
      }, (err) => {
        // this.user = null;
        this.user = {
          'userID': 124,
          'username': 'michi',
          'vorname': 'Michael',
          'nachname': 'Dunsche',
          'alter': 20,
          'pkw': 'VW Golf',
          'beschreibung': 'Kein Essen im Auto'
        };
      });
    }
  }

  public isLoggedIn(): boolean {
<<<<<<< HEAD
    if (this.username && this.password) {
=======
    if (this.user) {
>>>>>>> b1feee427533cd3df48c3015511a21155a593f35
      return true;
    } else {
      return false;
    }
  }

  public login() {
    this.dialog.open(LoginComponent, {
      disableClose: true
    });
  }

  public logout() {
    this.user = null;
    this.padacaService.getLogout().subscribe((res: Response) => {
      this.user = null;
      this.padacaService.removeSession();
    });
  }

  public navigateToHome() {
    this.router.navigate(['/home']);
  }

  public navigateToProfil() {
    this.router.navigate(['/profil']);
  }

  public navigateToInbox() {
    this.router.navigate(['/inbox']);
  }

  public navigateToReiseAnlegen() {
    this.router.navigate(['/reiseAnlegen']);
  }

  public openPinned() {
    this.dialog.open(PinnedComponent, {
      // disableClose:  true
    });
  }

  public openSearch() {
    this.dialog.open(SearchComponent, {
      // disableClose:  true
    });
  }

  public openChangePassword() {
    this.dialog.open(ChangePasswordComponent, {
      // disableClose:  true
    });
  }
}
