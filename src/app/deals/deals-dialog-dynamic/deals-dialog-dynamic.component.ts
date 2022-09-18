import { Component, OnInit,Inject, Optional } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-dynamic',
  templateUrl: './deals-dialog-dynamic.component.html',
  styleUrls: ['./deals-dialog-dynamic.component.scss']
})
export class DealsDialogDynamicComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DealsDialogDynamicComponent>,
        // @Optional() is used to prevent error if no data is passed
        @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { }

 onNoClick(): void {
      this.dialogRef.close();
  }
  ngOnInit(): void {
  }

}
