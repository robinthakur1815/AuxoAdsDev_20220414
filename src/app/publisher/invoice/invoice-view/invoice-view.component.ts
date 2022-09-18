import { Component, OnInit } from '@angular/core';
import { ServiceinvoiceService } from '../serviceinvoice.service';
import { InvoiceList } from '../invoice';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDynamicComponent } from '../../dialog-dynamic/dialog-dynamic.component';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';
import { AppSettings } from '../../../global/app-url';

@Component({
  selector: 'app-invoice-view',
  templateUrl: './invoice-view.component.html',
  styleUrls: ['./invoice-view.component.scss']
})
export class InvoiceViewComponent implements OnInit {

  id: any;
  invoiceDetail: InvoiceList[]; 
  public message;
  public isSpinnerVisible:boolean=true;

  public monthyear;
  public errorMsg;
  public final_rev;
  public can;
  public cap;
  public adx_deals;
  public invalid_rev;
  public conv_rate;
  public month:any;
  public invoice_date = [];
  public acc_mgr_id = [];
  public policy_disabled;
  public status;
  public disable: boolean = false;
  public stamp: boolean = false;
  public invoice_number;
  public pub_adx_partner_id;
  public trimmed_pub_adx_partner_id;
  public accountHolderName;
  public accountHolderAddress;
  public city;
  public state;
  public postal_code;
  public bankName = [];
  public accountNumber = [];
  public ifsc = [];
  public pannumber;
  public gstnumber;
  public gstaddress;
  public gstcity;
  public gststate;
  public gstpostal;
  public accountType = [];
  public bank_address = [];
  public bank_city = [];
  public bank_state;
  public bank_postal = [];
  public delhi_state: boolean = false;
  public gst_flag: boolean = false;
  public ntwktbl: boolean = false;
  public publisherEmail:any;
  // public isLoading:boolean = false;
  public final_rev_number;
  public decimal_number;
  public swift_code;
  public country_type;
  public country;
  public invoiceTypeIndia;

  public countryIndia : boolean = false;
  public countrySingapore : boolean = false;
  public countryOther : boolean = false;
  role_id = localStorage.getItem('role_id');
  rolePublisher:boolean = false;
  roleNetwork: boolean = false;
  
  public chkInvmonth:any;
  public chkInvyear:number;
  public chkInvDateforEar:boolean;
  displayedColumns: string[] = ['itemName', 'unitPrice', 'unit', 'total'];


  constructor(activatedRouter: ActivatedRoute, private invoiceService: ServiceinvoiceService, public dialog: MatDialog, private router: Router) {
    // debugger;
    this.id = activatedRouter.snapshot.paramMap.get('id');
    // this.invoiceDetail = this.invoiceService.getInvoiceList1().filter(x => x.id === +this.id);
  }

