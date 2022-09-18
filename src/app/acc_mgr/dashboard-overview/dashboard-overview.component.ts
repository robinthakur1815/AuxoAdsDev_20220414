import { Component, OnInit, ViewEncapsulation, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { Observable, Observer } from 'rxjs';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { AccmgrOverviewService } from './dashboard-overview.service';
import { DialogDynamicAccComponent } from '../dialog-dynamic/dialog-dynamic.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
declare var $: any;
// tab start
export interface ExampleTab {
  label: string;
  content: string;
}

// tab End

@Component({
  selector: 'app-dashboard-overview',
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.scss']
})

// Collapse start
export class DashboardOverviewComponent implements OnInit {

  message: string;
  accountValue = "adx";
  totalAcc: number;
  adxEst = {"unfilled":"","impression":"","ecpm":"","fillrate":"","cur_week":""};
  adxPreWeek: any;
  adxReports = {"request":"","impression":"","covg":"","ecpm":"","revenue":""};
  top20Adx: [];
  list: [{"name":"","pub_id":"","child_net_code":""}];
  pubList: [{"name":"","pub_id":"","child_net_code":""}];
  webList: [];
  Top20Date: string;
  Top20DateAds: string;
  AdxMoversDate: string;
  AdsMoversDate: string;
  isSpinnerVisible:boolean=false;
  websitedrop:boolean=true;
  isSpinnerVisiblePre:boolean=false;
  public form: FormGroup = Object.create(null);
  panelOpenState = false;
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  // end collapse

  // tabs start

  tabs = ['First', 'Second', 'Third'];
  selected = new FormControl(0);

  tabLoadTimes: Date[] = [];

  asyncTabs: Observable<ExampleTab[]>;

  links = ['First', 'Second', 'Third'];
  activeLink = this.links[0];
  background = '';

  addTab(selectAfterAdding: boolean) {
    this.tabs.push('New');

    if (selectAfterAdding) {
      this.selected.setValue(this.tabs.length - 1);
    }
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }

  getTimeLoaded(index: number) {
    if (!this.tabLoadTimes[index]) {
      this.tabLoadTimes[index] = new Date();
    }

    return this.tabLoadTimes[index];
  }

  // tabs end

  constructor(private fb: FormBuilder,breakpointObserver: BreakpointObserver,private _overviewService:AccmgrOverviewService,public dialog: MatDialog,private datePipe: DatePipe) {

this.form = this.fb.group({
      accounts: [''],
      pub_ids: [''],
      web: [''],
      days: [''],
      strtdate: [''],
      enddate: ['']
    })
//performance overview start
    breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns = result.matches ?
        ['date', 'adx_earn', 'ads_earn', 'total_imp', 'total_ecpm', 'est_revenue'] :
        ['date', 'adx_earn', 'ads_earn', 'total_imp', 'total_ecpm', 'est_revenue'];
    });

breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns52 = result.matches ?
        ['date', 'adr', 'adimr', 'covg', 'ecpm', 'revenue','revenue_15'] :
        ['date', 'adr', 'adimr', 'covg', 'ecpm', 'revenue','revenue_15'];
    });
//performance overview end
   breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns1 = result.matches ?
        ['name', 'adr', 'adimr', 'covg', 'ecpm', 'revenue'] :
        ['name', 'adr', 'adimr', 'covg', 'ecpm', 'revenue'];
    });

    breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns2 = result.matches ?
        ['name', 'Impression', 'Imp_vari', 'eCPM', 'covg'] :
        ['name', 'Impression', 'Imp_vari', 'eCPM', 'covg'];
    });
   breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns9 = result.matches ?
        ['name', 'Impression', 'Imp_vari', 'eCPM', 'covg'] :
        ['name', 'Impression', 'Imp_vari', 'eCPM', 'covg'];
    });
    breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns11 = result.matches ?
        ['name', 'Revenue', 'rev_vari', 'eCPM', 'covg'] :
        ['name', 'Revenue', 'rev_vari', 'eCPM', 'covg'];
    });
   breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns12 = result.matches ?
        ['name', 'Revenue', 'rev_vari', 'eCPM', 'covg'] :
        ['name', 'Revenue', 'rev_vari', 'eCPM', 'covg'];
    });

   breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns13 = result.matches ?
        ['name', 'Page', 'page_vari', 'eCPM', 'covg'] :
        ['name', 'Page', 'page_vari', 'eCPM', 'covg'];
    });
   breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns14 = result.matches ?
        ['name', 'Page', 'page_vari', 'eCPM', 'covg'] :
        ['name', 'Page', 'page_vari', 'eCPM', 'covg'];
    });
