import { Component, OnInit, ViewEncapsulation, ViewChild, AfterViewInit} from '@angular/core';
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
import { AdminOverviewService } from './dashboard-overview.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminDialogDynamicComponent } from '../dialog-dynamic/admin-dialog-dynamic.component';
import { DatePipe } from '@angular/common';
declare var $: any
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

  isSpinnerVisible:boolean=true;
  auxonetworkactiveaccount:number;
  auxonetworkinactiveaccount:number;
  adsenseactiveaccount:number;
  adsenseinactiveaccount:number;
  adxnewaccount:number;
  adsensenewaccount:number;
  Top20Date: string;
  Top20DateAds: string;
  AdxMoversDate: string;
  AdsMoversDate: string;
  tablerootdata = [];
  managerList: [];
  list: [{"name":"","pub_id":"","child_net_code":""}];
  pubList: [{"name":"","pub_id":"","child_net_code":""}];
  managerValue: number;
  isSpinnerVisiblePre:boolean=false;
  public form: FormGroup = Object.create(null);
  // expandable table account manager start
  expandContent = true;
  

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

  constructor(private fb: FormBuilder,breakpointObserver: BreakpointObserver,private _adminService:AdminOverviewService,public dialog: MatDialog,private datePipe: DatePipe) {


this.form = this.fb.group({
      accounts: [''],
      manager_ids: [''],
      pub_ids: [''],
      days: [''],
      strtdate: [''],
      enddate: ['']
    })
  //adx
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


    breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns3 = result.matches ?
        ['name', 'website', 'earning30', 'earning90', 'date'] :
        ['name', 'website', 'earning30', 'earning90', 'date'];
    });
//adx end

