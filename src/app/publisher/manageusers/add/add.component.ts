import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

   constructor(
      public dialogRef: MatDialogRef<AddComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
onNoClick(): void {
      this.dialogRef.close();
  }
  ngOnInit(): void {
  }

}