//Adsense
breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns16 = result.matches ?
        ['id', 'Impression', 'Imp_vari', 'eCPM', 'covg'] :
        ['id', 'Impression', 'Imp_vari', 'eCPM', 'covg'];
    });
   breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns17 = result.matches ?
        ['id', 'Impression', 'Imp_vari', 'eCPM', 'covg'] :
        ['id', 'Impression', 'Imp_vari', 'eCPM', 'covg'];
    });
    breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns18 = result.matches ?
        ['id', 'Revenue', 'rev_vari', 'eCPM', 'covg'] :
        ['id', 'Revenue', 'rev_vari', 'eCPM', 'covg'];
    });
   breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns19 = result.matches ?
        ['id', 'Revenue', 'rev_vari', 'eCPM', 'covg'] :
        ['id', 'Revenue', 'rev_vari', 'eCPM', 'covg'];
    });

   breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns20 = result.matches ?
        ['id', 'Page', 'page_vari', 'eCPM', 'covg'] :
        ['id', 'Page', 'page_vari', 'eCPM', 'covg'];
    });
   breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns21 = result.matches ?
        ['id', 'Page', 'page_vari', 'eCPM', 'covg'] :
        ['id', 'Page', 'page_vari', 'eCPM', 'covg'];
    });
//Adsense
    breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns3 = result.matches ?
        ['name', 'website', 'earning30', 'earning90', 'date'] :
        ['name', 'website', 'earning30', 'earning90', 'date'];
    });

breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns15 = result.matches ?
        ['name', 'website', 'earning30', 'earning90', 'date'] :
        ['name', 'website', 'earning30', 'earning90', 'date'];
    });
  breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns5 = result.matches ?
        ['name', 'adr', 'adimr', 'covg', 'ecpm', 'revenue'] :
        ['name', 'adr', 'adimr', 'covg', 'ecpm', 'revenue'];
    });


  }

  ngOnInit(): void {
    this.isSpinnerVisible = true;
        this._overviewService.getAdxReportsData(localStorage.getItem('uniq_id'),localStorage.getItem('manager_id')).subscribe((response)=>{
           
           if(response['status_code']=='200'){
                 this.totalAcc = response['data']['Total_accounts']['totalAcc'];          
                 this.adxEst = response['data']['adx_earning'];          
                 this.adxPreWeek = response['data']['adx_preWeek'];          
                 this.adxReports = response['data']['today_adxReports'];          
                 this.isSpinnerVisible = false;
               }
             else if(response['status_code']=='422'){
                 //this.message = response['message'];
                 this.isSpinnerVisible = false;
               }   
            else{
                this.isSpinnerVisible = false;
                // this.message = "Something went wrong"; 
                // this.dialog.open(DialogDynamicAccComponent,

                //   { 
                //     width: '450px',
                //     data:  {message:this.message}
                //   });
               
               }
            
          })
        //API For ADX TOP 20, Movers and Inactive
        this._overviewService.getAdxMovData(localStorage.getItem('uniq_id'),localStorage.getItem('manager_id')).subscribe((response)=>{
           
           if(response['status_code']=='200')
              {

                 this.Top20Date =  response['data']['Top20Date'];
                 this.AdxMoversDate =  response['data']['AdxMoversDate'];
                 this.dataSource1 = new MatTableDataSource(response['data']['Top20']);
                 this.dataSource3 = new MatTableDataSource(response['data']['adx_inactive']);
                 this.dataSource2 = new MatTableDataSource(response['data']['adx_movers']['Impression Top']);
                 this.dataSource9 = new MatTableDataSource(response['data']['adx_movers']['Impression Bottom']);
                 this.dataSource11 = new MatTableDataSource(response['data']['adx_movers']['Revenue Bottom']);
                 this.dataSource12 = new MatTableDataSource(response['data']['adx_movers']['Revenue Bottom']);
                 this.dataSource13 = new MatTableDataSource(response['data']['adx_movers']['Page Views Top']);
                 this.dataSource14 = new MatTableDataSource(response['data']['adx_movers']['Page Views Bottom']);
                            
                 this.isSpinnerVisible = false;
               }
             else if(response['status_code']=='422'){
                 //this.message = response['message'];
                 this.isSpinnerVisible = false;
               }   
            else{
                 this.isSpinnerVisible = false;
                // this.message = "Something went wrong"; 
                // this.dialog.open(DialogDynamicAccComponent,

                //   { 
                //     width: '450px',
                //     data:  {message:this.message}
                //   });
               
               }
            
          })

        //API For ADsense TOP 20, Movers and Inactive
        this._overviewService.getAdsMovData(localStorage.getItem('uniq_id'),localStorage.getItem('manager_id')).subscribe((response)=>{
           
          if(response['status_code']=='200'){
                 this.Top20DateAds =  response['data']['Top20DateAds'];
                 this.AdsMoversDate =  response['data']['AdsMoversDate'];
                 this.dataSource5 = new MatTableDataSource(response['data']['Top20']);
                 this.dataSource15 = new MatTableDataSource(response['data']['ads_inactive']);
                 this.dataSource16 = new MatTableDataSource(response['data']['ads_movers']['Impression Top']);
                 this.dataSource17 = new MatTableDataSource(response['data']['ads_movers']['Impression Bottom']);
                 this.dataSource18 = new MatTableDataSource(response['data']['ads_movers']['Revenue Bottom']);
                 this.dataSource19 = new MatTableDataSource(response['data']['ads_movers']['Revenue Bottom']);
                 this.dataSource20 = new MatTableDataSource(response['data']['ads_movers']['Page Views Top']);
                 this.dataSource21 = new MatTableDataSource(response['data']['ads_movers']['Page Views Bottom']);
                            
                 this.isSpinnerVisible = false;
               }
             else if(response['status_code']=='422'){
                 //this.message = response['message'];
                 this.isSpinnerVisible = false;
               }   
            else{
              this.isSpinnerVisible = false;
                // this.message = "Something went wrong"; 
                // this.dialog.open(DialogDynamicAccComponent,

                //   { 
                //     width: '450px',
                //     data:  {message:this.message}
                //   });
               
               }
            
          })

        //API For performnace overview
        this._overviewService.getPerfData(localStorage.getItem('uniq_id'),this.accountValue,'NULL',localStorage.getItem('manager_id'),'no','NULL','NULL','NULL','NULL','NULL').subscribe((response)=>{

          if(response['status_code']=='200'){                
                 this.dataSource = new MatTableDataSource(response['data']['Topoverview']);
                 this.list = response['data']['pub_list'];
                 
                this.isSpinnerVisible = false;
               }
             else if(response['status_code']=='422'){
                 this.isSpinnerVisible = false;
               }   
            else{
               this.isSpinnerVisible = false;               
               }
            
          })
  }

  accChange(accId){
    this.accountValue = accId.value;

    if(this.accountValue == "adx"){
      this.websitedrop = true;
    }else if(this.accountValue == "adsense"){
      this.websitedrop = false;
    }

    //API For performnace overview
    this._overviewService.getPerfData(localStorage.getItem('uniq_id'),this.accountValue,'NULL',localStorage.getItem('manager_id'),'no','NULL','NULL','NULL','NULL','NULL').subscribe((response)=>{
      if(response['status_code']=='200'){
        this.list = response['data']['pub_list'];
        this.pubList = this.list;
        this.webList = [];
        this.isSpinnerVisible = false;
      }else if(response['status_code']=='422'){
        this.isSpinnerVisible = false;
      }else{
        this.isSpinnerVisible = false;
      }
    })
  }

  webChange(pubId){
    //API For performnace overview
    this._overviewService.getPerfData(localStorage.getItem('uniq_id'),this.accountValue,pubId.value,localStorage.getItem('manager_id'),'no','NULL','NULL','NULL','NULL','NULL').subscribe((response)=>{
    if(response['status_code']=='200'){
      this.webList = response['data']['pub_web'];
      this.isSpinnerVisible = false;
    }else{
      this.isSpinnerVisible = false;
    }
    });
  }

  //performance overview filter function
  goFilter(){
    this.isSpinnerVisiblePre = true;
    const accounts =  this.form.value.accounts;
    const pub_ids =  this.form.value.pub_ids;
    let id_pub:string = 'NULL';
    let child_net_code:string = 'NULL';

    if(pub_ids != ''){
      const child = this.list.filter((value) => {
        return value.pub_id == pub_ids;
      });
      id_pub = pub_ids;
      child_net_code =  child[0].child_net_code;
    }

    const web =  this.form.value.web == '' ? 'NULL':this.form.value.web;
    const days =  this.form.value.days == '' ? 'NULL':this.form.value.days;
    const strtdatenew = this.form.value.strtdate == '' ? 'NULL': this.form.value.strtdate;
    const enddatenew = this.form.value.enddate == '' ? 'NULL': this.form.value.enddate;

    //API For performnace overview
    this._overviewService.getPerfData(localStorage.getItem('uniq_id'), this.accountValue, id_pub, localStorage.getItem('manager_id'), 'yes', child_net_code, web, days, strtdatenew, enddatenew).subscribe((response)=>{

      if(response['status_code']=='200'){
        $("#defaultOverview").hide();
        $("#filterOverview").show();
        this.dataSource52 = new MatTableDataSource(response['data']['filterData']);
        this.isSpinnerVisiblePre = false;
      }else{
        this.isSpinnerVisiblePre = false;               
      }
    })
  }



  displayedColumns = ['date', 'adx_earn', 'ads_earn', 'total_imp', 'total_ecpm', 'est_revenue'];
  dataSource : MatTableDataSource<Element[]>;

  displayedColumns52 = ['date', 'adr', 'adimr', 'covg', 'ecpm', 'revenue','revenue_15'];
  dataSource52 : MatTableDataSource<Element[]>;

  displayedColumns1 = ['name', 'adr', 'adimr', 'covg', 'ecpm', 'revenue'];
  dataSource1 : MatTableDataSource<Element1[]>;

  displayedColumns2 = ['name', 'Impression', 'Imp_vari', 'eCPM', 'covg'];
  dataSource2:MatTableDataSource<Element2[]>;

  displayedColumns9 = ['name', 'Impression', 'Imp_vari', 'eCPM', 'covg'];
  dataSource9 :MatTableDataSource<Element9[]>;
   
   displayedColumns11 = ['name', 'Revenue', 'rev_vari', 'eCPM', 'covg'];
  dataSource11:MatTableDataSource<Element11[]>;

  displayedColumns12 = ['name', 'Revenue', 'rev_vari', 'eCPM', 'covg'];
  dataSource12 :MatTableDataSource<Element12[]>;

  displayedColumns13 = ['name', 'Page', 'page_vari', 'eCPM', 'covg'];
  dataSource13 :MatTableDataSource<Element13[]>;
  displayedColumns14 = ['name', 'Page', 'page_vari', 'eCPM', 'covg'];
  dataSource14 :MatTableDataSource<Element14[]>;

   displayedColumns16 = ['id', 'Impression', 'Imp_vari', 'eCPM', 'covg'];
  dataSource16:MatTableDataSource<Element2[]>;

  displayedColumns17 = ['id', 'Impression', 'Imp_vari', 'eCPM', 'covg'];
  dataSource17 :MatTableDataSource<Element9[]>;
   
   displayedColumns18 = ['id', 'Revenue', 'rev_vari', 'eCPM', 'covg'];
  dataSource18:MatTableDataSource<Element11[]>;

  displayedColumns19 = ['id', 'Revenue', 'rev_vari', 'eCPM', 'covg'];
  dataSource19 :MatTableDataSource<Element12[]>;

  displayedColumns20 = ['id', 'Page', 'page_vari', 'eCPM', 'covg'];
  dataSource20 :MatTableDataSource<Element13[]>;
  displayedColumns21 = ['id', 'Page', 'page_vari', 'eCPM', 'covg'];
  dataSource21 :MatTableDataSource<Element14[]>;


  displayedColumns3 = ['name', 'website', 'earning30', 'earning90', 'date'];
  dataSource3:MatTableDataSource<Element3[]>;

  displayedColumns15 = ['name', 'website', 'earning30', 'earning90', 'date'];
  dataSource15:MatTableDataSource<Element15[]>;

  displayedColumns5 = ['name', 'adr', 'adimr', 'covg', 'ecpm', 'revenue'];
  dataSource5 : MatTableDataSource<Element5[]>;
}

