import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


  public Start: string;
  public Ziel: string;
  public Datum: string;

  constructor(public dialogRef: MatDialogRef<SearchComponent>, @Inject(MAT_DIALOG_DATA) data: any, public router: Router) { }

  ngOnInit() {

  }
  Search() {
    this.router.navigate(['/reiseAnzeigen/' + this.Start + '/' + this.Ziel + '/' + this.Datum]);
    console.log(this.Datum);

    this.dialogRef.close();
  }
}
