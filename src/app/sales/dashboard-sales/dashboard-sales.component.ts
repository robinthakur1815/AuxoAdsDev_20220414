import { Component, OnInit, ViewEncapsulation, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Chart } from 'angular-highcharts';
import Highcharts from 'highcharts';
import { MatTableDataSource } from '@angular/material/table';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions, TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';
import { SalesDashboardservice } from './dashboard-sales.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SalesDialogDynamicComponent } from '../sales-dialog-dynamic/sales-dialog-dynamic.component';
import { saveAs } from 'file-saver';
import { AppSettings } from '../../global/app-url';
declare var $: any;
// Tooltip start
export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 1000,
  hideDelay: 1000,
  touchendHideDelay: 1000,
};
// tool tip end

@Component({
  selector: 'app-dashboard-sales',
  templateUrl: './dashboard-sales.component.html',
  styleUrls: ['./dashboard-sales.component.scss'],
  // Tooltip start
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults }
  ],
  // tool tip end
})

export class DashboardSalesComponent implements OnInit {
  public message:any;
  isSpinnerVisible: boolean = false;
  dateOverall:any;
  dateEarn:any;
  dateOverview:any;
  dateNetRevenue:any;
  dateRoi:any;
  dateAcc:any;
  displayedColumns1 = [];
  dataSource1: MatTableDataSource<Element1>;
  displayedColumns2 = [];
  dataSource2:MatTableDataSource<Element2>;
  displayedColumns3 = [];
  dataSource3:MatTableDataSource<Element3>;
  role_id = localStorage.getItem('role_id');
  adminMenu:boolean=false;
  QTD_Onboardings:any;
  QTD_Top_Line:any ;
  QTD_Bottom_Line:any;
  QTD_dis_app_vid:any;
  QTD_dom_inte:any;
  
  public dashboardsales1: any;
  public dashboardsales2: any;
  public dashboardsales3: any;

  // Tooltip start
  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  showDelay = new FormControl(1000);
  hideDelay = new FormControl(2000);

  disabled = new FormControl(true);

  message1 = new FormControl('Info about the action');

  position1 = new FormControl(this.positionOptions[0]);
  // Tooltip end

  constructor(breakpointObserver: BreakpointObserver, private _salesDashService: SalesDashboardservice, public dialog: MatDialog) {
    Highcharts.setOptions({
      lang: {
        thousandsSep: ','
    }
  });

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

    breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns3 = result.matches ?
        ['name', 'website', 'earning30', 'earning90'] :
        ['name', 'website', 'earning30', 'earning90'];
    });

    }
NetRevGraph(data){
  this.dashboardsales1 = new Chart({
      chart: {
        type: 'pie',
        backgroundColor: 'transparent',
        marginTop: 30,
        style: {
          fontFamily: 'Noto sans KR',
        },
        options3d: {
          enabled: false,
          alpha: 45,
        }
      },
      title: {
        text: ''
      },

      colors: ['#29a3fb', '#ffa115', '#27cb71e3', '#8d70fa', '#e94265', '#a9a9a9', '#22c6db'],

      tooltip: {
        valueSuffix: ' % of Total',
        // pointFormat: '<span style="color:{point.color}">●</span> {series.name}: <b>{point.y:,.0f}</b>   </br><span style="color:{point.color}">●</span> Earnings: <b>${point.y:,.0f}</b>     </br><span style="color:{point.color}">●</span> CPM: <b>${point.y:,.0f}</b>',
        // pointFormat: '<span style="color:{point.color}">●</span> {series.name} %: <b>{point.percentage:.1f} %</b></br><span style="color:{point.color}">●</span> {point.name} Users: <b>{point.y:,.0f}</b>'  

      },

      exporting: {
        enabled: false
      },

      credits: {
        enabled: false
      },

      plotOptions: {
        pie: {
          allowPointSelect: true,
          innerSize: 100,
          depth: 45,
          dataLabels: {
            enabled: false
          },
          showInLegend: true

        }
      },

      legend: {
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'bottom',
        enabled: true,
        y: 0,
        padding: 10,
        itemMarginTop: 15,
        itemMarginBottom: -15,

        itemStyle: {
          lineHeight: '14px'
        }
      },

      series: [{
        name: 'Breakup',
        type: 'pie',
        data: data,
      }]
    });
}

