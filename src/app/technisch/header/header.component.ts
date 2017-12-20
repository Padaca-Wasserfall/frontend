import { PinnedComponent } from './../../fachlich/pinned/pinned.component';
import { PadacaService } from './../../fachlich/padaca.service';
import { SearchComponent } from './../../fachlich/search/search.component';
import { LoginComponent } from './../login/login.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { Response } from '../../fachlich/interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public username = 'Test';

  constructor(private dialog: MatDialog, private router: Router, private padacaService: PadacaService) { }

  ngOnInit() { }

  public isLoggedIn(): boolean {
    if (this.username) {
      return true;
    } else {
      return false;
    }
  }

  public login() {
    this.dialog.open(LoginComponent, {

    }).afterClosed().subscribe(data => {

    });
  }

  public logout() {
    this.padacaService.getLogout().subscribe((res: Response) => {
      if (res.success) {
        this.navigateToHome();
      }
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

    }).afterClosed().subscribe(data => {

    });
  }

  public openSearch() {
    this.dialog.open(SearchComponent, {

    }).afterClosed().subscribe(data => {

    });
  }

  public openChangePassword() {
    this.dialog.open(ChangePasswordComponent, {

    }).afterClosed().subscribe(data => {

    });
  }
}
