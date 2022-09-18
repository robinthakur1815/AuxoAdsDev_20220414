import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutService } from './logout.service';
declare var $: any;
import { DialogDynamicComponent } from '../../publisher/dialog-dynamic/dialog-dynamic.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponents implements OnInit{
  public isSpinnerVisible: boolean = true;
  messageDialog: string;


  constructor(private router: Router, private _logservice: LogoutService, public dialog: MatDialog) { }

  ngOnInit() {
    $(".ui-tour-dialog").hide();
    // localStorage.clear();
    // this.router.navigate(['/authentication/login']);


    this._logservice.getlogoutdevice(localStorage.getItem('uniq_id'), localStorage.getItem('child_net_code'))
      .subscribe(dataResult => {
        if (dataResult['status_code'] == '200') {
          localStorage.clear();
          this.router.navigate(['/authentication/login']);
        } else if (dataResult['status_code'] == '422') {
          
          localStorage.clear();
          this.router.navigate(['/authentication/login']);
          this.isSpinnerVisible = false;
        } else {
          
          localStorage.clear();
          this.router.navigate(['/authentication/login']);
          this.isSpinnerVisible = false;
        }

      });



  }

}
