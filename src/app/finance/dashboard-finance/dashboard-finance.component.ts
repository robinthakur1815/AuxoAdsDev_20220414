import { Component, Inject, OnInit, ViewChild, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BreakpointObserver } from '@angular/cdk/layout';
import { FormBuilder,FormGroup,Validators,FormControl} from '@angular/forms';
import { Location } from '@angular/common';
import { DashboardFinanceService } from './dashboard-finance.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FinanceDialogDynamicComponent } from '../finance-dialog-dynamic/finance-dialog-dynamic.component';

@Component({
  selector: 'app-dashboard-finance',
  templateUrl: './dashboard-finance.component.html',
  styleUrls: ['./dashboard-finance.component.scss'],
})

export class DashboardFinanceComponent implements OnInit {
  displayedColumns = ['pub_name', 'manager_name', 'month','account_inv', 'status_inv', 'date_inv'];
  acc_mgr_list = [];
  inv_mnth_list = [];
  pub_name_list = [];
  dataSource: MatTableDataSource<UserData>;
  public message;
  public isSpinnerVisible: boolean = true;
  public isSpinnerVisible1: boolean = true;
  public isSpinnerVisible2: boolean = true;
  public isSpinnerVisible3: boolean = true;
  public filterform: FormGroup = Object.create(null);
  public invMonthModel:any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort, { static: true }) sort: MatSort = Object.create(null);


  constructor(breakpointObserver: BreakpointObserver, private fb: FormBuilder, private location: Location, public dialog: MatDialog,private _dashboardService: DashboardFinanceService) {

    breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns = result.matches ?
      ['pub_name', 'manager_name', 'month','account_inv', 'status_inv', 'date_inv'] :
      ['pub_name', 'manager_name', 'month','account_inv', 'status_inv', 'date_inv'];
    });
  }


  ngOnInit(): void {
    this.filterform = this.fb.group({
      acc_manager: new FormControl(null),
      pub_name: new FormControl(null),
      month_year: new FormControl(null),
    });
    
    this.callbackfuntion();
  }
  callbackfuntion(){
    this._dashboardService.getAccountManagerList().subscribe(dataResult => {
        if (dataResult['status_code'] == '200') {
            this.acc_mgr_list = dataResult['manager_list'];
            this.isSpinnerVisible = false;
        } else {
          this.message = dataResult['message'];
          this.dialog.open(FinanceDialogDynamicComponent,
              {
                  width: '450px',
                  data: { message: this.message }
              });
          this.isSpinnerVisible = false;
        }
    });
    this._dashboardService.getInvoiceMonth().subscribe(dataResult => {
      if (dataResult['status_code'] == '200') {
          this.inv_mnth_list = dataResult['invoiceMonth'];
          this.isSpinnerVisible1 = false;
      } else {
        this.message = dataResult['message'];
        this.dialog.open(FinanceDialogDynamicComponent,
            {
                width: '450px',
                data: { message: this.message }
            });
        this.isSpinnerVisible1 = false;
      }
    });
    this._dashboardService.getInvoiceList().subscribe(dataResult => {
      if (dataResult['status_code'] == '200') {
			    this.dataSource = new MatTableDataSource(dataResult['invoiceList']);
			    this.invMonthModel = dataResult['month_year'];
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.isSpinnerVisible2 = false;
      } else {
        this.message = dataResult['message'];
        this.dialog.open(FinanceDialogDynamicComponent,
            {
                width: '450px',
                data: { message: this.message }
            });
        this.isSpinnerVisible2 = false;
      }
    });

    this._dashboardService.getAllPublisherList().subscribe(dataResult => {
      if (dataResult['status_code'] == '200') {
        this.pub_name_list = dataResult['publisherList'];
        this.isSpinnerVisible3 = false;
      } else {
        this.message = dataResult['message'];
        this.dialog.open(FinanceDialogDynamicComponent,
            {
                width: '450px',
                data: { message: this.message }
            });
        this.isSpinnerVisible3 = false;
      }
  });

  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    console.log(filterValue);
    this.dataSource.filter = filterValue;
  }

  backPage(){
    this.location.back();
  }
  getPublisherList(){
    this.isSpinnerVisible = true;
    const acc_manager = this.filterform.value.acc_manager;
    if(acc_manager!=null){
      this._dashboardService.getPublisherList(acc_manager).subscribe(dataResult => {
        if (dataResult['status_code'] == '200') {
            this.pub_name_list = dataResult['publisherList'];
            this.isSpinnerVisible = false;
        } else {
          this.message = dataResult['message'];
          this.dialog.open(FinanceDialogDynamicComponent,
              {
                  width: '450px',
                  data: { message: this.message }
              });
          this.isSpinnerVisible = false;
        }
      });
    }
  }
  filterFunctn(){
    this.isSpinnerVisible = true;
    const acc_manager = this.filterform.value.acc_manager;
    const pub_name = this.filterform.value.pub_name;
    let month_year = this.filterform.value.month_year;
    if(acc_manager!=null || pub_name!=null || month_year!=null){
      if(month_year=='All'){
        month_year = null;
      }
      this._dashboardService.getfilterPublisherList(acc_manager,pub_name,month_year).subscribe(dataResult => {
        if (dataResult['status_code'] == '200') {
          this.dataSource = new MatTableDataSource(dataResult['filterinvoiceList']);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.isSpinnerVisible = false;
        } else {
          this.dataSource = new MatTableDataSource(dataResult['filterinvoiceList']);
          this.message = dataResult['message'];
          this.dialog.open(FinanceDialogDynamicComponent,
              {
                  width: '450px',
                  data: { message: this.message }
              });
          this.isSpinnerVisible = false;
        }
      });
    }
  }
}


export interface UserData {
  holdername: string;
  manager_name: string;
  month:string;
  dis_rev: any;
  app_rev: any;
  vid_rev: any;
  hbads: any;
  invalid_traffic: any;
  invoice_status: any;
  date: any;
  
}
