import { Component, OnInit, ViewEncapsulation, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions, TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { SalesUserservice } from './sales-users-detailed-dashboard.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SalesDialogDynamicComponent } from '../sales-dialog-dynamic/sales-dialog-dynamic.component';
declare var $: any;
@Component({
  selector: 'app-sales-users-detailed-dashboard',
  templateUrl: './sales-users-detailed-dashboard.component.html',
  styleUrls: ['./sales-users-detailed-dashboard.component.scss'],
})

export class SalesUsersDetailedDashboardComponent implements OnInit {

  public message:any;
  QTD_Onboardings:any;
  QTD_Top_Line:any ;
  QTD_Bottom_Line:any;
  QTD_dis_app_vid:any;
  QTD_dom_inte:any;
  dateOverall:any;
  dateEarn:any;
  isSpinnerVisible: boolean = false;
  displayedColumns1 = [];
  dataSource1: MatTableDataSource<Element1>;
  displayedColumns2 = [];
  dataSource2:MatTableDataSource<Element2>;
  constructor(breakpointObserver: BreakpointObserver, private location: Location,  private router: Router, private _salesUserService: SalesUserservice, public dialog: MatDialog) {
   

    breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns1 = result.matches ?
        ['position1', 'name1', 'weight1', 'coverage1'] :
        ['position1', 'name1', 'weight1', 'coverage1',];
    });

    breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns2 = result.matches ?
        ['position2', 'weight2', 'variation2'] :
        ['position2', 'weight2', 'variation2'];
    });
  }

  ngOnInit(): void {
    this.init();
  }

  backPage(){
    this.location.back();
  }

  init() {
    let url = this.router.url;
    const subUrlLink = url.split('/');

    this.isSpinnerVisible = true;
      //API Central - Detailed Dashboard
        this._salesUserService.getSaleDetailedData(localStorage.getItem('uniq_id'),subUrlLink[3]).subscribe(dataResult => {
          
      if (dataResult['status_code'] == '200') {
          this.QTD_Onboardings = dataResult['data']['QTD Onboardings'][0]['onboarding'];
          this.QTD_Top_Line = dataResult['data']['QTD Top Line'];
          this.QTD_Bottom_Line = dataResult['data']['QTD Bottom Line'];
          this.QTD_dis_app_vid = dataResult['data']['QTD display/app/video']+ '\n' +'/$'+ dataResult['data']['QTD app']+ '\n'+'/$'+ dataResult['data']['QTD video'];
          this.QTD_dom_inte =   dataResult['data']['QTD Domestic/Inter']+ '\n' +'/$'+dataResult['data']['QTD Inter'];
          this.isSpinnerVisible = false;
      } else {
          this.message = "No Data Found";
          this.dialog.open(SalesDialogDynamicComponent,
              {
                  width: '450px',
                  data: { message: this.message }
              });
          this.isSpinnerVisible = false;
          }
      });

      //API Overall Earnings Estimates
      
      this._salesUserService.getOverallEarnData(localStorage.getItem('uniq_id'),localStorage.getItem('startdate'),localStorage.getItem('enddate'),subUrlLink[3]).subscribe(dataRes => {
          
      if (dataRes['status_code'] == '200') {
          this.dataSource1 = new MatTableDataSource(dataRes['data']);
          this.dateEarn = dataRes['date'];
          this.isSpinnerVisible = false;
      } else {
          this.message = "No Data Found";
          this.dialog.open(SalesDialogDynamicComponent,
              {
                  width: '450px',
                  data: { message: this.message }
              });
          this.isSpinnerVisible = false;
          }
      });


      //API Overall Publisher Earnings
      
      this._salesUserService.getOverallPubEarnData(localStorage.getItem('uniq_id'),localStorage.getItem('startdate'),localStorage.getItem('enddate'),subUrlLink[3]).subscribe(dataRes => {
          
      if (dataRes['status_code'] == '200') {
          this.dataSource2 = new MatTableDataSource(dataRes['data']);
          this.dateOverall = dataRes['date'];
          this.isSpinnerVisible = false;
      } else {
          this.message = "No Data Found";
          this.dialog.open(SalesDialogDynamicComponent,
              {
                  width: '450px',
                  data: { message: this.message }
              });
          this.isSpinnerVisible = false;
          }
      });   
  }


  


}

export interface Element1 {
  name: string;
  Topline: string;
  Bottomline: string;
  NetBreakup: string;
}

export interface Element2 {
  PublisherName: string;
  Topline: string;
  Bottomline: string;
}




