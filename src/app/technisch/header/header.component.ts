import { LoginComponent } from './../login/login.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public username = 'Test';

  constructor(private dialog: MatDialog) { }

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
}
