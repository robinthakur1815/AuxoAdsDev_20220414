import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { MatTableDataSource } from '@angular/material/table';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions, TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';
import { AdsenseOverviewService } from './adsense-overview.service';
import { DatePipe } from '@angular/common';
declare var $: any;
import { DialogDynamicComponent } from '../dialog-dynamic/dialog-dynamic.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { saveAs } from 'file-saver';
import { AppSettings } from '../../global/app-url';
// Tooltip start
export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 100,
  hideDelay: 100,
  touchendHideDelay: 100,
};
// tool tip end

@Component({
  selector: 'app-adsense-overview',
  templateUrl: './adsense-overview.component.html',
  styleUrls: ['./adsense-overview.component.scss'],
  // Tooltip start
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults }
  ],
  // tool tip end
})

export class AdsenseOverviewComponent implements OnInit {
  // Tooltip start
  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  showDelay = new FormControl(1000);
  hideDelay = new FormControl(2000);

  disabled = new FormControl(true);

  message = new FormControl('Info about the action');


  position1 = new FormControl(this.positionOptions[0]);
  // Tooltip end

  public cyberadsdashboardone: any;
  public cyberadsdashboardtwo: any;
  public cyberadsdashboardthree: any;
  public cyberadsdashboardfour: any;
  public cyberadsdashboardfive: any;
  graphdata = [];
  public errorMsg;


  public earning10day: any;
  public avgEarning10day: any;
  public CPM10day: any;
  public CPM10dayUpDownPer: any;
  public CTR10day: any;
  public CTR10dayUpDownPer: any;
  public Filled10day: any;
  public Filled10dayUpDownPer: any;
  public earningGraph_data: any;
  public cpmGraph_data: any;
  public ctrGraph_data: any;
  public filledGraph_data: any;
  public earning10dayUpDownPer: any;
  public earningUpArrow: boolean = false;
  public earningDownpArrow: boolean = false;
  public earning10dayUpDown: any;
  public cpmUpArrow: boolean = false;
  public cpmDownpArrow: boolean = false;
  public ctrUpArrow: boolean = false;
  public ctrDownpArrow: boolean = false;
  public fillUpArrow: boolean = false;
  public fillDownpArrow: boolean = false;

  public CPM10dayUpDown: any;
  public CTR10dayUpDown: any;
  public Filled10dayUpDown: any;


  date: string;
  isSpinnerVisible: boolean = false;
  messageDialog: string;