RoiChanGraph(data){


    // Dashboard2 chart start
    this.dashboardsales2 = new Chart({
      chart: {
        marginTop: 30,
        marginLeft: 7,
        plotShadow: false,
        type: 'pie',
        style: {
          fontFamily: 'Noto sans KR',
        }
      },

      colors: ['#29a3fb', '#ffa115', '#27cb71e3', '#8d70fa', '#e94265', '#a9a9a9', '#22c6db'],

      title: {
        text: ''
      },

      exporting: {
        enabled: false
      },

      credits: {
        enabled: false
      },

      tooltip: {
        valueSuffix: ' % of Total',
        // pointFormat: '<span style="color:{point.color}">●</span> {series.name}: <b>{point.y:,.0f}</b>   </br><span style="color:{point.color}">●</span> Earnings: <b>${point.y:,.0f}</b>     </br><span style="color:{point.color}">●</span> CPM: <b>${point.y:,.0f}</b>',
        // pointFormat: '<span style="color:{point.color}">●</span> {series.name} %: <b>{point.percentage:.1f} %</b></br><span style="color:{point.color}">●</span> {point.name} Users: <b>{point.y:,.0f}</b>'  

      },

      legend: {
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'bottom',
        y: 0,
        padding: 10,
        itemMarginTop: 15,
        itemMarginBottom: -15,
        itemStyle: {
          lineHeight: '14px'
        }
      },


      plotOptions: {
        pie: {
          allowPointSelect: true,
          dataLabels: {
            enabled: false
          },
          showInLegend: true
        }
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },

      series: [{
        name: 'Breakup',
        colorByPoint: true,
        type: 'pie',
        allowPointSelect: true,
        keys: ['name', 'y', 'selected', 'sliced'],
        data: data,
        showInLegend: true
      }]

    });

}
AdxAccWiseGraph(dom,inter){
  
    // Dashboard3 chart start
    this.dashboardsales3 = new Chart({
      chart: {
        marginTop: 30,
        marginRight: 25,
        // marginLeft: 65,
        zoomType: 'xy',
        style: {
          fontFamily: 'Noto sans KR',
        }
        //     scrollablePlotArea: {
        //     minWidth: 600,
        //     scrollPositionX: 1,
        //     opacity: 0
        // }
      },

      colors: ['#29a3fb', '#ffa115', '#27cb71e3', '#8d70fa', '#e94265', '#a9a9a9', '#22c6db'],

      title: {
        text: ''
      },

      exporting: {
        enabled: false
      },

      credits: {
        enabled: false
      },

      xAxis: [{
        categories: ['Top Line', 'Bottom Line'],
        crosshair: true
      }],


      yAxis: [
        {
          labels: {
            // format: '{value} %'
          },
          title: {
            text: 'Revenue ($)',
          },
        }],


      tooltip: {
        valuePrefix: '$',   
        shared: true
      },

      plotOptions: {
        area: {
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },
            stops: [
              // [0, Highcharts.getOptions().colors[0]],
              // [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
            ]
          },
        }
      },

      legend: {
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'bottom',
        y: 0,
        padding: 3,
        itemMarginTop: 10,
        itemMarginBottom: -10,
        itemStyle: {
          lineHeight: '14px'
        }
      },

      series: [{
        name: 'Domestic',
        type: 'column',
        data: dom,
        // tooltip: {
        //     valueSuffix: ' $'
        // }
      },
      {
        name: 'International',
        type: 'column',
        data: inter,
        // tooltip: {
        //     valueSuffix: ' %'
        // }
      },
      ]
    });
}
  ngOnInit(): void {
    this.init();
  }
