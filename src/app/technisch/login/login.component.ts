import { PadacaService } from './../../fachlich/padaca.service';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LoginDTO, Response } from '../../fachlich/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public username: string;
  public password: string;
  public passwordFalse: boolean;
  public msgFailed = 'Das eingegebene Passwort ist falsch.';

  constructor(public dialogRef: MatDialogRef<LoginComponent>, @Inject(MAT_DIALOG_DATA) data: any,
    private padacaService: PadacaService) { }

  public cancel() {
    this.dialogRef.close(false);
  }

  public login() {
    let dto: LoginDTO = {
      username: this.username,
      password: this.password
    };
    this.padacaService.getLogin(dto).subscribe((data: Response) => {
      console.log(data);
    }, (err) => {
      console.log(err);
    });
  }

  public keypress(keycode) {
    if (keycode == 13) {
      // Falls Enter gedrückt
      this.login();
    }
  }
}