export interface Element {
  date: string;
  adx_earn: string;
  ads_earn: string;
  total_imp: string;
  total_ecpm: string;
  est_revenue: string
}
export interface Element52 {
  name: string;
  adr: string;
  adimr: string;
  covg: string;
  ecpm: string;
  revenue: string;
  revenue_15: string;
}
export interface Element1 {
  name: string;
  adr: string;
  adimr: string;
  covg: string;
  ecpm: string;
  revenue: string;
}

export interface Element2 {
  name: string;
  Impression: string;
  Imp_vari: string;
  eCPM: string;
  covg: string;
}
export interface Element9 {
  name: string;
  Impression: string;
  Imp_vari: string;
  eCPM: string;
  covg: string;
}
export interface Element11 {
  name: string;
  Revenue: string;
  rev_vari: string;
  eCPM: string;
  covg: string;
}
export interface Element12 {
  name: string;
  Revenue: string;
  rev_vari: string;
  eCPM: string;
  covg: string;
}
export interface Element13 {
  name: string;
  Page: string;
  page_vari: string;
  eCPM: string;
  covg: string;
}
export interface Element14 {
  name: string;
  Page: string;
  page_vari: string;
  eCPM: string;
  covg: string;
}
export interface Element16 {
  id: string;
  Impression: string;
  Imp_vari: string;
  eCPM: string;
  covg: string;
}
export interface Element17 {
  id: string;
  Impression: string;
  Imp_vari: string;
  eCPM: string;
  covg: string;
}
export interface Element18 {
  id: string;
  Revenue: string;
  rev_vari: string;
  eCPM: string;
  covg: string;
}
export interface Element19 {
  id: string;
  Revenue: string;
  rev_vari: string;
  eCPM: string;
  covg: string;
}
export interface Element20 {
  id: string;
  Page: string;
  page_vari: string;
  eCPM: string;
  covg: string;
}
export interface Element21 {
  id: string;
  Page: string;
  page_vari: string;
  eCPM: string;
  covg: string;
}
export interface Element3 {
  name: string;
  website: string;
  earning30: string;
  earning90: string;
  date: string;
}
export interface Element15 {
  name: string;
  website: string;
  earning30: string;
  earning90: string;
  date: string;
}
export interface Element5 {
  name: string;
  adr: string;
  adimr: string;
  covg: string;
  ecpm: string;
  revenue: string;
}



