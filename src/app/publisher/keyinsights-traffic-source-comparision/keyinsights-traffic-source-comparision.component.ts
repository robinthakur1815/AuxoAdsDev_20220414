import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Chart } from 'angular-highcharts';
import Drilldown from 'highcharts/modules/drilldown';
Drilldown(Highcharts);
import { MatTableDataSource } from '@angular/material/table';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions, TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';
import Highcharts from 'highcharts/highmaps';
import worldMap from '@highcharts/map-collection/custom/world.geo.json';
import { KeyinsightsTrafficService } from './keyinsights-traffic-source-comparision.service';
declare var $: any;
import { DialogDynamicComponent } from '../dialog-dynamic/dialog-dynamic.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//import { saveAs } from 'file-saver';
import { AppSettings } from '../../global/app-url';
// Tooltip start
export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 100,
  hideDelay: 100,
  touchendHideDelay: 100,
};
// tool tip end

@Component({
  selector: 'app-keyinsights-traffic-source-comparision',
  templateUrl: './keyinsights-traffic-source-comparision.component.html',
  styleUrls: ['./keyinsights-traffic-source-comparision.component.scss'],
  // Tooltip start
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults }
  ],
  // tool tip end
})

export class keyinsightsTrafficSourceComparisionComponent implements OnInit {
  geoViewdata = [];
  daterange: string;
  daterangeCur: string;
  daterangePre: string;
  usersCur: string;
  usersPre: string;
  sessCur: string;
  sessPre: string;
  bounceCur: string;
  bouncePre: string;
  trafficdataLast = [];
  trafficLastDate = [];
  trafficdataPre = [];
  trafficPreDate = [];
  isSpinnerVisible: boolean = false;
  isSpinnerVisible1: boolean = false;
  messageForDialog: string;

  // Tooltip start
  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  showDelay = new FormControl(1000);
  hideDelay = new FormControl(2000);

  disabled = new FormControl(true);

  message = new FormControl('Info about the action');


  position1 = new FormControl(this.positionOptions[0]);
  // Tooltip end 

  //world map chart 4 Start


  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor = 'mapChart';
  chartData = [{ code3: 'ABW', z: 105 }, { code3: 'AFG', z: 35530 }];
  updateFlag = false;

