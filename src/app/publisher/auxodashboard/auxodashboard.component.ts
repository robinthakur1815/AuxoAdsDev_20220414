import { Component, OnInit, ViewEncapsulation } from '@angular/core';
//import * as Highcharts from 'highcharts/highmaps';
import { Chart } from 'angular-highcharts';
import Drilldown from 'highcharts/modules/drilldown';
Drilldown(Highcharts);
import { MatTableDataSource } from '@angular/material/table';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions, TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DialogDynamicComponent } from '../dialog-dynamic/dialog-dynamic.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { saveAs } from 'file-saver';
import { AppSettings } from '../../global/app-url';
import { auxoDashboardService } from './auxodashboard.service';
import Highcharts from 'highcharts';
declare var $: any;
// Tooltip start
export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 100,
  hideDelay: 100,
  touchendHideDelay: 100,
};
// tool tip end

@Component({
  selector: 'app-cyberadsdashboard',
  templateUrl: './auxodashboard.component.html',
  styleUrls: ['./auxodashboard.component.scss'],
  // Tooltip start
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults }
  ],
  // tool tip end
})

export class AuxoDashboardComponent implements OnInit {
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

  public errorMsg;
  public tabledata = [];
  public month_details = [];
  public topheaddata = [];
  public graphdata = [];
  public daterange = [];
  public sumupdata = [];

  graphrootdata = [];
  lvl1data1 = [];
  graphdatelvl3 = [];
  adunitgraphrootdata = [];
  adunitlvl1data1 = [];
  adunitgraphdatelvl3 = [];
  sitesgraphrootdata = [];
  siteslvl1data1 = [];
  devicegraphrootdata = [];
  devicelvl1data1 = [];
  devicegraphdatelvl3 = [];
  geographrootdata = [];
  geolvl1data1 = [];
  geographdatelvl3 = [];
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
  public isSpinnerVisible: boolean = true;
  public isSpinnerVisibleTopBox: boolean = true;
  public isSpinnerVisibleAdtype: boolean = true;
  public isSpinnerVisibleAdunit: boolean = true;
  public isSpinnerVisiblesites: boolean = true;
  public isSpinnerVisibledevice: boolean = true;
  public isSpinnerVisiblegeo: boolean = true;

  // public auxoVarone: any;
  // public auxoVartwo: any;
  // public auxoVarthree: any;
  // public auxoVarfour: any;
  // public auxoVarfive: any;
  // public auxoVarsix: any;
  public auxoVarmsg: any;
  


  messageDialog: string;
  date: string;
  messageForDialog: string;

