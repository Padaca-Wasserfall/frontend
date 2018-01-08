import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PadacaService } from '../../fachlich/padaca.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ChangePasswordComponent>, @Inject(MAT_DIALOG_DATA) data: any, private padacaService: PadacaService) { }

  public password: string;
  public newpassword: string;

  public msgFailed: String;

  ngOnInit() { }

  changePassword() {
    console.log(this.password);
  }

  cancel() {
    this.dialogRef.close(false);
  }

  keypress(keycode) {
    console.log(keycode);
    if (keycode == 13) {
      this.changePassword();
    }
  }
}