downloadoverall(){
  //api
      
        this._salesDashService.getOverallDownloadData(localStorage.getItem('uniq_id'),localStorage.getItem('startdate'),localStorage.getItem('enddate')).subscribe(dataResult => {

                if (dataResult['status_code'] == '200') {
                    const fileName = dataResult['data'];
                    const fileUrl = AppSettings.API_STARTPOINT + '/assets/api/admin/sales/upload/' + fileName;

                    saveAs(fileUrl, fileName);
                } else if (dataResult['status_code'] == '422') {

                    this.message = dataResult['message'];
                    this.dialog.open(SalesDialogDynamicComponent,

                        {
                            width: '450px',
                            data: { message: this.message }
                        });


                } else {
                    this.message = "Something went wrong";
                    this.dialog.open(SalesDialogDynamicComponent,

                        {
                            width: '450px',
                            data: { message: this.message }
                        });

                }

            })
}
downloadSales(){
  //api
        this._salesDashService.getSalesDownloadData(localStorage.getItem('uniq_id'),localStorage.getItem('startdate'),localStorage.getItem('enddate')).subscribe(dataResult => {

                if (dataResult['status_code'] == '200') {
                    const fileName = dataResult['data'];
                    const fileUrl = AppSettings.API_STARTPOINT + '/assets/api/admin/sales/upload/' + fileName;

                    saveAs(fileUrl, fileName);
                } else if (dataResult['status_code'] == '422') {

                    this.message = dataResult['message'];
                    this.dialog.open(SalesDialogDynamicComponent,

                        {
                            width: '450px',
                            data: { message: this.message }
                        });


                } else {
                    this.message = "Something went wrong";
                    this.dialog.open(SalesDialogDynamicComponent,

                        {
                            width: '450px',
                            data: { message: this.message }
                        });

                }

            })
}

downloadpubrev(){
  //api
      
        this._salesDashService.getPubDownloadData(localStorage.getItem('uniq_id'),localStorage.getItem('startdate'),localStorage.getItem('enddate')).subscribe(dataResult => {

                if (dataResult['status_code'] == '200') {
                    const fileName = dataResult['data'];
                    const fileUrl = AppSettings.API_STARTPOINT + '/assets/api/admin/sales/upload/' + fileName;

                    saveAs(fileUrl, fileName);
                } else if (dataResult['status_code'] == '422') {

                    this.message = dataResult['message'];
                    this.dialog.open(SalesDialogDynamicComponent,

                        {
                            width: '450px',
                            data: { message: this.message }
                        });


                } else {
                    this.message = "Something went wrong";
                    this.dialog.open(SalesDialogDynamicComponent,

                        {
                            width: '450px',
                            data: { message: this.message }
                        });

                }

            })
}
  init() {
    this.isSpinnerVisible = true; 

    //API Overall - Quaterly Performance
        this._salesDashService.getQtdPerformance(localStorage.getItem('uniq_id')).subscribe(dataResult => {
          
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
      
      this._salesDashService.getOverallEarnData(localStorage.getItem('uniq_id'),localStorage.getItem('startdate'),localStorage.getItem('enddate')).subscribe(dataRes => {
          
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
      
      this._salesDashService.getOverallPubEarnData(localStorage.getItem('uniq_id'),localStorage.getItem('startdate'),localStorage.getItem('enddate')).subscribe(dataRes => {
          
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

     if(this.role_id == "7"){ 

       this.adminMenu = true;
      //API Sales Team Overview
      
      this._salesDashService.getSalesTeamOverviewData(localStorage.getItem('uniq_id'),localStorage.getItem('startdate'),localStorage.getItem('enddate')).subscribe(dataRes => {
          
      if (dataRes['status_code'] == '200') {
          this.dataSource3 = new MatTableDataSource(dataRes['data']);
          this.dateOverview = dataRes['date'];
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


      //API Break up of net revenue
      
      this._salesDashService.getSalesNetRevData(localStorage.getItem('uniq_id'),localStorage.getItem('startdate'),localStorage.getItem('enddate')).subscribe(dataRes => {
          
      if (dataRes['status_code'] == '200') {
        
          this.NetRevGraph(dataRes['data']);
          this.dateNetRevenue = dataRes['date'];
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

      //API ROI Channel
      
      this._salesDashService.getSalesChanRevData(localStorage.getItem('uniq_id'),localStorage.getItem('startdate'),localStorage.getItem('enddate')).subscribe(dataRes => {
          
      if (dataRes['status_code'] == '200') {
        
          this.RoiChanGraph(dataRes['data']);
          this.dateRoi = dataRes['date'];
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


      //API Adx Account wise
      
      this._salesDashService.getAdxAccountWiseData(localStorage.getItem('uniq_id'),localStorage.getItem('startdate'),localStorage.getItem('enddate')).subscribe(dataRes => {
          
      if (dataRes['status_code'] == '200') {
        
          this.AdxAccWiseGraph(dataRes['domestic'],dataRes['International']);
          this.dateAcc = dataRes['date'];
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

     } //role if end
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

export interface Element3 {
  PublisherName: string;
  Topline: string;
  Bottomline: string;
  Active: string;
}





