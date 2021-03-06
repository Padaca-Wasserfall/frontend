import { PadacaService } from './../../fachlich/padaca.service';
import { Component, Inject, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LoginDTO, Response, RegisterDTO } from '../../fachlich/interfaces';
import { MatTabGroup } from '@angular/material';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {

  @ViewChild(MatTabGroup) matTabGroup: MatTabGroup;

  public username: string;
  public password: string;
  public passwordSubmit: string;
  private popupType: string; // Standard --> Login; andernfalls --> Registrieren

  public msgFailed: string;

  constructor(public dialogRef: MatDialogRef<LoginComponent>, @Inject(MAT_DIALOG_DATA) data: any, private padacaService: PadacaService) {
      this.popupType = data.popupType;
    }

  ngAfterViewInit() {
    console.log(this.popupType);
    setTimeout(data => {
      if (this.popupType == 'register') {
        this.matTabGroup.selectedIndex = 1;
      }
    }, 500);
  }

  public cancel() {
    this.dialogRef.close(false);
  }

  //#region Login
  public login() {
    if (this.username && this.password) {
      let dto: LoginDTO = {
        username: this.username,
        password: Md5.hashStr(this.password).toString()
      };
      this.padacaService.getLogin(dto).subscribe((res: Response) => {
        if (res.success) {
          this.padacaService.setSession(res.data);
          console.log('login', res);
          if (res.success) {
            this.dialogRef.close(true);
          }
        } else {
          this.msgFailed = 'Login fehlgeschlagen.';
        }
      }, (err) => {
        console.log('login', err);
        this.msgFailed = 'Login fehlgeschlagen.';
      });
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
          password: Md5.hashStr(this.password).toString()
        };
        console.log('registerDTO', dto);
        this.padacaService.getRegister(dto).subscribe((res: Response) => {
          console.log('register', res);
          if (res.success) {
            this.dialogRef.close(true);
          } else {
            this.msgFailed = 'Registrierung fehlgeschlagen.';
          }
        }, (err) => {
          console.log('register', err);
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
