import { Component, Inject, OnInit, ViewChild, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {PaymentHistoryStatusService} from './payment-history-status.service';
import { FinanceDialogDynamicComponent } from '../finance-dialog-dynamic/finance-dialog-dynamic.component';
import { AppSettings } from '../../global/app-url';
import { ActivatedRoute } from '@angular/router';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-payment-history-status',
  templateUrl: './payment-history-status.component.html',
  styleUrls: ['./payment-history-status.component.scss'],
  
})

export class PaymentHistoryStatusComponent implements OnInit {
  displayedColumns = [];
  dataSource: MatTableDataSource<UserData>;
  public isSpinnerVisible: boolean = true;
  public message:any;
  public pubUniqId:any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort, { static: true }) sort: MatSort = Object.create(null);


  constructor(breakpointObserver: BreakpointObserver, private location: Location, public dialog: MatDialog, private router: Router,private _serviceFile: PaymentHistoryStatusService,activatedRouter: ActivatedRoute) {
    this.pubUniqId = activatedRouter.snapshot.paramMap.get('uniqId');
    breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns = result.matches ?
        ['month', 'company_name', 'bcr_rate', 'earnings', 'status', 'view'] :
        ['month', 'company_name', 'bcr_rate', 'earnings', 'status', 'view'];
    });

  }


  ngOnInit() {
    this.callbackfunction();

  }
  callbackfunction(){
    this._serviceFile.getPubPayHisList(this.pubUniqId).subscribe(dataResult => {
      if (dataResult['status_code'] == '200') {
          this.dataSource = new MatTableDataSource(dataResult['data']);
          
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.isSpinnerVisible = false;
      } else {
        this.dataSource = new MatTableDataSource();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
    this.dataSource.filter = filterValue;
  }

  backPage(){
      this.location.back();
  }
  downloadInv(fileName:any){
    const fileUrl = AppSettings.API_STARTPOINT + '/assets/api/admin/user/invoice/invoice_upload/' + fileName;
    saveAs(fileUrl, fileName);
  }
}

export interface UserData {
  month: string;
  holdername: string;
  holderaddress: string;
  pdf_name: string;
  invoice_status: string;
  pub_uniq_id: string;
  child_net_code: string;
  dis_rev: string;
  vid_rev: string;
  app_rev: string;
  invalid_traffic: string;
  hbads: string;
  gst_num: string;
  bcr: string;
 }
