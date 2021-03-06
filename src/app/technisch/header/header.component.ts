import { PinnedComponent } from './../../fachlich/pinned/pinned.component';
import { PadacaService } from './../../fachlich/padaca.service';
import { SearchComponent } from './../../fachlich/search/search.component';
import { LoginComponent } from './../login/login.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogClose } from '@angular/material';
import { Router } from '@angular/router';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { Response, User, Reise } from '../../fachlich/interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: User;

  constructor(private dialog: MatDialog, private router: Router, private padacaService: PadacaService) { }

  ngOnInit() {
    this.updateSession();
    this.padacaService.sessionUpdated.subscribe(data => {
      this.updateSession();
    });
  }

  private updateSession() {
    let session = this.padacaService.getSession();
    console.log('session', session);
    if (session) {
      this.padacaService.getUser(session.userID).subscribe((res: Response) => {
        console.log('user', res);
        this.user = res.data;
      }, (err) => {
        console.log('user', err);
        this.user = null;
      });
    }
  }

  public isLoggedIn(): boolean {
    if (this.user) {
      return true;
    } else {
      return false;
    }
  }

  public login() {
    this.dialog.open(LoginComponent, {
      disableClose: true,
      data: { popupType: 'login' }
    }).afterClosed().subscribe((success: boolean) => {
      if (success) {
        this.updateSession();
        this.padacaService.loggedIn.emit();
      }
    });
  }

  public logout() {
    this.padacaService.getLogout().subscribe((res: Response) => {
      console.log('logout', res);
      this.user = null;
      this.padacaService.removeSession();
      this.padacaService.loggedOut.emit();
    }, (err) => {
      console.log('logout', err);
      this.user = null;
      this.padacaService.removeSession();
      this.padacaService.loggedOut.emit();
    }, () => {   
      // Not firing...   
      // this.user = null;
      // this.padacaService.removeSession();
      // this.padacaService.loggedOut.emit();
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
    let dialogRef = this.dialog.open(PinnedComponent, {
      width: '95%',
      height: 'auto'
    }).afterClosed().subscribe((reiseID: number) => {
      if (reiseID) {
        this.router.navigate(['/reiseAnzeigen/' + reiseID]);
      }
    });
  }

  public openSearch() {
    this.dialog.open(SearchComponent, {
      disableClose: true
    }).afterClosed().subscribe((reiseID: number) => {
      if (reiseID) {
        this.router.navigate(['/reiseAnzeigen/' + reiseID]);
      }
    });
  }

  public openChangePassword() {
    this.dialog.open(ChangePasswordComponent, {
      disableClose: true
    });
  }
}
