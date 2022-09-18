import { Component, Inject, OnInit, ViewChild, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BreakpointObserver } from '@angular/cdk/layout';
import {PaymentHistoryService} from './payment-history.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FinanceDialogDynamicComponent } from '../finance-dialog-dynamic/finance-dialog-dynamic.component';
import { AppSettings } from '../../global/app-url';


@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.scss'],
  
})

export class PaymentHistoryComponent implements OnInit{
  displayedColumns = [];
  paymntHisList: MatTableDataSource<UserData>;
  public isSpinnerVisible: boolean = true;
  public message:any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort, { static: true }) sort: MatSort = Object.create(null);


  constructor(breakpointObserver: BreakpointObserver, private location: Location, public dialog: MatDialog, private router: Router,private _serviceFile: PaymentHistoryService) {

    breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns = result.matches ?
        ['adx_id', 'name', 'company_name', 'company_addr', 'gst_number', 'action'] :
        ['adx_id', 'name', 'company_name', 'company_addr', 'gst_number', 'action'];
    });
  }


  ngOnInit() {
    this.callbackfunction();
    
  }
  callbackfunction(){
    this._serviceFile.getPayHisList().subscribe(dataResult => {
      if (dataResult['status_code'] == '200') {
          this.paymntHisList = new MatTableDataSource(dataResult['data']);
          
          this.paymntHisList.paginator = this.paginator;
          this.paymntHisList.sort = this.sort;
          this.isSpinnerVisible = false;
      } else {
        this.paymntHisList = new MatTableDataSource();
        this.paymntHisList.paginator = this.paginator;
        this.paymntHisList.sort = this.sort;
        this.message = "No Data Found";
        this.dialog.open(FinanceDialogDynamicComponent,
            {
                width: '450px',
                data: { message: this.message }
            });
        this.isSpinnerVisible = false;
      }

    });
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.paymntHisList.filter = filterValue;
  }

  backPage(){
    this.location.back();
  }

}

export interface UserData {
  pub_name: any;
  pub_adx__id: any;
  pub_uniq_id: any;
  child_net_code: any;
  holdername: any;
  holderaddress: any;
  city: any;
  state: any;
  postal: any;
  gst_num: any;
}
