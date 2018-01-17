import { PadacaService } from './../../fachlich/padaca.service';
import { Component, Inject, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LoginDTO, Response, RegisterDTO } from '../../fachlich/interfaces';
import { MatTabGroup } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {

  @ViewChild(MatTabGroup) matTab: MatTabGroup;

  public username: string;
  public password: string;
  public passwordSubmit: string;
  private popupType: string; // Standard --> Login; andernfalls --> Registrieren

  public msgFailed: string;

  constructor(public dialogRef: MatDialogRef<LoginComponent>, @Inject(MAT_DIALOG_DATA) data: any,
    private padacaService: PadacaService) {
      this.popupType = data;
    }

  ngAfterViewInit() {
    if (this.popupType == 'register') {
      this.matTab.selectedIndex = 1;
    }
  }

  public cancel() {
    this.dialogRef.close(false);
  }

  //#region Login
  public login() {
    if (this.username && this.password) {
      let dto: LoginDTO = {
        username: this.username,
        password: this.password
      };
      console.log(dto);
      this.padacaService.getLogin(dto).subscribe((res: Response) => {
        this.padacaService.setSession(res.data);
        this.dialogRef.close(true);
      }, (err: Response) => {
        this.msgFailed = err.message;
      });
    } else {
      // MOCK
      this.padacaService.setSession({
        userID: 111,
        sessionkey: 'ljdsakfsahf'
      });
      this.dialogRef.close(true);
      this.msgFailed = 'Eingaben unvollständig.';
    }
  }

  public keypressLogin(keycode) {
    if (keycode == 13) {
      // Falls Enter gedrückt
      this.login();
    }
  }
  //#endregion

  //#region Registrieren
  public register() {
    if (this.username && this.password && this.passwordSubmit) {
      if (this.password === this.passwordSubmit) {
        let dto: RegisterDTO = {
          username: this.username,
          password: this.password
        };
        this.padacaService.getRegister(dto).subscribe((data: Response) => {
          console.log(data);
        }, (err: Response) => {
          this.msgFailed = err.message;
        });
      } else {
        this.msgFailed = 'Die Passwörter stimmen nicht überein.';
      }
    } else {
      this.msgFailed = 'Eingaben unvollständig.';
    }
  }

  public keypressRegister(keycode) {
    if (keycode == 13) {
      // Falls Enter gedrückt
      this.register();
    }
  }
  //#endregion
}
