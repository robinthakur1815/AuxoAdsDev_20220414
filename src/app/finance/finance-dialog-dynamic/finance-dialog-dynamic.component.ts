import { Component, OnInit,Inject, Optional } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-dynamic',
  templateUrl: './finance-dialog-dynamic.component.html',
  styleUrls: ['./finance-dialog-dynamic.component.scss']
})
export class FinanceDialogDynamicComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<FinanceDialogDynamicComponent>,
        // @Optional() is used to prevent error if no data is passed
        @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { }

 onNoClick(): void {
      this.dialogRef.close();
  }
  ngOnInit(): void {
  }

}