  //adsense overview  chart start
  getgraphdata(dat) {
    this.cyberadsdashboardfive = new Chart({
      chart: {
        marginRight: 20,
        marginLeft: 60,
        marginTop: 30,
        type: 'line',
        style: {
          fontFamily: 'Noto sans KR',
        },
        scrollablePlotArea: {
          minWidth: 500,
          scrollPositionY: 0,
          scrollPositionX: 0,
          opacity: 1
          },
      },

      colors: ['#29a3fb', '#ffa115', '#27cb71e3', '#8d70fa', '#e94265', '#a9a9a9', '#22c6db', '#F38FB3', '#6691E1', '#86948d'],

      title: {
        text: '',
        align: 'left'
      },

      exporting: {
        enabled: false
      },

      credits: {
        enabled: false
      },

      legend: {
        padding: 10,
        itemMarginTop: 15,
        itemMarginBottom: -15,
        itemStyle: {
          lineHeight: '14px'
        }
      },

      // subtitle: {
      //     text: '',
      //     align: 'left'
      // },

      xAxis: {
        categories: dat.date,

        type: 'datetime',
        labels: {
          overflow: 'justify'
        }
      },

      yAxis: {
        title: {
          text: 'Estimated Earnings ($)'
        }
      },

      tooltip: {
        valuePrefix: '$'
      },

      plotOptions: {
        spline: {
          lineWidth: 3,
          states: {
            hover: {
              lineWidth: 4
            }
          },

        },
        area: {
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },
            // stops: [
            //     [0, Highcharts.getOptions().colors[0]],
            //     [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
            // ]
            stops: [
              // [0, 'rgba(10, 137, 216, 0.2)'],
              // [1, 'rgba(238, 34, 1, 0.2)']
            ]
          },
        }
      },


      series: [{
        name: 'AdSense Earnings',
        type: 'area',
        data: dat.revenue,
        showInLegend: false,
        marker: {
          enabled: false,
          symbol: 'circle'
        },

      }],
      navigation: {
        menuItemStyle: {
          fontSize: '10px'
        }
      }
    });
  }
  // table start 
  constructor(breakpointObserver: BreakpointObserver, private _adsenseoverviewService: AdsenseOverviewService, private datePipe: DatePipe, public dialog: MatDialog) {
    // table End


    // Table start
    breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns = result.matches ?
        ['date', 'requests', 'impressions', 'matched', 'coverage', 'ctr', 'cpm', 'revenue'] :
        ['date', 'requests', 'impressions', 'matched', 'coverage', 'ctr', 'cpm', 'revenue'];
    });
    // Table End

  }
  displayedColumns = ['date', 'requests', 'impressions', 'matched', 'coverage', 'ctr', 'cpm', 'revenue'];
  dataSource: MatTableDataSource<Element[]>;

  earningGraph(data) {
    this.cyberadsdashboardone = new Chart({
      chart: {
        type: 'column',
        marginLeft: 7,
        marginRight: 8,
        marginBottom: 5,
        backgroundColor: 'transparent'
      },
      title: {
        text: ''
      },
      colors: ['#fff'],
      xAxis: {
        title: {
          text: '',
        },
        labels: {
          enabled: false,
        },
        gridLineColor: 'transparent',
        lineWidth: 0,
        tickWidth: 0,
        gridLineWidth: 0,
        categories: data.date,
      },
      yAxis: {
        title: {
          text: '',
        },
        labels: {
          enabled: false,
        },
        gridLineColor: 'transparent',
        gridLineWidth: 0
      },
      exporting: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      legend: {
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'bottom',
        enabled: false,
        y: 0,
        padding: 3,
        itemMarginTop: 5,
        itemMarginBottom: -15,
        itemStyle: {
          lineHeight: '14px'
        }
      },
      tooltip: {
        valuePrefix: '$',
        useHTML: true,
        pointFormat: '<table  style="background-color: transparent; border-collapse: collapse;border-style:hidden;"><tr style="border-collapse: collapse;border-style:hidden;"><td style="text-align: center;"></td></tr><tr style="background-color: transparent; border: none;"><td style="text-align: left;"><b>${point.y:,.f}</b></td></tr></table>',
        footerFormat: '</table>',
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
          minPointLength: 10
        }
      },
      series: [
        {
          name: 'Earnings',
          type: 'column',
          data: data.revenue
          // data: [128.15, 85.25, 124.5, 3.7, 3.6, 3.1, 2.8, 1.4, 2.1, 2.3] 
        }]
    });
  }
  cpmGraph(data) {
    this.cyberadsdashboardtwo = new Chart({
      chart: {
        type: 'column',
        marginLeft: 7,
        marginRight: 8,
        marginBottom: 5,
        backgroundColor: 'transparent'
      },
      title: {
        text: ''
      },
      colors: ['#fff'],
      xAxis: {
        title: {
          text: '',
        },
        labels: {
          enabled: false,
        },
        gridLineColor: 'transparent',
        lineWidth: 0,
        tickWidth: 0,
        gridLineWidth: 0,
        categories: data.date,
      },
      yAxis: {
        title: {
          text: '',
        },
        labels: {
          enabled: false,
        },
        gridLineColor: 'transparent',
        gridLineWidth: 0
      },
      exporting: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      legend: {
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'bottom',
        enabled: false,
        y: 0,
        padding: 3,
        itemMarginTop: 5,
        itemMarginBottom: -15,
        itemStyle: {
          lineHeight: '14px'
        }
      },
      tooltip: {
        valuePrefix: '$',
        // valueSuffix: '%',
        useHTML: true,
        pointFormat: '<table  style="background-color: transparent; border-collapse: collapse;border-style:hidden;"><tr style="border-collapse: collapse;border-style:hidden;"><td style="text-align: center;"></td></tr><tr style="background-color: transparent; border: none;"><td style="text-align: left;"><b>${point.y:,.f}</b></td></tr></table>',
        footerFormat: '</table>',
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
          minPointLength: 10
        }
      },
      series: [
        {
          name: 'CPM',
          type: 'column',
          data: data.revenue

        }]
    });
  }
  ctrGraph(data) {
    this.cyberadsdashboardthree = new Chart({
      chart: {
        type: 'column',
        marginLeft: 7,
        marginRight: 8,
        marginBottom: 5,
        backgroundColor: 'transparent'
      },
      title: {
        text: ''
      },
      colors: ['#fff'],
      xAxis: {
        title: {
          text: '',
        },
        labels: {
          enabled: false,
        },
        gridLineColor: 'transparent',
        lineWidth: 0,
        tickWidth: 0,
        gridLineWidth: 0,
        categories: data.date,
      },
      yAxis: {
        title: {
          text: '',
        },
        labels: {
          enabled: false,
        },
        gridLineColor: 'transparent',
        gridLineWidth: 0
      },
      exporting: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      legend: {
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'bottom',
        enabled: false,
        y: 0,
        padding: 3,
        itemMarginTop: 5,
        itemMarginBottom: -15,
        itemStyle: {
          lineHeight: '14px'
        }
      },
      tooltip: {
        // valuePrefix: '$',
        valueSuffix: '%',
        useHTML: true,
        pointFormat: '<table  style="background-color: transparent; border-collapse: collapse;border-style:hidden;"><tr style="border-collapse: collapse;border-style:hidden;"><td style="text-align: center;"></td></tr><tr style="background-color: transparent; border: none;"><td style="text-align: left;"><b>{point.y:.f}%</b></td></tr></table>',
        footerFormat: '</table>',
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
          minPointLength: 10
        }
      },
      series: [
        {
          name: 'CTR',
          type: 'column',
          // data: [2.4, 4.2, 4.5, 3.7, 3.6, 3.1, 2.8, 1.4, 2.1, 2.3]
          data: data.revenue
        }]
    });
  }
  fillGraph(data) {
    this.cyberadsdashboardfour = new Chart({
      chart: {
        type: 'column',
        marginLeft: 7,
        marginRight: 8,
        marginBottom: 5,
        backgroundColor: 'transparent'
      },
      title: {
        text: ''
      },
      colors: ['#fff'],
      xAxis: {
        title: {
          text: '',
        },
        labels: {
          enabled: false,
        },
        gridLineColor: 'transparent',
        lineWidth: 0,
        tickWidth: 0,
        gridLineWidth: 0,
        categories: data.date,
      },
      yAxis: {
        title: {
          text: '',
        },
        labels: {
          enabled: false,
        },
        gridLineColor: 'transparent',
        gridLineWidth: 0
      },
      exporting: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      legend: {
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'bottom',
        enabled: false,
        y: 0,
        padding: 3,
        itemMarginTop: 5,
        itemMarginBottom: -15,
        itemStyle: {
          lineHeight: '14px'
        }
      },
      tooltip: {
        // valuePrefix: '$',
        valueSuffix: '%',
        useHTML: true,
        pointFormat: '<table  style="background-color: transparent; border-collapse: collapse;border-style:hidden;"><tr style="border-collapse: collapse;border-style:hidden;"><td style="text-align: center;"></td></tr><tr style="background-color: transparent; border: none;"><td style="text-align: left;"><b>{point.y:.f}%</b></td></tr></table>',
        footerFormat: '</table>',
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
          minPointLength: 10
        }
      },
      series: [
        {
          name: 'Filled',
          type: 'column',
          data: data.revenue
          // data: [2.4, 4.2, 4.5, 3.7, 3.6, 3.1, 2.8, 1.4, 2.1, 2.3]

        }]
    });
  }

  topDatahead(dataResult) {
    this.earning10day = dataResult['datatop']['earning10day'];
    this.avgEarning10day = dataResult['datatop']['avgEarning10day'];
    this.CPM10day = dataResult['datatop']['CPM10day'];
    this.CPM10dayUpDownPer = dataResult['datatop']['CPM10dayUpDownPer'];
    this.CPM10dayUpDown = dataResult['datatop']['CPM10dayUpDown'];

    this.CTR10day = dataResult['datatop']['CTR10day'];
    this.CTR10dayUpDownPer = dataResult['datatop']['CTR10dayUpDownPer'];
    this.CTR10dayUpDown = dataResult['datatop']['CTR10dayUpDown'];

    this.Filled10day = dataResult['datatop']['Filled10day'];
    this.Filled10dayUpDownPer = dataResult['datatop']['Filled10dayUpDownPer'];
    this.Filled10dayUpDown = dataResult['datatop']['Filled10dayUpDown'];

    this.earningGraph_data = dataResult['datatop']['earningGraph_data'];
    this.cpmGraph_data = dataResult['datatop']['cpmGraph_data'];
    this.ctrGraph_data = dataResult['datatop']['ctrGraph_data'];
    this.filledGraph_data = dataResult['datatop']['filledGraph_data'];

    this.earning10dayUpDownPer = dataResult['datatop']['Earning10dayUpDownPer'];
    this.earning10dayUpDown = dataResult['datatop']['Earning10dayUpDown'];
    if (this.earning10dayUpDown == 'Up') {
        this.earningUpArrow = true;
    }
    if (this.earning10dayUpDown == 'Down') {
        this.earningDownpArrow = true;
    }
    if (this.CPM10dayUpDown == 'Up') {
      this.cpmUpArrow = true;
    }
    if (this.CPM10dayUpDown == 'Down') {
      this.cpmDownpArrow = true;
    }
    if (this.CTR10dayUpDown == 'Up') {
      this.ctrUpArrow = true;
    }
    if (this.CTR10dayUpDown == 'Down') {
      this.ctrDownpArrow = true;
    }
    if (this.Filled10dayUpDown == 'Up') {
      this.fillUpArrow = true;
    }
    if (this.Filled10dayUpDown == 'Down') {
      this.fillDownpArrow = true;
    }

    this.earningGraph(this.earningGraph_data);
    this.cpmGraph(this.cpmGraph_data);
    this.ctrGraph(this.ctrGraph_data);
    this.fillGraph(this.filledGraph_data);
  }


  ngOnInit(): void {
    this.isSpinnerVisible = true;
    //for date
    this.date = this.datePipe.transform(localStorage.getItem('startdate'), 'd MMM') + ' - ' + this.datePipe.transform(localStorage.getItem('enddate'), 'd MMM, Y');

    this._adsenseoverviewService.getAdscontentoverview(localStorage.getItem('uniq_id'), localStorage.getItem('startdate'), localStorage.getItem('enddate'), localStorage.getItem('ads_id'))
      .subscribe(dataResult => {

        if (dataResult['status_code'] == '200') {

          this.graphdata = dataResult['data']["ads_graph_data"];
          this.getgraphdata(this.graphdata);
          this.dataSource = new MatTableDataSource(dataResult['data']["ads_table_data"]);

          this.topDatahead(dataResult);

          this.isSpinnerVisible = false;

        } else if (dataResult['status_code'] == '422') {

          this.topDatahead(dataResult);
          this.messageDialog = dataResult['message'];
          this.dialog.open(DialogDynamicComponent,

            {
              width: '450px',
              data: { message: this.messageDialog }
            });

          this.isSpinnerVisible = false;
        } else {
          this.messageDialog = "Something went wrong";
          this.dialog.open(DialogDynamicComponent,

            {
              width: '450px',
              data: { message: this.messageDialog }
            });
          this.isSpinnerVisible = false;
        }

      });
  }
  downloadadsoverview() {

    //api
    this._adsenseoverviewService.downAdsAppOverview(localStorage.getItem('startdate'), localStorage.getItem('enddate'), localStorage.getItem('uniq_id'), localStorage.getItem('ads_id'))
      .subscribe(dataResult => {

        if (dataResult['status_code'] == '200') {
          const fileName = dataResult['data'];
          const fileUrl = AppSettings.API_STARTPOINT + '/assets/api/admin/user/adsense/upload/' + fileName;

          saveAs(fileUrl, fileName);
        } else if (dataResult['status_code'] == '422') {

          this.messageDialog = dataResult['message'];
          this.dialog.open(DialogDynamicComponent,

            {
              width: '450px',
              data: { message: this.messageDialog }
            });


        } else {
          this.messageDialog = "Something went wrong";
          this.dialog.open(DialogDynamicComponent,

            {
              width: '450px',
              data: { message: this.messageDialog }
            });

        }

      })
  }
  // Table start
  // displayedColumns = ['date', 'requests', 'impressions', 'matched', 'coverage', 'ctr' , 'cpm', 'revenue'];
  // dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);

}

