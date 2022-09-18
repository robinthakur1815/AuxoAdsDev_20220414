import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as Highcharts from 'highcharts/highmaps';
import Drilldown from 'highcharts/modules/drilldown';
Drilldown(Highcharts);
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions, TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ProDashboardDisplayGeoService } from './prodashboard-display-geo.service';
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
  selector: 'app-prodashboard-display-geo',
  templateUrl: './prodashboard-display-geo.component.html',
  styleUrls: ['./prodashboard-display-geo.component.scss'],
  // Tooltip start
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults }
  ],
  // tool tip end
})


export class ProDashboardDisplayGeoComponent implements OnInit {
  // Tooltip start
  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  showDelay = new FormControl(1000);
  hideDelay = new FormControl(2000);

  disabled = new FormControl(true);

  message1 = new FormControl('Info about the action');
  position1 = new FormControl(this.positionOptions[0]);

  tablerootdata = [];
  graphrootdata = [];
  sumupdata = [];
  lvl1data1 = [];
  lvl2data = [];
  level2data = [];
  level3data = [];
  graphdatelvl3 = [];
  date: string;
  displaydeviceone: any;
  isSpinnerVisible: boolean = false;
  message: string;
  sumuplvldata = { "adimrlvl1": "", "ecpmxlvl1": "", "revenue_cmsSharelvl1": ""};
  constructor(private _displayGeoService: ProDashboardDisplayGeoService, private datePipe: DatePipe, public dialog: MatDialog) { }
  expandContent = true;
  Highcharts: typeof Highcharts = Highcharts;

  // Display Geo start graph
  getchart(x, y, z, level2) {
    const that = this;
    Highcharts.chart("container", {
      chart: {
        renderTo: 'container',
        marginTop: 30,
        plotShadow: false,
        type: 'pie',
        style: {
          fontFamily: 'Noto sans KR',
        },
        
        events: {
          drilldown: function (e) {

            
            if (e.seriesOptions.name.search("By") > -1) {
              const level3fil = level2.filter(x => x.level1value === e.seriesOptions.name.split('By')[0] && x.rep_namelvl1 === e.seriesOptions.name.split('By')[1]);

              that.level3data = level3fil[0].innerdatalvl1;
              that.sumuplvldata = level3fil[0];
              $("#level1").hide();
              $("#level2").hide();
              $("#level3").show();
            } else {

              const level2fil = level2.filter(p => p.level1value === e.seriesOptions.name);
              that.level2data = level2fil;
              $("#level1").hide();
              $("#level3").hide();
              $("#level2").show();
            }

          },
          drillup: function (e) {

            if (this.series[0].name.search("By") > -1) {
              $("#level1").hide();
              $("#level3").hide();
              $("#level2").show();
            }
            else {
              $("#level3").hide();
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
    this.isSpinnerVisible = true;
    // var chart = Highcharts.chart("container", this.chartOptions);
    this.date = this.datePipe.transform(localStorage.getItem('startdate'), 'd MMM') + ' - ' + this.datePipe.transform(localStorage.getItem('enddate'), 'd MMM, Y');
    this._displayGeoService.getProDisplayGeo(localStorage.getItem('startdate'), localStorage.getItem('enddate'), localStorage.getItem('uniq_id'))
      .subscribe(dataResult => {

        if (dataResult['status_code'] == '200') {
          this.graphrootdata = dataResult['data']["level1"];
          this.tablerootdata = dataResult['data']["geo_table_data"];
          this.sumupdata = dataResult['data']["sum_table_data"];
          this.lvl1data1 = dataResult['data']['finaldata'];
          this.lvl2data = dataResult['data']['geo_table_data_lvl1'];
          this.graphdatelvl3 = dataResult['data']["level3_dates"];
          this.getchart(this.graphrootdata, this.lvl1data1, this.graphdatelvl3, this.lvl2data);
          this.isSpinnerVisible = false;
        } else if (dataResult['status_code'] == '422') {

          this.message = dataResult['message'];
          this.dialog.open(DialogDynamicComponent,

            {
              width: '450px',
              data: { message: this.message }
            });

          this.isSpinnerVisible = false;
        } else {
          this.message = "Something went wrong";
          this.dialog.open(DialogDynamicComponent,

            {
              width: '450px',
              data: { message: this.message }
            });
          this.isSpinnerVisible = false;
        }

      });
  }

  findDetails(data) {
    const filterdata = this.tablerootdata.filter(y => y.country === data.country);
    return filterdata[0].innerdata;
  }
  level2dataexp(e) {
    const filterdata = this.lvl2data.filter(y => y.rep_namelvl1 === e.rep_namelvl1 && y.level1value === e.level1value);
    return filterdata[0].innerdatalvl1;
  }
  downloadCyberAdsGeo() {

    //api
    this._displayGeoService.downCyberAdsGeo(localStorage.getItem('startdate'), localStorage.getItem('enddate'), localStorage.getItem('uniq_id'))
      .subscribe(dataResult => {

        if (dataResult['status_code'] == '200') {
          const fileName = dataResult['data'];
          const fileUrl = AppSettings.API_STARTPOINT + '/assets/api/admin/user/pro-revenue/upload/' + fileName;

          saveAs(fileUrl, fileName);
        } else if (dataResult['status_code'] == '422') {

          this.message = dataResult['message'];
          this.dialog.open(DialogDynamicComponent,

            {
              width: '450px',
              data: { message: this.message }
            });


        } else {
          this.message = "Something went wrong";
          this.dialog.open(DialogDynamicComponent,

            {
              width: '450px',
              data: { message: this.message }
            });

        }

      })
  }
}

