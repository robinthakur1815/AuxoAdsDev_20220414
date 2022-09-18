import { Component, OnInit,Inject, Optional } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-admin-dialog-dynamic',
  templateUrl: './admin-dialog-dynamic.component.html',
  styleUrls: ['./admin-dialog-dynamic.component.scss']
})
export class AdminDialogDynamicComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AdminDialogDynamicComponent>,
        // @Optional() is used to prevent error if no data is passed
        @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { }

 onNoClick(): void {
      this.dialogRef.close();
  }
  ngOnInit(): void {
  }

}
