import { Component, OnInit, ViewEncapsulation,ElementRef } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { MatTableDataSource } from '@angular/material/table';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions, TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { KeyinsightsContentPerformanceService } from './keyinsights-content-performance.service';
declare var $: any;
import { DialogDynamicComponent } from '../dialog-dynamic/dialog-dynamic.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { saveAs } from 'file-saver';
import { AppSettings } from '../../global/app-url';
import Highcharts from 'highcharts';
import { Router } from '@angular/router';



// Tooltip start
export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 1000,
  hideDelay: 1000,
  touchendHideDelay: 1000,
};
// tool tip end

@Component({
  selector: 'app-keyinsights-content-performance',
  templateUrl: './keyinsights-content-performance.component.html',
  styleUrls: ['./keyinsights-content-performance.component.scss'],
  // Tooltip start
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults }
  ],
  // tool tip end
})

export class KeyinsightsContentPerformanceComponent implements OnInit {
  // Tooltip start
  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  showDelay = new FormControl(1000);
  hideDelay = new FormControl(2000);

  disabled = new FormControl(true);

  message = new FormControl('Info about the action');


  position1 = new FormControl(this.positionOptions[0]);
  // Tooltip end 
  public isSpinnerVisible1: boolean = true;
  public isSpinnerVisible2: boolean = true;
  public isSpinnerVisibleheatMap:boolean =false;
  messageDialog: string;
  date: string;
  date_highbounce: string;
  date_heatmap:string;
  messageForDialog: string;
  public top7tabledata = [];

  landing_daterange: string;
  tot_landing_Pageviews: any;
  tot_landing_Avgsession: any;
  tot_landing_Avgbounce: any;
  landing_graph_cate: any;
  landing_graph_pageview: any;
  landing_graph_exit: any;
  landing_graph_exit_page: any;

  exit_daterange: string;
  tot_exit_Pageviews: any;
  tot_exit_Avgsession: any;
  tot_exit_exitPageviews: any;
  exit_graph_cate: any;
  exit_graph_pageview: any;
  exit_graph_exit: any;
  exit_graph_exit_page: any;