  sumuplvldata = { "adrlvl1": "", "adimrlvl1": "", "fillratelvl1": "", "covglvl1": "", "ctrlvl1": "", "ecpmxlvl1": "", "revenue_cmsSharelvl1": "" };
  // table start 
  getgraphdata(y) {
    
    this.cyberadsdashboardfive = new Chart({
      chart: {
        marginRight: 30,
        marginLeft: 60,
        marginTop: 30,
        type: 'line',
        style: {
          fontFamily: 'Noto sans KR',
        },
        scrollablePlotArea: {
          // minWidth: 500,
          // scrollPositionX: 1
          minWidth: 768,
          scrollPositionY: 0,
          scrollPositionX: 0,
          opacity: 1
        }
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
      xAxis: {
        categories: y.date,
        type: 'datetime',
        // min: 5,
        // max: 10,
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
            stops: [

            ]
          },
        }
      },


      series: [{
        name: 'Overall Earnings',
        type: 'area',
        data: y.revenue,
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
          name: 'Earning',
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
        // valuePrefix: '',
        valueSuffix: '%',
        useHTML: true,
        pointFormat: '<table  style="background-color: transparent; border-collapse: collapse;border-style:hidden;"><tr style="border-collapse: collapse;border-style:hidden;"><td style="text-align: center;"></td></tr><tr style="background-color: transparent; border: none;"><td style="text-align: left;"><b>${point.y:.f}</b></td></tr></table>',
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
        // valuePrefix: '',
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
        // valuePrefix: '',
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
  constructor(breakpointObserver: BreakpointObserver, private _auxoDashboardService: auxoDashboardService, private datePipe: DatePipe, public dialog: MatDialog) {

 Highcharts.setOptions({
            lang: {
                thousandsSep: ','
            }
        });
    // Table start
    breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns = result.matches ?
        ['date', 'adr', 'adimr', 'fillrate', 'covg', 'clicks_madr', 'ecpmx', 'revenue'] :
        ['date', 'adr', 'adimr', 'fillrate', 'covg', 'clicks_madr', 'ecpmx', 'revenue'];
    });
    // Table End

  }


  //cyberadsdashboardsix adtypes chart start
  Highcharts: typeof Highcharts = Highcharts;
  getchart(x, y, z) {

    const that = this;
    Highcharts.chart("container", {
      chart: {
        renderTo: 'container',
        marginTop: 30,
        // marginLeft: 7,
        plotShadow: false,
        type: 'pie',
        style: {
          fontFamily: 'Noto sans KR',
        },
        
        events: {
          
        }
      },

      colors: ['#29a3fb', '#ffa115', '#27cb71e3', '#8d70fa', '#e94265', '#a9a9a9', '#22c6db', '#F38FB3', '#6691E1', '#86948d'],

      title: {
        text: ''
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

      xAxis: {
        categories: z.dates,
        type: 'linear',
        labels: {
          overflow: 'justify'
        },
        gridLineColor: 'transparent',
        lineWidth: 0,
        tickWidth: 0,
        gridLineWidth: 0
      },


      yAxis: {
        title: {
          text: 'Estimated Earnings ($)'
        },
        showEmpty: false
      },


      tooltip: {
        valuePrefix: '$'
        
      },


      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          borderWidth: 0,
          tooltip: {
            headerFormat: '<span>Earnings By {series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">● {point.name}</span> : <b>${point.y:,.f}</b><br/>',
          },
          dataLabels: {
            enabled: false
          },
          showInLegend: true
        },

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
           
            stops: [
              // [0, 'rgb(255, 255, 255)'],
              // [1, 'rgb(200, 200, 255)']
            ]
          },
        }
      },


      series: [{
        type: 'pie',
        name: "Ad Types",
        colorByPoint: true,
        data: x,
      }],


      drilldown: {
        drillUpButton: {
          relativeTo: 'spacingBox',
          position: {
            y: 0,
          },
          theme: {
            fill: '#fff',
            'stroke-width': 1,
            stroke: '#e94265',
            r: 0,
            states: {
              hover: {
                fill: '#fff'
              },
              select: {
                stroke: '#039',
                fill: '#bada55'
              }
            }
          }
        },


        series: y
      }
    });
  }


  //cyberadsdashboardseven adunits chart start
  adunitgetchart(x, y, z) {
    const that = this;
    Highcharts.chart("container1", {
      chart: {
          renderTo: 'container1',
          marginTop:30,
          // marginLeft: 7,
          plotShadow: false,
          type: 'pie',
          style: {
                fontFamily: 'Noto sans KR',
            },
        
            events: {  
            
         }
      },

      colors: ['#29a3fb', '#ffa115', '#27cb71e3', '#8d70fa', '#e94265', '#a9a9a9', '#22c6db', '#F38FB3', '#6691E1', '#86948d'],

      title: {
          text: ''
      },
  
       exporting: {
        enabled:false
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

      xAxis: {
       categories:z.dates,
  
        type: 'linear',
        labels: {
            overflow: 'justify'
        },
          gridLineColor: 'transparent',
          lineWidth: 0,
          tickWidth: 0,
          gridLineWidth: 0
       },
  
  
      yAxis: {
          title: {
            text: 'Estimated Earnings ($)'
          },
          showEmpty: false
        },


        tooltip: {
          valuePrefix: '$'
      },


      plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              borderWidth: 0,
              tooltip: {
              headerFormat: '<span>Earnings By {series.name}</span><br>',
              pointFormat: '<span style="color:{point.color}">● {point.name}</span> : <b>${point.y:,.f}</b><br/>',             
              },
              dataLabels: {
                  enabled: false
              },
              showInLegend: true
          },
  
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
                  // [0, 'rgb(255, 255, 255)'],
                  // [1, 'rgb(200, 200, 255)']
                     ]
          },     
        }
      },


        series: [{
          type: 'pie',
          allowPointSelect: true,
          keys: ['name', 'y', 'selected', 'sliced'],
          name: 'Ad Units',
          colorByPoint: true,
        //   xAxis: 0,
          data: x
        }],

        drilldown: {
       
          drillUpButton:  {
            relativeTo: 'spacingBox',
            position: {
                y: 0,
            },
            theme: {
                fill: '#fff',
                'stroke-width': 1,
                stroke: '#e94265',
                r: 0,
                states: {
                    hover: {
                        fill: '#fff'
                    },
                    select: {
                        stroke: '#039',
                        fill: '#bada55'
                    }
                    }
                  } 
                  },
             series: y 
            
           }
         });   
       }
  
  // end end
  sitesgetchart(x, y) {
    const that = this;
    Highcharts.chart("container2", {
      chart: {
        renderTo: 'container2',
        marginTop: 30,
        // marginLeft: 7,
        plotShadow: false,
        type: 'pie',
        style: {
          fontFamily: 'Noto sans KR',
        },
        //     scrollablePlotArea: {
        //     minWidth: 500,
        //     scrollPositionX: 1
        // }
        events: {
          
        }
      },

      colors: ['#29a3fb', '#ffa115', '#27cb71e3', '#8d70fa', '#e94265', '#a9a9a9', '#22c6db', '#F38FB3', '#6691E1', '#86948d'],

      title: {
        text: ''
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

      xAxis: {

        type: 'category',
        labels: {
          overflow: 'justify'
        },
        gridLineColor: 'transparent',
        lineWidth: 0,
        tickWidth: 0,
        gridLineWidth: 0
      },


      yAxis: {
        title: {
          text: 'Estimated Earnings ($)'
        },
        showEmpty: false
      },


      tooltip: {
        valuePrefix: '$'
      },


      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          borderWidth: 0,
          tooltip: {
            headerFormat: '<span>Earnings By {series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">● {point.name}</span> : <b>${point.y:,.f}</b><br/>',
          },
          dataLabels: {
            enabled: false
          },
          showInLegend: true
        },
        column: {
          tooltip: {
            headerFormat: '<span>Earnings By {series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">● {point.name}</span> : <b>${point.y:,.f}</b><br/>',
          }
        },
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
              // [0, 'rgb(255, 255, 255)'],
              // [1, 'rgb(200, 200, 255)']
            ]
          },
        }
      },


      series: [{
        type: 'column',
        name: "Website",
        colorByPoint: true,
        data: x,
        showInLegend: false
      }],


      drilldown: {
        drillUpButton: {
          relativeTo: 'spacingBox',
          position: {
            y: 0,
          },
          theme: {
            fill: '#fff',
            'stroke-width': 1,
            stroke: '#e94265',
            r: 0,
            states: {
              hover: {
                fill: '#fff'
              },
              select: {
                stroke: '#039',
                fill: '#bada55'
              }
            }
          }
        },
        series: y
      }
    });
  }

  devicegetchart(x, y, z) {

    //chartOptions: Highcharts.Options = {

    const that = this;
    Highcharts.chart("container3", {
      chart: {
        renderTo: 'container3',
        marginTop: 30,
        // marginLeft: 7,
        plotShadow: false,
        type: 'pie',
        style: {
          fontFamily: 'Noto sans KR',
        },
        
        events: {
        }
      },

      colors: ['#29a3fb', '#ffa115', '#27cb71e3', '#8d70fa', '#e94265', '#a9a9a9', '#22c6db', '#F38FB3', '#6691E1', '#86948d'],

      title: {
        text: ''
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

      xAxis: {
        categories: z.dates,

        type: 'linear',
        labels: {
          overflow: 'justify'
        },
        gridLineColor: 'transparent',
        lineWidth: 0,
        tickWidth: 0,
        gridLineWidth: 0
      },


      yAxis: {
        title: {
          text: 'Estimated Earnings ($)'
        },
        showEmpty: false
      },


      tooltip: {
        valuePrefix: '$'
      },


      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          borderWidth: 0,
          tooltip: {
            headerFormat: '<span>Earnings By {series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">● {point.name}</span> : <b>${point.y:,.f}</b><br/>',
          },
          dataLabels: {
            enabled: false
          },
          showInLegend: true
        },

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
              // [0, 'rgb(255, 255, 255)'],
              // [1, 'rgb(200, 200, 255)']
            ]
          },
        }
      },


      series: [{
        type: 'pie',
        name: "Device",
        colorByPoint: true,
        data: x,
      }],


      drilldown: {
        drillUpButton: {
          relativeTo: 'spacingBox',
          position: {
            y: 0,
          },
          theme: {
            fill: '#fff',
            'stroke-width': 1,
            stroke: '#e94265',
            r: 0,
            states: {
              hover: {
                fill: '#fff'
              },
              select: {
                stroke: '#039',
                fill: '#bada55'
              }
            }
          }
        },


        series: y
      }
    });
  }

  geogetchart(x, y, z) {
    const that = this;
    Highcharts.chart("container4", {
      chart: {
        renderTo: 'container4',
        marginTop: 30,
        // marginLeft: 7,
        plotShadow: false,
        type: 'pie',
        style: {
          fontFamily: 'Noto sans KR',
        },
        //     scrollablePlotArea: {
        //     minWidth: 500,
        //     scrollPositionX: 1
        // }
        events: {
        }
      },

      colors: ['#29a3fb', '#ffa115', '#27cb71e3', '#8d70fa', '#e94265', '#a9a9a9', '#22c6db', '#F38FB3', '#6691E1', '#86948d'],

      title: {
        text: ''
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

      xAxis: {
        categories: z.dates,

        type: 'linear',
        labels: {
          overflow: 'justify'
        },
        gridLineColor: 'transparent',
        lineWidth: 0,
        tickWidth: 0,
        gridLineWidth: 0
      },


      yAxis: {
        title: {
          text: 'Estimated Earnings ($)'
        },
        showEmpty: false
      },


      tooltip: {
        valuePrefix: '$'
      },


      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          borderWidth: 0,
          tooltip: {
            headerFormat: '<span>Earnings By {series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">● {point.name}</span> : <b>${point.y:,.f}</b><br/>',
          },
          dataLabels: {
            enabled: false
          },
          showInLegend: true
        },

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
              // [0, 'rgb(255, 255, 255)'],
              // [1, 'rgb(200, 200, 255)']
            ]
          },
        }
      },


      series: [{
        type: 'pie',
        name: "Geo",
        colorByPoint: true,
        data: x,
      }],


      drilldown: {
        drillUpButton: {
          relativeTo: 'spacingBox',
          position: {
            y: 0,
          },
          theme: {
            fill: '#fff',
            'stroke-width': 1,
            stroke: '#e94265',
            r: 0,
            states: {
              hover: {
                fill: '#fff'
              },
              select: {
                stroke: '#039',
                fill: '#bada55'
              }
            }
          }
        },
        series: y

      }
    });

  }
  // end end


  ngOnInit() {
    // var chart = Highcharts.chart("container", this.chartOptions);
    // var chart = Highcharts.chart("container1", this.chartOptions1);
    // var chart = Highcharts.chart("container2", this.chartOptions2);
    // var chart = Highcharts.chart("container3", this.chartOptions3);
    // var chart = Highcharts.chart("container4", this.chartOptions4);



    this.date = this.datePipe.transform(localStorage.getItem('startdate'), 'd MMM') + ' - ' + this.datePipe.transform(localStorage.getItem('enddate'), 'd MMM, Y');

    
        this._auxoDashboardService.auxodashboardTopBox(localStorage.getItem('uniq_id'), localStorage.getItem('child_net_code'), localStorage.getItem('range'), localStorage.getItem('startdate'), localStorage.getItem('enddate')).subscribe(dataResult => {
          if (dataResult['status_code'] == '200') {
            this.topDatahead(dataResult);
            this.isSpinnerVisibleTopBox = false;
          } else {
            this.isSpinnerVisibleTopBox = false;
          }
        });
        this._auxoDashboardService.auxoDashboardAdtypes(localStorage.getItem('startdate'), localStorage.getItem('enddate'), localStorage.getItem('uniq_id'), localStorage.getItem('child_net_code'), localStorage.getItem('range'))
        .subscribe(dataResult => {
  
          if (dataResult['status_code'] == '200') {
            this.graphrootdata = dataResult['data']["level1"];
            this.lvl1data1 = dataResult['data']['finaldata'];
            this.graphdatelvl3 = dataResult['data']["level3_dates"];
            this.getchart(this.graphrootdata, this.lvl1data1, this.graphdatelvl3);
            this.isSpinnerVisibleAdtype = false;
          } else {
            this.isSpinnerVisibleAdtype = false;
          }
  
        });
        this._auxoDashboardService.auxoDashboardAdunits(localStorage.getItem('startdate'), localStorage.getItem('enddate'), localStorage.getItem('uniq_id'), localStorage.getItem('child_net_code'), localStorage.getItem('range'))
        .subscribe(dataResult => {
  
          if (dataResult['status_code'] == '200') {
            this.adunitgraphrootdata = dataResult['data']["level1"];
            this.adunitlvl1data1 = dataResult['data']['level3'];
            this.adunitgraphdatelvl3 = dataResult['data']["level3_dates"];
            this.adunitgetchart(this.adunitgraphrootdata, this.adunitlvl1data1, this.adunitgraphdatelvl3);
            this.isSpinnerVisibleAdunit = false;
          } else {
            this.isSpinnerVisibleAdunit = false;
          }
  
        });
        this._auxoDashboardService.auxoDashboardSites(localStorage.getItem('startdate'), localStorage.getItem('enddate'), localStorage.getItem('uniq_id'), localStorage.getItem('child_net_code'), localStorage.getItem('range'))
        .subscribe(dataResult => {
  
          if (dataResult['status_code'] == '200') {
            this.sitesgraphrootdata = dataResult['data']["level1"]; 
            this.siteslvl1data1 = dataResult['data']['finaldata'];
            this.sitesgetchart(this.sitesgraphrootdata, this.siteslvl1data1);
            this.isSpinnerVisiblesites = false;
          }else {
            this.isSpinnerVisiblesites = false;
          }
  
        });
        this._auxoDashboardService.auxoDashboardDevice(localStorage.getItem('startdate'), localStorage.getItem('enddate'), localStorage.getItem('uniq_id'), localStorage.getItem('child_net_code'), localStorage.getItem('range'))
        .subscribe(dataResult => {
  
          if (dataResult['status_code'] == '200') {
            this.devicegraphrootdata = dataResult['data']["level1"];
            this.devicelvl1data1 = dataResult['data']['finaldata'];
            this.devicegraphdatelvl3 = dataResult['data']["level3_dates"];
            this.devicegetchart(this.devicegraphrootdata, this.devicelvl1data1,this.devicegraphdatelvl3);
            this.isSpinnerVisibledevice = false;
          }else {
            this.isSpinnerVisibledevice = false;
          }
  
        });
        this._auxoDashboardService.auxoDashboardGeo(localStorage.getItem('startdate'), localStorage.getItem('enddate'), localStorage.getItem('uniq_id'), localStorage.getItem('child_net_code'), localStorage.getItem('range'))
      .subscribe(dataResult => {

        if (dataResult['status_code'] == '200') {
          this.geographrootdata = dataResult['data']["level1"];
          this.geolvl1data1 = dataResult['data']['finaldata'];
          this.geographdatelvl3 = dataResult['data']["level3_dates"];
          this.geogetchart(this.geographrootdata, this.geolvl1data1, this.geographdatelvl3);
          this.isSpinnerVisiblegeo = false;
        } else {
          
          this.isSpinnerVisiblegeo = false;
        }

      });

      this._auxoDashboardService.auxoDashboardoverview(localStorage.getItem('startdate'), localStorage.getItem('enddate'), localStorage.getItem('uniq_id'), localStorage.getItem('child_net_code'), localStorage.getItem('range'))
      .subscribe(dataResult => {
        if (dataResult['status_code'] == '200') {
          this.tabledata = dataResult['data']["content_table_data"];
          this.graphdata = dataResult['data']["content_graph_date"];

          this.getgraphdata(this.graphdata);
          this.dataSource = new MatTableDataSource(this.tabledata);
          this.isSpinnerVisible = false;
        } else if (dataResult['status_code'] == '422') {
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

      },
        error => this.errorMsg = error);
  }
  topDatahead(dataResult) {
    this.earning10day = dataResult['datatop']['earning10day'];
    this.avgEarning10day = dataResult['datatop']['avgEarning10day'];
    this.CPM10day = dataResult['datatop']['CPM10day'];

    this.earning10dayUpDownPer = dataResult['datatop']['Earning10dayUpDownPer'];
    this.earning10dayUpDown = dataResult['datatop']['Earning10dayUpDown'];

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
  // Table start
  displayedColumns = ['date', 'adr', 'adimr', 'fillrate', 'covg', 'clicks_madr', 'ecpmx', 'revenue'];
  // dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  dataSource: MatTableDataSource<Element[]>;
  // Table End
}

// Table start
export interface Element {
  date: string;
  adr: number;
  adimr: number;
  fillrate: number;
  covg: string;
  clicks_madr: string;
  ecpmx: string;
  revenue: string
}
// const ELEMENT_DATA: Element[] = [
//   { date: "1 Dec, 2021", adr: 263789, adimr: 103875, fillrate: 41.09, covg:'62.76', clicks_madr: '1.21', ecpmx: '0.35', revenue:'36.48' },
//   { date: "2 Dec, 2021", adr: 263789, adimr: 103875, fillrate: 41.09, covg:'62.76', clicks_madr: '1.21', ecpmx: '0.35', revenue:'36.48' }
  
// ];

// Table End