import { Component, OnInit, ViewEncapsulation,ViewChild, ElementRef } from '@angular/core';
import * as Highcharts from 'highcharts/highmaps';
import Drilldown from 'highcharts/modules/drilldown';
Drilldown(Highcharts);
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions, TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ProDashDeviceService } from './prodashboard-display-device.service';
declare var $: any;
import { DialogDynamicComponent } from '../dialog-dynamic/dialog-dynamic.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { saveAs } from 'file-saver';
import { AppSettings } from '../../global/app-url';
import { Router } from '@angular/router';
import * as moment from 'moment-timezone';
import { DateRangePickerComponent } from '../daterangepicker/daterangepicker.component';
// Tooltip start
export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 100,
  hideDelay: 100,
  touchendHideDelay: 100,
};
// tool tip end

@Component({
  selector: 'app-prodashboard-display-device',
  templateUrl: './prodashboard-display-device.component.html',
  styleUrls: ['./prodashboard-display-device.component.scss'],
  // Tooltip start
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults }
  ],
  // tool tip end
})


export class ProDashboardDisplayDeviceComponent implements OnInit {
  // @ViewChild("ngx-daterangepicker-material") divView: ElementRef;
  tablerootdata = [];
  graphrootdata = [];
  sumupdata = [];
  lvl1data1 = [];
  level3data = [];
  graphdatelvl3 = [];
  date: string;
  displaydeviceone: any;
  isSpinnerVisible: boolean = false;
  messageForDialog: string;
  sumuplvldata = { "tot_lineitmlvl_imp": "", "tot_lineitmlvl_cpm": "", "tot_lineitmlvl_rev": "" };
  constructor(private _proDeviceService: ProDashDeviceService, private datePipe: DatePipe, public dialog: MatDialog, private router: Router,private elementRef: ElementRef) { }
  // Tooltip start
  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  showDelay = new FormControl(1000);
  hideDelay = new FormControl(2000);

  disabled = new FormControl(true);

  message = new FormControl('Info about the action');


  position1 = new FormControl(this.positionOptions[0]);
  // Tooltip end

  expandContent = true;


  Highcharts: typeof Highcharts = Highcharts;
  // prodashboard display device start graph
  getchart(x, y, z, level) {
    
// alert("hello");
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
        //     scrollablePlotArea: {
        //     minWidth: 500, 
        //     scrollPositionX: 1
        // }
        events: {
          
          drilldown: function (e) {
            
            $("#level1").hide();
            const level3fil = level.filter(p => p.device === e.seriesOptions.name);
            that.level3data = level3fil[0].innerdata;
            that.sumuplvldata = level3fil[0];
            $("#level2").show();

          },
          drillup: function (e) {

            if (this.series[0].name.search("By") > -1) {
              $("#level1").hide();
              $("#level2").show();
            }
            else {
              $("#level2").hide();
              $("#level1").show();
            }

          }
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
            pointFormat: '<span style="color:{point.color}">??? {point.name}</span> : <b>${point.y:,.f}</b><br/>',
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
        name: 'Device',
        colorByPoint: true,
        //   xAxis: 0,
        data: x
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

      // end end
    });
  }



  ngOnInit() {
    
    this.isSpinnerVisible = true;
    //for date
    this.date = this.datePipe.transform(localStorage.getItem('startdate'), 'd MMM') + ' - ' + this.datePipe.transform(localStorage.getItem('enddate'), 'd MMM , Y');

    //api
    this._proDeviceService.getProDevice(localStorage.getItem('uniq_id'), localStorage.getItem('startdate'), localStorage.getItem('enddate'))
      .subscribe(dataResult => {

        if (dataResult['status_code'] == '200') {
          this.graphrootdata = dataResult['data']["level1"];
          this.tablerootdata = dataResult['data']["hbd_table_data"];
          this.sumupdata = dataResult['data']["sum_table_data"];
          this.lvl1data1 = dataResult['data']['level2'];
          this.graphdatelvl3 = dataResult['data']["level3_dates"];
          this.getchart(this.graphrootdata, this.lvl1data1, this.graphdatelvl3, this.tablerootdata);
          this.isSpinnerVisible = false;
        } else if (dataResult['status_code'] == '422') {

          this.messageForDialog = dataResult['message'];
          this.dialog.open(DialogDynamicComponent,

            {
              width: '450px',
              data: { message: this.messageForDialog }
            });

          this.isSpinnerVisible = false;
        } else {
          this.messageForDialog = "Something went wrong";
          this.dialog.open(DialogDynamicComponent,

            {
              width: '450px',
              data: { message: this.messageForDialog }
            });
          this.isSpinnerVisible = false;
        }

      });
  }

  findDetails(data) {

    const filterdata = this.tablerootdata.filter(y => y.device === data.device);
    return filterdata[0].innerdata;
  }
  downloadProDevice() {

    //api
    this._proDeviceService.downProDevice(localStorage.getItem('startdate'), localStorage.getItem('enddate'), localStorage.getItem('uniq_id'))
      .subscribe(dataResult => {

        if (dataResult['status_code'] == '200') {
          const fileName = dataResult['data'];
          const fileUrl = AppSettings.API_STARTPOINT + '/assets/api/admin/user/pro-revenue/upload/' + fileName;

          saveAs(fileUrl, fileName);
        } else if (dataResult['status_code'] == '422') {

          this.messageForDialog = dataResult['message'];
          this.dialog.open(DialogDynamicComponent,

            {
              width: '450px',
              data: { message: this.messageForDialog }
            });


        } else {
          this.messageForDialog = "Something went wrong";
          this.dialog.open(DialogDynamicComponent,

            {
              width: '450px',
              data: { message: this.messageForDialog }
            });

        }

      })
  }

}