  heatgrapthdata:any;
  heatgrapthdateX:any;
  public errorMsg;
  public cione: any;
  public citwo: any;
  heatmapchart: Chart;
  constructor(breakpointObserver: BreakpointObserver, private _contentPerformanceService: KeyinsightsContentPerformanceService, private datePipe: DatePipe, public dialog: MatDialog,private el: ElementRef,private router: Router) {
    Highcharts.setOptions({
      lang: {
        thousandsSep: ','
      }
    })





    breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns = result.matches ?
        ['position', 'name', 'weight', 'symbol'] :
        ['position', 'name', 'weight', 'symbol'];
    });

    breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns1 = result.matches ?
        ['position1', 'name1', 'weight1'] :
        ['position1', 'name1', 'weight1'];
    });

    breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns2 = result.matches ?
        ['position2'] :
        ['position2'];
    });
  }

  //cione chart1 landingpage start 
  landingPageAnalysisGrapth(a, b, c, d) {


    this.cione = new Chart({
      chart: {
        marginTop: 30,
        // marginRight:20,
        // marginLeft: 65,
        zoomType: 'xy',
        style: {
          fontFamily: 'Noto sans KR',
        },

        // scrollablePlotArea: {
        //   minWidth: 500,
        //   scrollPositionY: 0,
        //   scrollPositionX: 0,
        //   opacity: 1
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

        categories: a,
        crosshair: true,
        title: {
        }
      }],


      /*existing Auxo Ads code*/
      yAxis: [{ // Primary yAxis
        labels: {
          format: '{value} %',
        },
        title: {
          text: 'Bounce Rate',
        },
        opposite: true

      }, { // Secondary yAxis
        gridLineWidth: 0,
        title: {
          text: 'PageViews',
        },
        labels: {
          format: '{value}',
        }

      }, { // Tertiary yAxis
        gridLineWidth: 0,
        title: {
          text: 'Session Duration',
        },
        labels: {
          format: '{value} Sec',
        },
        opposite: true
      }],

      tooltip: {
        // valuePrefix: '$',
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
        itemMarginTop: 8,
        itemMarginBottom: -10,
        itemStyle: {
          lineHeight: '14px'
        }
      },
      series: [{
        name: 'PageViews',
        type: 'column',
        yAxis: 1,
        data: b,
        // data: [176, 100, 80, 80, 100, 80, 55, 55, 60, 59],
        // tooltip: {
        //     valueSuffix: ' mm'
        // }

      }, {
        name: 'Session Duration',
        type: 'area',
        yAxis: 2,
        marker: {
          enabled: false,
          symbol: 'circle'
        },
        data: c,
        // data: [4, 1, 9, 8, 7, 6, 5, 4, 3, 3],
        tooltip: {
          valueSuffix: ' Sec'
        }
      },
      {
        name: 'Bounce Rate',
        type: 'area',
        marker: {
          enabled: false,
          symbol: 'circle'
        },
        data: d,
        // data: [14.1, 11.1, 13.2, 11.5, 13.4, 19.7, 80.4, 60.1, 90.1, 92.1],
        tooltip: {
          valueSuffix: ' %'
        }
      }]

    });
  }

  exitPageAnalysisGrapth(a, b, c, d) {
    //citwo chart2 Exitgpage start
    this.citwo = new Chart({
      chart: {
        marginTop: 30,
        // marginRight:20,
        // marginLeft: 65,
        zoomType: 'xy',
        style: {
          fontFamily: 'Noto sans KR',
        },
        // scrollablePlotArea: {
        //   minWidth: 500,
        //   scrollPositionY: 0,
        //   scrollPositionX: 0,
        //   opacity: 1
        // },
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

        categories: a,
        crosshair: true,
        title: {
        }
      }],



      yAxis: [{
        labels: {
          format: '{value}%',
        },
        title: {
          text: 'Exits / PageViews',
        },
        opposite: true

      }, {
        gridLineWidth: 0,
        title: {
          text: 'PageViews',
        },
        labels: {
          format: '{value}',
        }

      }, {
        gridLineWidth: 0,
        title: {
          text: 'Exits',
        },
        labels: {
          format: '{value}',
        },
        opposite: true
      }],

      tooltip: {

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
        itemMarginTop: 8,
        itemMarginBottom: -10,
        itemStyle: {
          lineHeight: '14px'
        }
      },
      series: [{
        name: 'PageViews',
        type: 'column',
        yAxis: 1,
        data: b,
        // data: [176, 100, 80, 80, 100, 80, 55, 55, 60, 59],
        // tooltip: {
        //     valueSuffix: ' mm'
        // }

      }, {
        name: 'Exits',
        type: 'area',
        yAxis: 2,
        marker: {
          enabled: false,
          symbol: 'circle'
        },
        data: c,
        // data: [44.1, 18.2, 90.6, 80.5, 70.4, 60.1, 50.6, 40.6, 30.8, 31.2],
        // tooltip: {
        //     valueSuffix: '°C'
        // }
      },
      {
        name: 'Exits / PageViews',
        type: 'area',
        marker: {
          enabled: false,
          symbol: 'circle'
        },
        data: d,
        // data: [14.1, 11.1, 13.2, 11.5, 13.4, 19.7, 80.4, 60.1, 90.1, 92.1],
        tooltip: {
          valueSuffix: ' %'
        }
      }]
    });

  }



  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  dataSource: MatTableDataSource<Element[]>;

  displayedColumns1 = ['position1', 'name1', 'weight1'];
  dataSource1: MatTableDataSource<Element1[]>;

  displayedColumns2 = ['position2'];
  dataSource2: MatTableDataSource<Element2[]>;
  //  Highmaps chart start
  ngOnInit(): void {
    
    this._contentPerformanceService.getcontentPerformanceService(localStorage.getItem('anlytic_id'), localStorage.getItem('child_net_code'), localStorage.getItem('uniq_id'))
      .subscribe(dataResult => {

        if (dataResult['status_code'] == '200') {
          this.date = dataResult['data']['section1']["daterange"];
          this.date_highbounce = dataResult['data']['section2']["daterange_highbounce"];
          this.dataSource = new MatTableDataSource(dataResult['data']['section1']["top_landingpage"]);
          // this.top7tabledata = dataResult['data']['section1']["top_7landingpage"];
          this.dataSource2 = new MatTableDataSource(dataResult['data']['section1']["top_7landingpage"]);
          this.dataSource1 = new MatTableDataSource(dataResult['data']['section2']["tabledata_lp_highbounce"]);

          /*Landing Page Analysis Top 10 start*/
          this.landing_daterange = dataResult['data']['section2']['topdata']["landing_daterange"];
          this.tot_landing_Pageviews = dataResult['data']['section2']['topdata']["Pageviews"];
          this.tot_landing_Avgsession = dataResult['data']['section2']['topdata']["Avgsession"];
          this.tot_landing_Avgbounce = dataResult['data']['section2']['topdata']["Avgbounce"];

          this.landing_graph_cate = dataResult['data']['section2']['categories'];
          this.landing_graph_pageview = dataResult['data']['section2']['pageviews'];
          this.landing_graph_exit = dataResult['data']['section2']['session'];
          this.landing_graph_exit_page = dataResult['data']['section2']['bounce'];
          this.landingPageAnalysisGrapth(this.landing_graph_cate, this.landing_graph_pageview, this.landing_graph_exit, this.landing_graph_exit_page);
          /*Landing Page Analysis Top 10 end */

          this.exit_daterange = dataResult['data']['section2']['exit_topdata']["exit_daterange"];
          this.tot_exit_Pageviews = dataResult['data']['section2']['exit_topdata']["exit_Pageviews"];
          this.tot_exit_Avgsession = dataResult['data']['section2']['exit_topdata']["exit_Exits"];
          this.tot_exit_exitPageviews = dataResult['data']['section2']['exit_topdata']["exit_AvgExits"];

          this.exit_graph_cate = dataResult['data']['section2']["exit_categories"];
          this.exit_graph_pageview = dataResult['data']['section2']["exit_pageviews"];
          this.exit_graph_exit = dataResult['data']['section2']["exit_exits"];
          this.exit_graph_exit_page = dataResult['data']['section2']["exit_exitsperpageview"];
          this.exitPageAnalysisGrapth(this.exit_graph_cate, this.exit_graph_pageview, this.exit_graph_exit, this.exit_graph_exit_page);

          this.isSpinnerVisible1 = false;
        } else if (dataResult['status_code'] == '422') {
          this.messageDialog = dataResult['message'];
          this.dialog.open(DialogDynamicComponent,
            {
              width: '450px',
              data: { message: this.messageDialog }
            });

          this.isSpinnerVisible1 = false;
        } else {
          this.messageDialog = "Something went wrong";
          this.dialog.open(DialogDynamicComponent,
            {
              width: '450px',
              data: { message: this.messageDialog }
            });
          this.isSpinnerVisible1 = false;
        }

      });

      this._contentPerformanceService.getheatmapdatawithurl(localStorage.getItem('anlytic_id'), localStorage.getItem('child_net_code'), localStorage.getItem('uniq_id'))
      .subscribe(dataheatResult => {
        if (dataheatResult['status_code'] == '200') {
          this.top7tabledata = dataheatResult['data']['result'];
          this.heatgrapthdata = dataheatResult['data']['graphData']['heatmapdata'];
          this.heatgrapthdateX = dataheatResult['data']['graphData']['date'];
          this.date_heatmap = dataheatResult['data']['graphData']['date_heatmap'];
          this.heatmapGrapth(this.heatgrapthdata,this.heatgrapthdateX);
          this.isSpinnerVisible2 = false;
        }else if (dataheatResult['status_code'] == '422') {
          this.messageDialog = dataheatResult['message'];
          this.dialog.open(DialogDynamicComponent,
            {
              width: '450px',
              data: { message: this.messageDialog }
            });

          this.isSpinnerVisible2 = false;
        } else {
          this.messageDialog = "Something went wrong";
          this.dialog.open(DialogDynamicComponent,
            {
              width: '450px',
              data: { message: this.messageDialog }
            });
          this.isSpinnerVisible2 = false;
        }
        
      });
  }

  //  Highmaps chart start
  heatmapGrapth(heatmapdata,heatgrapthdateX) {
    let heatmapchart = new Chart({
      chart: {
        type: 'heatmap',
        marginTop: 55,
        marginBottom: 80,
        plotBorderWidth: 0,
        style: {
          fontFamily: 'Noto sans KR',
        },
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
        // categories: ["08 Dec", "07 Dec", "06 Dec", "05 Dec", "04 Dec", "03 Dec", "02 Dec"],
        categories:heatgrapthdateX,
        title: null,
        gridLineColor: 'transparent',
      }],


      yAxis: {
        categories: ['0', '10 PM', '08 PM', '06 PM', '04 PM', '02 PM', '12 PM', '10 AM', '08 AM', '06 AM', '04 AM', '02 AM', '12 AM'],
        reversed: true,
        title: null,
        gridLineColor: 'transparent',
        opposite: true,
        labels: {
          style: {
            fontFamily: 'Noto sans KR',
          }
        }
      },

      colorAxis: {
        stops: [
          [0, '#b8dbf4'],
          [0.5, '#29a3fb'],
          [0.9, '#0274d8']
        ],
        min: 5,
      },


      tooltip: {
        formatter: function () {
          return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> Earnings <br><b>' +
            this.point.value + '</b>$ on <br><b>' + this.series.yAxis.categories[this.point.y] + '</b>';
        },
        enabled: false,
      },


      legend: {
        enabled: true,
        padding: 10,
        verticalAlign: 'bottom',
        align: 'center',
        symbolWidth: 400,
        layout: 'horizontal',
        y: 25,
        x: 0,
        symbolHeight: 8
      },


      series: [
        {
          name: 'monday',
          type: 'heatmap',
          borderWidth: 1,
          borderColor: '#fff',
          data: heatmapdata
        },
      ],
    });

    this.heatmapchart = heatmapchart;
  }

  // Highmaps chart end

  heatmapchange(path:any,index:any){
    $("#heapmaprowClass").find('.buttonActive').removeClass('buttonActive');

    let myTag1 = this.el.nativeElement.querySelector(".countrow"+index);
    myTag1.classList.add('buttonActive');


    this.isSpinnerVisibleheatMap = true;
    this._contentPerformanceService.getheatmapdata(localStorage.getItem('anlytic_id'), path, localStorage.getItem('uniq_id'))
      .subscribe(dataheatResult => {
        if (dataheatResult['status_code'] == '200') {
          this.heatgrapthdata = dataheatResult['data']['graphData']['heatmapdata'];
          this.heatgrapthdateX = dataheatResult['data']['graphData']['date'];
          this.heatmapGrapth(this.heatgrapthdata,this.heatgrapthdateX);
          this.isSpinnerVisibleheatMap = false;
        }else if (dataheatResult['status_code'] == '422') {
          this.messageDialog = dataheatResult['message'];
          this.dialog.open(DialogDynamicComponent,
            {
              width: '450px',
              data: { message: this.messageDialog }
            });

          this.isSpinnerVisibleheatMap = false;
        } else {
          this.messageDialog = "Something went wrong";
          this.dialog.open(DialogDynamicComponent,
            {
              width: '450px',
              data: { message: this.messageDialog }
            });
          this.isSpinnerVisibleheatMap = false;
        }
        
      });
  }

}

