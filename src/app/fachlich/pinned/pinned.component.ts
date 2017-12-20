import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-pinned',
  templateUrl: './pinned.component.html',
  styleUrls: ['./pinned.component.css']
})
export class PinnedComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PinnedComponent>, @Inject(MAT_DIALOG_DATA) data: any) { }

  ngOnInit() { }
}
