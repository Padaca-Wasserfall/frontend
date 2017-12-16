import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-warn-dialog',
  templateUrl: './warn-dialog.component.html',
  styleUrls: ['./warn-dialog.component.css']
})
export class WarnDialogComponent {

  public msgWarn: string;

  constructor(public dialogRef: MatDialogRef<WarnDialogComponent>, @Inject(MAT_DIALOG_DATA) data: string) {
    this.msgWarn = data;
  }

  public submit() {
    this.dialogRef.close();
  }
}
