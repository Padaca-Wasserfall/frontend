import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { PadacaService } from '../../fachlich/padaca.service';
import { ChangePasswordDTO } from '../../fachlich/interfaces';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ChangePasswordComponent>, @Inject(MAT_DIALOG_DATA) data: any,
  private padacaService: PadacaService, private snackbar: MatSnackBar) { }

  public password: string;
  public newPassword: string;
  public newPasswordSubmit: string;

  changeFailed = false;
  msgChangeFailed = 'Das Passwort konnte nicht geändert werden.';
  newNotEqual = false;
  msgNewNotEqual = 'Die Passwörter sind nicht identisch.';

  ngOnInit() { }

  public changePassword() {
    // todo --> verschlüsseln?
    let oldEncrypt = this.password;
    let newEncrypt = this.newPassword;
    if (this.inputsValid()) {
      let dto: ChangePasswordDTO = {
        old: oldEncrypt.toString(),
        new: newEncrypt.toString()
      };
      this.padacaService.getChangePassword(dto).subscribe((data) => {
        console.error(data);
        if (data.success == true) {
          this.changeFailed = false;
          this.password = '';
          this.newPassword = '';
          this.newPasswordSubmit = '';
          this.snackbar.open('Passwort wurde erfolgreich geändert!', 'OK', {
            duration: 5000,
          });
        } else {
          this.changeFailed = true;
        }
      });
    }
  }
  
  private inputsValid() {
    let valid = true;
    if (this.newPassword && this.newPasswordSubmit && (this.newPassword == this.newPasswordSubmit)) {
      this.newNotEqual = false;
    } else {
      valid = false;
      this.newNotEqual = true;
      this.changeFailed = false;
    }
    return valid;
  }

  public cancel() {
    this.dialogRef.close(false);
  }

  public keypress(keycode) {
    if (keycode == 13) {
      this.changePassword();
    }
  }
}