  ngOnInit(): void {

    //Aprrove Btn condtion
    if(this.role_id == '3' || this.role_id == '12'){
      this.rolePublisher = true;
    }
    if (this.role_id == '6') {
      this.roleNetwork = true;
    }
    // debugger;

    this.invoiceService.viewInvoiceList(this.id, localStorage.getItem('uniq_id'), localStorage.getItem('child_net_code'))
      .subscribe(dataResult => {
        this.isSpinnerVisible = false;
        if (dataResult['status_code'] == '200') {
          // this.invoiceDetail = new MatTableDataSource(dataResult['invoicing']);
          this.final_rev = parseFloat(dataResult['incView']['invoice']['CAN']) + parseFloat(dataResult['incView']['invoice']['CAP']) + parseFloat(dataResult['incView']['invoice']['adx_deals_pub_rev']);
          this.can = dataResult['incView']['invoice']['CAN'];
          this.cap = parseFloat(dataResult['incView']['invoice']['CAP'])+parseFloat(dataResult['incView']['invoice']['adx_deals_pub_rev']);
          // this.adx_deals = dataResult['incView']['invoice']['adx_deals_pub_rev'];
          this.invalid_rev = dataResult['incView']['invoice']['invalid_rev'];
          this.conv_rate = dataResult['incView']['invoice']['bcr_rate'];
          this.month = dataResult['incView']['invoice']['month'];
          this.invoice_date = dataResult['incView']['invoice']['invoice_date'];
          this.acc_mgr_id = dataResult['incView']['invoice']['acc_mgr_id'];
          this.policy_disabled = dataResult['incView']['invoice']['policy_disabled'];
          this.status = dataResult['incView']['invoice']['status'];
          this.publisherEmail = dataResult['incView']['invoice']['pub_email'];
          this.pub_adx_partner_id = dataResult['incView']['bank']['pub_adx_partner_id'];
          // this.trimmed_pub_adx_partner_id = this.pub_adx_partner_id.replace("adx-subsyn-", "");
          this.invoice_number = localStorage.getItem('child_net_code') + "/CMS/" + dataResult['incView']['invoice']['invoice_number'];
          this.accountHolderName = dataResult['incView']['bank']['accountHolderName'];
          this.accountHolderAddress = dataResult['incView']['bank']['accountHolderAddress'];
          this.city = dataResult['incView']['bank']['city'];
          this.state = dataResult['incView']['bank']['state'];
          this.postal_code = dataResult['incView']['bank']['postal_code'];
          this.bankName = dataResult['incView']['bank']['bankName'];
          this.accountNumber = dataResult['incView']['bank']['accountNumber'];
          this.ifsc = dataResult['incView']['bank']['ifsc'];
          this.pannumber = dataResult['incView']['bank']['pan_number'];
          this.gstnumber = dataResult['incView']['bank']['gst_number'];
          this.gstaddress = dataResult['incView']['bank']['gst_address'];
          this.gstcity = dataResult['incView']['bank']['gst_city'];
          this.gststate = dataResult['incView']['bank']['gst_state'];
          this.gstpostal = dataResult['incView']['bank']['gst_postal'];
          this.accountType = dataResult['incView']['bank']['acountType'];
          this.bank_address = dataResult['incView']['bank']['bank_address'];
          this.bank_city = dataResult['incView']['bank']['bank_city'];
          this.bank_state = dataResult['incView']['bank']['bank_state'];
          this.bank_postal = dataResult['incView']['bank']['bank_postal'];
          this.swift_code = dataResult['incView']['bank']['swift_code'];
          this.country_type = dataResult['incView']['bank']['country_type'];
          this.country = dataResult['incView']['bank']['country'];
          
          if (this.policy_disabled == 'Y' || this.status == 'Payment Under Process' || this.status == 'Paid') {
            this.disable = true;
          }
          if (this.status == 'Paid') {
            this.stamp = true;
          }
          if (this.gststate == 'Delhi') {
            this.delhi_state = true;
          }
          if (this.country_type == 'domestic') {
            this.invoiceTypeIndia = true;
          } else {
            this.invoiceTypeIndia = false;
          }
          if (this.gstnumber != '' && this.gstnumber != null && this.gstnumber.toString().length > 10) {
            this.gst_flag = true;
          }
          else {
            this.gst_flag = false;
            this.gstnumber = "N/A";
          }
          if (this.pannumber == '') {
            this.pannumber = "N/A";
          }

          if(this.country=='99'){
            this.countryIndia = true;
            this.countrySingapore = false;
            this.countryOther = false;
          }else if(this.country=='192'){
            this.countryIndia = false;
            this.countrySingapore = true;
            this.countryOther = false;
          }else{
            this.countryIndia = false;
            this.countrySingapore = false;
            this.countryOther = true;
          }
          
          if(this.month!=''){
            let stringToSplit = this.month.trim();
            console.log("split date=>"+stringToSplit);
            let x = stringToSplit.split(" ");
            this.chkInvmonth = x[0];
            this.chkInvyear = x[1];
            var lastInvDate= {day: 1,month: 'February', year: 2022,hour: 13,minute: 38,second: 22};          
            var curInvDate= {day: 1,month: this.chkInvmonth, year: this.chkInvyear,hour: 12,minute: 38,second: 22};          
            this.chkInvDateforEar = this.compareDays(curInvDate,lastInvDate);
          }


        } else {
          this.message = dataResult['message'];
          this.dialog.open(DialogDynamicComponent,
            {
              width: '450px',
              data:{message:this.message}
            });
        }

      },
        error => this.errorMsg = error);
  }
  approval() {
    this.isSpinnerVisible = true;
    let currentUrl = this.router.url;
    // alert(currentUrl);
    this.invoiceService.approveInvoice(localStorage.getItem('acc_mgr_id'), localStorage.getItem('uniq_id'), this.month, this.invoice_date, this.invoice_number, localStorage.getItem('child_net_code'))
      .subscribe(dataResult => {
        this.isSpinnerVisible = false;
        if (dataResult['status_code'] == '200') {
          this.message = "Thank you for approving the payment advice for "+this.month+". Kindly email us the corresponding invoice in order to process the payment.";
          this.dialog.open(DialogDynamicComponent,
            {
              width: '450px',
              data: {message:this.message}
            });
        } else {
          this.message = dataResult['message'];
          this.dialog.open(DialogDynamicComponent,
            {
              width: '450px',
              data: {message:this.message}
            });
        }
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['invoice-list/viewInvoice/' + this.month]);
        });
      },
        error => this.errorMsg = error);

    // alert("hello");
  }
  downloadInvoice() {
    this.isSpinnerVisible = true;
    this.invoiceService.downloadInvoiceName(localStorage.getItem('acc_mgr_id'), localStorage.getItem('uniq_id'), this.month, this.invoice_date, this.invoice_number, localStorage.getItem('child_net_code'))
      .subscribe(dataResult => {
        this.isSpinnerVisible = false;
        if (dataResult['status_code'] == '200') {
          // var FileSaver = require('file-saver');
          const pdfName = dataResult['data']['pdf_name'];
          const pdfUrl = AppSettings.API_STARTPOINT+'/assets/api/admin/user/invoice/invoice_upload/'+pdfName;
          
          saveAs(pdfUrl, pdfName);


          this.message = dataResult['message'];
          this.dialog.open(DialogDynamicComponent,
            {
              width: '450px',
              data: {message:this.message}
            });
        } else {
          this.message = dataResult['message'];
          this.dialog.open(DialogDynamicComponent,
            {
              width: '450px',
              data: {message:this.message}
            });
        }

      },
        error => this.errorMsg = error);


  }

  NumInWords(number1) {

    const number2 = parseFloat(number1).toFixed(2).split(".");
    const number = parseInt(number2[0]);
    const digit = parseInt(number2[1]);
    // alert(digit);
    const first = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const mad = ['', 'Thousand', 'Million', 'Billion', 'Trillion'];
    let word = '';
    let decimal = '';

    for (let i = 0; i < mad.length; i++) {
      let tempNumber = number % (100 * Math.pow(1000, i));
      if (Math.floor(tempNumber / Math.pow(1000, i)) !== 0) {
        if (Math.floor(tempNumber / Math.pow(1000, i)) < 20) {
          word = first[Math.floor(tempNumber / Math.pow(1000, i))] + mad[i] + ' ' + word;
        } else {
          word = tens[Math.floor(tempNumber / (10 * Math.pow(1000, i)))] + ' ' + first[Math.floor(tempNumber / Math.pow(1000, i)) % 10] + mad[i] + ' ' + word;
        }
      }

      tempNumber = number % (Math.pow(1000, i + 1));
      if (Math.floor(tempNumber / (100 * Math.pow(1000, i))) !== 0) word = first[Math.floor(tempNumber / (100 * Math.pow(1000, i)))] + 'Hundred ' + word;
    }
    this.final_rev_number = word;

    if (digit && digit > 0) {
      for (let i = 0; i < mad.length; i++) {
        let tempNumber = digit % (100 * Math.pow(1000, i));
        if (Math.floor(tempNumber / Math.pow(1000, i)) !== 0) {
          if (Math.floor(tempNumber / Math.pow(1000, i)) < 20) {
            decimal = first[Math.floor(tempNumber / Math.pow(1000, i))] + mad[i] + ' ' + decimal;
          } else {
            decimal = tens[Math.floor(tempNumber / (10 * Math.pow(1000, i)))] + ' ' + first[Math.floor(tempNumber / Math.pow(1000, i)) % 10] + mad[i] + ' ' + decimal;
          }
        }

        tempNumber = digit % (Math.pow(1000, i + 1));
        if (Math.floor(tempNumber / (100 * Math.pow(1000, i))) !== 0) decimal = first[Math.floor(tempNumber / (100 * Math.pow(1000, i)))] + 'Hundred ' + decimal;
      }
      this.decimal_number = decimal;
    } else {
      this.decimal_number = false;
    }
  }
  compareDays(curdateObj:any,lastdateObj:any){
    var curDateObjs=new Date(curdateObj.year+'-'+curdateObj.month+"-"+curdateObj.day+
    " "+ curdateObj.hour +":" + curdateObj.minute + ":" + curdateObj.second + ".000Z");
    var lastDateObjs=new Date(lastdateObj.year+'-'+lastdateObj.month+"-"+lastdateObj.day+
    " "+ lastdateObj.hour +":" + lastdateObj.minute + ":" + lastdateObj.second + ".000Z");
    
    return (curDateObjs.getTime() / 1000) > (lastDateObjs.getTime() / 1000) ? true :false;
  }
}