//adsense

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

 //adsense end  

 //overview

 breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns52 = result.matches ?
        ['acmanager', 'email', 'adx', 'adsense', 'tpublisher', 'onboard'] :
        ['acmanager', 'email', 'adx', 'adsense', 'tpublisher', 'onboard'] ;
    });
 breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns53 = result.matches ?
        ['name', 'auxorev', 'adsenserev', 'tpublisher'] :
        ['name', 'auxorev', 'adsenserev', 'tpublisher'] ;
    });
    
  }

  ngOnInit(): void {
   this._adminService.getAccountsHandlingData(localStorage.getItem('uniq_id')).subscribe((response)=>{
           
           if(response['status_code']=='200'){

                
                 this.auxonetworkactiveaccount = +response['data'][0]['auxonetworkactiveaccount'];
                           
                 this.auxonetworkinactiveaccount = +response['data'][0]['auxonetworkinactiveaccount'];          
                 this.adsenseactiveaccount = +response['data'][0]['adsenseactiveaccount'];          
                 this.adsenseinactiveaccount = +response['data'][0]['adsenseinactiveaccount'];

                 this.adxnewaccount = +response['adx'];          
                 this.adsensenewaccount = +response['ads'];          
                           
                 this.isSpinnerVisible = false;
               }
             else if(response['status_code']=='422'){
                 //this.message = response['message'];
                 this.isSpinnerVisible = false;
               }   
            else{
                this.isSpinnerVisible = false;
               
               
               }
            
          })

       //API For ADX TOP 30, Movers and Inactive
        this._adminService.getAdxMovData(localStorage.getItem('uniq_id')).subscribe((response)=>{
           
           if(response['status_code']=='200')
              {

                 this.Top20Date =  response['data']['Top30Date'];
                 this.AdxMoversDate =  response['data']['AdxMoversDate'];
                 this.dataSource1 = new MatTableDataSource(response['data']['Top30']);
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
               }
            
          })

        //API For ADsense TOP 30, Movers and Inactive
        this._adminService.getAdsMovData(localStorage.getItem('uniq_id')).subscribe((response)=>{
           
          if(response['status_code']=='200'){
                 this.Top20DateAds =  response['data']['Top30DateAds'];
                 this.AdsMoversDate =  response['data']['AdsMoversDate'];
                 this.dataSource5 = new MatTableDataSource(response['data']['Top30']);
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
              
               }
            
          })

        //api for account manager section
         this._adminService.getAccManagerData(localStorage.getItem('uniq_id'))
            .subscribe(dataResult => {
             
                if(dataResult['status_code']=='200'){
                    
                    this.tablerootdata = dataResult['data']["accmngr_table_data"];
                    
                    this.isSpinnerVisible = false;
                }else if(dataResult['status_code']=='422'){

                  //this.message = dataResult['message']; 
                   this.isSpinnerVisible = false;
               }else{
                    
                   this.isSpinnerVisible = false;    
                }
                
            });


        //API overview
        this._adminService.getOverviewData(localStorage.getItem('uniq_id'),'NULL','no','NULL','NULL','NULL','NULL','NULL').subscribe((response)=>{

           
          if(response['status_code']=='200'){                
                 this.dataSource52 = new MatTableDataSource(response['data']['Defaultoverview']);
                 this.managerList = response['manager_list'];
                  
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

 findDetails(data) {
      const filterdata = this.tablerootdata.filter(y => y.manager_name === data.manager_name);
      return filterdata[0].innerdata;
    }

 accmanagerChange(managerId){
    this.managerValue = managerId.value;
       
    //API For overview
    this._adminService.getOverviewData(localStorage.getItem('uniq_id'),this.managerValue,'no','NULL','NULL','NULL','NULL','NULL').subscribe((response)=>{
      if(response['status_code']=='200'){
        
          
        this.list = response['data']['pub_list'];
        //this.pubList =[];
        this.pubList = this.list;
        this.isSpinnerVisible = false;
      }else if(response['status_code']=='422'){
        this.isSpinnerVisible = false;
      }else{
        this.isSpinnerVisible = false;
      }
    })
  }

//overview filter function
  goFilters(){
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

    const manager_ids =  this.form.value.manager_ids == '' ? 'NULL':this.form.value.manager_ids;
    const days =  this.form.value.days == '' ? 'NULL':this.form.value.days;
    const strtdatenew = this.form.value.strtdate == '' ? 'NULL': this.form.value.strtdate;
    const enddatenew = this.form.value.enddate == '' ? 'NULL': this.form.value.enddate;
    console.log(manager_ids);
    //API For overview
    this._adminService.getOverviewData(localStorage.getItem('uniq_id'), manager_ids, 'yes', child_net_code,accounts,days,strtdatenew,enddatenew).subscribe((response)=>{

      console.log(response['data']['filterData']);  
      if(response['status_code']=='200'){
        $("#defaultOverview").hide();
        $("#filterOverview").show();
        this.dataSource53 = new MatTableDataSource(response['data']['filterData']);
        this.isSpinnerVisiblePre = false;
      }else{
        this.isSpinnerVisiblePre = false;               
      }
    })
  }

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

  displayedColumns3 = ['name', 'website', 'earning30', 'earning90', 'date'];
  dataSource3:MatTableDataSource<Element3[]>;
//adx end


//adsense
  displayedColumns5 = ['name', 'adr', 'adimr', 'covg', 'ecpm', 'revenue'];
  dataSource5 : MatTableDataSource<Element5[]>;

  displayedColumns15 = ['name', 'website', 'earning30', 'earning90', 'date'];
  dataSource15:MatTableDataSource<Element15[]>;

  
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
//adsense end

//overview
displayedColumns52 = ['acmanager', 'email', 'adx', 'adsense', 'tpublisher', 'onboard'];
dataSource52 :MatTableDataSource<Element52[]>;
 
//filter
displayedColumns53 = ['name', 'auxorev', 'adsenserev', 'tpublisher'];
dataSource53 :MatTableDataSource<Element53[]>; 
}

export interface Element52 {
  acmanager: string;
  email: string;
  adx: string;
  adsense: string;
  tpublisher: string;
  onboard: string;
}

export interface Element53 {
  name: string;
  auxorev: number;
  adsenserev: string;
  tpublisher: string;
  
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
export interface Element3 {
  name: string;
  website: string;
  earning30: string;
  earning90: string;
  date: string;
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

// const ELEMENT_DATA52: Element52[] = [
//   {acmanager: "4CPlus 4CPlus", email: "kshitij@4cplus.com", adx: "22", adsense: "0", cdma: "0", tpublisher: "22", onboard: "22 Mar, 2022"},
//   {acmanager: "4CPlus 4CPlus", email: "kshitij@4cplus.com", adx: "22", adsense: "0", cdma: "0", tpublisher: "22", onboard: "22 Mar, 2022"},
//   {acmanager: "4CPlus 4CPlus", email: "kshitij@4cplus.com", adx: "22", adsense: "0", cdma: "0", tpublisher: "22", onboard: "22 Mar, 2022"},
// ];