  chartOptions: Highcharts.Options = {
    chart: {
      marginRight: 20,
      marginLeft: 60,
      marginTop: 70,
      map: worldMap,
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

    title: {
      text: ''
    },

    exporting: {
      enabled: false
    },

    credits: {
      enabled: false
    },

    mapNavigation: {
      enabled: true,
      buttonOptions: {
        theme: {
          fill: 'white',
          'stroke-width': 1,
          stroke: '#e94265',
          r: 0,
          states: {
            hover: {
              fill: '#fff'
            },
            select: {
              stroke: '#e94265',
              fill: '#e94265'
            }
          }
        },
        alignTo: 'spacingBox'
      }
    },

    //   legend: {
    //     align: 'right',
    //     padding: 10,
    //     verticalAlign: 'middle',
    //     layout: 'vertical',
    //     y: 10,
    //     floating: true,
    //     symbolHeight: 8
    // },

    legend: {
      enabled: true,
      padding: 10,
      verticalAlign: 'bottom',
      align: 'center',
      symbolWidth: 400,
      layout: 'horizontal',
      y: 15,
      x: 0,
      symbolHeight: 8
    },

    colorAxis: {
      min: 5,
      endOnTick: false,
      startOnTick: false,
      stops: [
        [0, '#b8dbf4'],
        [0.5, '#29a3fb'],
        [0.9, '#0274d8']
      ],
    },

    series: [
      {
        type: 'map',
        allowPointSelect: false,
        borderColor: '#fff',
        borderWidth: 0.5,
        cursor: 'pointer',
        name: 'Country',
        states: {
          hover: {
            color: '#e94265'
          }
        },

        dataLabels: {
          enabled: false,
          format: '{point.name}'
        },

        // allAreas: true,
        data: this.geoViewdata,
        showInLegend: false
      }
    ]
  };


  handleUpdate(e) {
    this.chartOptions.series[0] = {
      type: 'map',
      data: e
    }

    this.updateFlag = true;
  }
  //world map chart 4 End

  // Table start
  expandContent = true;


  // Graph start
  public trafficone: any;
  public traffictwo: any;
  public trafficthree: any;

  
  //Traffic Source Comparison last week
  getTrafficLast(dataLast, lastDate) {
    //trafficoneone chart start
    this.trafficone = new Chart({
      chart: {
        marginRight: 5,
        marginTop: 30,
        marginLeft: 60,
        type: 'column',
        style: {
          fontFamily: 'Noto sans KR',
        }
      },

      colors: ['#29a3fb', '#ffa115', '#27cb71e3', '#8d70fa', '#e94265', '#a9a9a9', '#22c6db', '#F38FB3', '#6691E1', '#86948d'],

      title: {
        text: ''
      },
      xAxis: {
        categories: lastDate

      },

      yAxis: {
        title: {
          text: 'Earnings ($)'
        },
        stackLabels: {
          enabled: false,
        },
        showEmpty: false
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
      tooltip: {
        valuePrefix: '$'
      },

      exporting: {
        enabled: false
      },

      credits: {
        enabled: false
      },

      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: false
          }
        }
      },

      series: dataLast
    });
  }
  //Traffic Source Comparison previous week
  getTrafficPre(dataPre, preDate) {


    //trafficonetwo chart start
    this.traffictwo = new Chart({
      chart: {
        marginRight: 5,
        marginTop: 30,
        marginLeft: 60,
        type: 'column',
        style: {
          fontFamily: 'Noto sans KR',
        }
      },

      colors: ['#29a3fb', '#ffa115', '#27cb71e3', '#8d70fa', '#e94265', '#a9a9a9', '#22c6db', '#F38FB3', '#6691E1', '#86948d'],

      title: {
        text: ''
      },
      xAxis: {
        categories: preDate

      },

      yAxis: {
        title: {
          text: 'Earnings ($)'
        },
        stackLabels: {
          enabled: false,
        },
        showEmpty: false
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
      tooltip: {
        valuePrefix: '$'
      },

      exporting: {
        enabled: false
      },

      credits: {
        enabled: false
      },

      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: false
          }
        }
      },

      series: dataPre
    });
  }
  constructor(breakpointObserver: BreakpointObserver, private _keyTrafficService: KeyinsightsTrafficService, public dialog: MatDialog) {
    Highcharts.setOptions({
      lang: {
          thousandsSep: ','
      }
  });
  }

  ngOnInit(): void {
    // var chart = Highcharts.chart("trafficthreeA", this.chartOptions1);
    this.isSpinnerVisible = true;
    
    //api
    this._keyTrafficService.getMapOver(localStorage.getItem('uniq_id'), localStorage.getItem('anlytic_id'), localStorage.getItem('child_net_code'))
      .subscribe(dataResult => {
        
        if (dataResult['status_code'] == '200') {
          this.daterange = dataResult['data']['daterangetop']
          this.geoViewdata = dataResult['data']['chartdata'];

          //this.getMapChart(this.geoViewdata); 
          this.handleUpdate(this.geoViewdata);
          this.isSpinnerVisible = false;
        } else {
          // this.messageForDialog = "Something went wrong";
          // this.dialog.open(DialogDynamicComponent,

          //   {
          //     width: '450px',
          //     data: { message: this.messageForDialog }
          //   });
          this.isSpinnerVisible = false;
        }

      });
    //api
    this.isSpinnerVisible1 = true;
    this._keyTrafficService.getTrafficOver(localStorage.getItem('uniq_id'), localStorage.getItem('anlytic_id'), localStorage.getItem('child_net_code'))
      .subscribe(dataTraResult => {
        if (dataTraResult['status_code'] == '200') {

          this.daterangeCur = dataTraResult['data']['topdatalw'][0]['daterangeL'];
          this.daterangePre = dataTraResult['data']['topdatapw'][0]['daterangeP'];
          this.usersCur = dataTraResult['data']['topdatalw'][0]['unqvisitor'];
          this.usersPre = dataTraResult['data']['topdatapw'][0]['unqvisitor'];
          this.sessCur = dataTraResult['data']['topdatalw'][0]['avgsession'];
          this.sessPre = dataTraResult['data']['topdatapw'][0]['avgsession'];
          this.bounceCur = dataTraResult['data']['topdatalw'][0]['avgbounce'];
          this.bouncePre = dataTraResult['data']['topdatapw'][0]['avgbounce'];
          this.trafficdataLast = dataTraResult['data']['chartdatalw'];
          this.trafficLastDate = dataTraResult['data']['daterangelw'];
          this.trafficdataPre = dataTraResult['data']['chartdatapw'];
          this.trafficPreDate = dataTraResult['data']['daterangepw'];
          this.getTrafficLast(this.trafficdataLast, this.trafficLastDate);
          this.getTrafficPre(this.trafficdataPre, this.trafficPreDate);

          this.isSpinnerVisible1 = false;
        } else {
          // this.messageForDialog = "Something went wrong";
          // this.dialog.open(DialogDynamicComponent,

          //   {
          //     width: '450px',
          //     data: { message: this.messageForDialog }
          //   });
          this.isSpinnerVisible1 = false;
        }

      });
  }


}