export interface Element {
  name: number;
  position: string;
  weight: string;
  symbol: string;
}

export interface Element1 {
  name1: string;
  position1: string;
  weight1: string;
}

export interface Element2 {
  position2: string;
}

// const ELEMENT_DATA: Element[] = [
//   { position: "https://yoyosarkari.com/sbi-notification-2021-5000-junior-associate-posts/", name: 111095, weight: "5.9", symbol: "13.31" },
//   { position: "https://yoyosarkari.com/job-alerts-on-whatsapp/", name: 24205, weight: "2.7", symbol: "2.91" },
//   { position: "https://yoyosarkari.com/indian-postal-circle-notification-2021-2428-gds-posts/", name: 24070, weight: "4.9", symbol: "2.88" },
//   { position: "https://yoyosarkari.com/indian-postal-circle-notification-2020-various-gds-mts-posts/", name: 18365, weight: "2.5", symbol: "2.2" },
//   { position: "https://yoyosarkari.com/indian-air-force-notification-2021-1000-group-c-posts/", name: 17667, weight: "6.8", symbol: "2.13" },
//   { position: "https://yoyosarkari.com/indian-air-force-notification-2021-1000-group-c-posts/", name: 17667, weight: "7.8", symbol: "2.13" },
//   { position: "https://yoyosarkari.com/indian-air-force-notification-2021-1000-group-c-posts/", name: 17667, weight: "8.8", symbol: "2.13" },
//   { position: "https://yoyosarkari.com/indian-air-force-notification-2021-1000-group-c-posts/", name: 17667, weight: "1.8", symbol: "2.13" },
//   { position: "https://yoyosarkari.com/indian-air-force-notification-2021-1000-group-c-posts/", name: 17667, weight: "2.8", symbol: "2.13" },
//   { position: "https://yoyosarkari.com/indian-air-force-notification-2021-1000-group-c-posts/", name: 17667, weight: "6.8", symbol: "2.13" }

