import { Component, Inject, OnInit, ViewChild, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BreakpointObserver } from '@angular/cdk/layout';

import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions, TooltipPosition } from '@angular/material/tooltip';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {PaymentConfrmService} from './payment-confirmation.service';
import { FinanceDialogDynamicComponent } from '../finance-dialog-dynamic/finance-dialog-dynamic.component';
import { AppSettings } from '../../global/app-url';
import { saveAs } from 'file-saver';
// Tooltip start
export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 1000,
  hideDelay: 1000,
  touchendHideDelay: 1000,
};
// tool tip end
// Payment Done Popup
@Component({
  selector: 'app-dialog-payment-done-dialog',
  templateUrl: 'dialog-payment-done.html'
})
export class DialogPaymentDoneFinancePaymentConfrmComponent {
  public accholdername:any;
  public pub_uniq_id:any;
  public invoice_id:any;
  public month:any;
  public message:any;
  isSpinnerVisible: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<DialogPaymentDoneFinancePaymentConfrmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog,private fb: FormBuilder,private _serviceFile: PaymentConfrmService
  ) {
    this.accholdername = data.accholdername;
    this.pub_uniq_id = data.pubUniqId;
    this.invoice_id = data.invoiceId;
    this.month = data.month;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmSubmit(){
    if(this.pub_uniq_id!=null && this.invoice_id!=null && this.month!=null){
      this.isSpinnerVisible = true;
      this._serviceFile.updateInvStatus(this.pub_uniq_id,this.invoice_id,this.month).subscribe(dataResult => {
        if (dataResult['status_code'] == '200') {
          this.onNoClick();
          this.message = "Status paid successfully added.";
          this.dialog.open(FinanceDialogDynamicComponent,
              {
                  width: '450px',
                  data: { message: this.message }
              });
          this.isSpinnerVisible = false;
        } else {
          this.onNoClick();
          this.message = "Status Paid not set.";
          this.dialog.open(FinanceDialogDynamicComponent,
              {
                  width: '450px',
                  data: { message: this.message }
              });
          this.isSpinnerVisible = false;
        }
      });
    }else{
      
    }
    
  }
}
@Component({
  selector: 'app-payment-confirmation',
  templateUrl: './payment-confirmation.component.html',
  styleUrls: ['./payment-confirmation.component.scss'],
  // Tooltip start
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults }
  ],
  // tool tip end 
})

export class PaymentConfirmationComponent implements OnInit {
  displayedColumns = [];
  allInvList: MatTableDataSource<UserData>;
  public message:any;
  public getInvmonth:any;
  public getInvyear:any;
  public chkInvmonth:any;
  public chkInvyear:number;
  public chkInvDateforEar:boolean;
  public isSpinnerVisible: boolean = true;
  public findInvform: FormGroup = Object.create(null);
  public sitePath = AppSettings.API_STARTPOINT;



  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort, { static: true }) sort: MatSort = Object.create(null);


  constructor(breakpointObserver: BreakpointObserver, private fb: FormBuilder, private location: Location, public dialog: MatDialog, private router: Router,private _serviceFile: PaymentConfrmService) {

    breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns = result.matches ?
        ['month', 'name', 'address', 'earning', 'invoice', 'status', 'action'] :
        ['month', 'name', 'address', 'earning', 'invoice', 'status', 'action'];
    });
  }


  ngOnInit() {
    this.findInvform = this.fb.group({
      inv_month: [null,Validators.compose([Validators.required])],
      inv_year: [null,Validators.compose([Validators.required])],
    });
    let defaultMonYear = "NULL";
    this.callbackfunction(defaultMonYear);
    
  }

  callbackfunction(month_year:any){
    this._serviceFile.getInvoiceList(month_year).subscribe(dataResult => {
      if (dataResult['status_code'] == '200') {
          this.allInvList = new MatTableDataSource(dataResult['data']);
          this.getInvmonth = dataResult['month_year']['month'].trim();
          this.getInvyear = dataResult['month_year']['year'].trim();
          this.chkInvmonth = dataResult['month_year']['month'].trim();
          this.chkInvyear = dataResult['month_year']['year'].trim();

          var lastInvDate= {day: 1,month: 'February', year: 2022,hour: 13,minute: 38,second: 22};          
          var curInvDate= {day: 1,month: this.chkInvmonth, year: this.chkInvyear,hour: 12,minute: 38,second: 22};          

          this.chkInvDateforEar = this.compareDays(curInvDate,lastInvDate);

          this.allInvList.paginator = this.paginator;
          this.allInvList.sort = this.sort;
          this.isSpinnerVisible = false;
      } else {
        this.allInvList = new MatTableDataSource();
        this.allInvList.paginator = this.paginator;
        this.allInvList.sort = this.sort;
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
  compareDays(curdateObj:any,lastdateObj:any){
    var curDateObjs=new Date(curdateObj.year+'-'+curdateObj.month+"-"+curdateObj.day+
    " "+ curdateObj.hour +":" + curdateObj.minute + ":" + curdateObj.second + ".000Z");
    var lastDateObjs=new Date(lastdateObj.year+'-'+lastdateObj.month+"-"+lastdateObj.day+
    " "+ lastdateObj.hour +":" + lastdateObj.minute + ":" + lastdateObj.second + ".000Z");
    
    return (curDateObjs.getTime() / 1000) > (lastDateObjs.getTime() / 1000) ? true :false;
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.allInvList.filter = filterValue;
  }
  invoicefilter(){
    if (this.findInvform.invalid) {
      return;
    }
    if (this.findInvform.valid) {
      this.isSpinnerVisible = true;
      let formMonYear = this.findInvform.value.inv_month+" "+this.findInvform.value.inv_year;
      this.callbackfunction(formMonYear);
    }
  }

  paymentDoneDialog(holdername:any,pubUniqId:any,invoiceId:any,month:any): void {
    
    const dialogRef = this.dialog.open(DialogPaymentDoneFinancePaymentConfrmComponent, {
      width: '450px',
      data: {accholdername:holdername,pubUniqId: pubUniqId,invoiceId:invoiceId,month:month }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  downloadInv(fileName:any){
    const fileUrl = AppSettings.API_STARTPOINT + '/assets/api/admin/user/invoice/invoice_upload/' + fileName;
    saveAs(fileUrl, fileName);
  }
  exportTablecsv(){
    this.isSpinnerVisible = true;
    let formMonYear = this.chkInvmonth+" "+this.chkInvyear;
    this._serviceFile.exportInvoiceList(formMonYear).subscribe(dataResult => {
      if (dataResult['status_code'] == '200') {
        const fileName = dataResult['data'];
        const fileUrl = AppSettings.API_STARTPOINT + '/assets/api/admin/backend-admin/upload/' + fileName;
        saveAs(fileUrl, fileName);
        this.isSpinnerVisible = false;
      } else {
        this.message = "Something went wrong";
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