export interface Element {
  date: string;
  requests: number;
  impressions: number;
  matched: number;
  coverage: number;
  ctr: number;
  cpm: number;
  revenue: number;
}

// const ELEMENT_DATA: Element[] = [
//     { date: "08 Jun ,2021", requests: 52468 , impressions: 62064 , matched : 0 , coverage: 0 , ctr: 0 , cpm: 0 , revenue: 0},
//     { date: "09 Jun ,2021", requests: 52468 , impressions: 62064 , matched : 0 , coverage: 0 , ctr: 0 , cpm: 0 , revenue: 0},
//     { date: "10 Jun ,2021", requests: 52468 , impressions: 62064 , matched : 0 , coverage: 0 , ctr: 0 , cpm: 0 , revenue: 0},
//     { date: "11 Jun ,2021", requests: 52468 , impressions: 62064 , matched : 0 , coverage: 0 , ctr: 0 , cpm: 0 , revenue: 0},
//     { date: "12 Jun ,2021", requests: 52468 , impressions: 62064 , matched : 0 , coverage: 0 , ctr: 0 , cpm: 0 , revenue: 0},
//     { date: "13 Jun ,2021", requests: 52468 , impressions: 62064 , matched : 0 , coverage: 0 , ctr: 0 , cpm: 0 , revenue: 0},
//     { date: "14 Jun ,2021", requests: 52468 , impressions: 62064 , matched : 0 , coverage: 0 , ctr: 0 , cpm: 0 , revenue: 0},
//     { date: "15 Jun ,2021", requests: 52468 , impressions: 62064 , matched : 0 , coverage: 0 , ctr: 0 , cpm: 0 , revenue: 0},
//     { date: "16 Jun ,2021", requests: 52468 , impressions: 62064 , matched : 0 , coverage: 0 , ctr: 0 , cpm: 0 , revenue: 0},
//     { date: "17 Jun ,2021", requests: 52468 , impressions: 62064 , matched : 0 , coverage: 0 , ctr: 0 , cpm: 0 , revenue: 0},

// ];
// Table End