// ];

// const ELEMENT_DATA1: Element1[] = [
//   { position1: "fresh2refresh.com/c-programming/c-printf-and-scanf/", name1: "2,860", weight1: "8.9" },
//   { position1: "fresh2refresh.com/c-programming/c-basic-program/", name1: "5,543", weight1: "8.1" },
//   { position1: "fresh2refresh.com/sql-tutorial/", name1: "5,543", weight1: "7.2" },
//   { position1: "fresh2refresh.com/sql-tutorial/", name1: "5,543", weight1: "7.5" },
//   { position1: "fresh2refresh.com/sql-tutorial/", name1: "5,543", weight1: "8.5" },
// ];

// const ELEMENT_DATA2: Element2[] = [
//   { position2: "fresh2refresh.com/c-programming/c-basic-program/" },
//   { position2: "fresh2refresh.com/c-programming/" },
//   { position2: "fresh2refresh.com/aptitude/aptitude-questions-and-answers/" },
//   { position2: "fresh2refresh.com/c-programming/c-printf-and-scanf/" },
//   { position2: " fresh2refresh.com/java-tutorial/" },
//   { position2: "fresh2refresh.com/c-programming/c-passing-struct-to-function/" },
//   { position2: "fresh2refresh.com/c-programming/c-type-casting/c-itoa-function" },
//   { position2: "fresh2refresh.com/sql-tutorial/" },
//   { position2: "fresh2refresh.com/c-programming/c-arithmetic-functions/c-round-f" },
//   { position2: "fresh2refresh.com/cpp-tutorial/" },

// ];
