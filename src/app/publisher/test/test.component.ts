import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as Highcharts from 'highcharts/highmaps';
import { Chart } from 'angular-highcharts';
import Drilldown from 'highcharts/modules/drilldown';
Drilldown(Highcharts);
import { DatePipe } from '@angular/common';
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions, TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';
declare var $: any;
import { DialogDynamicComponent } from '../dialog-dynamic/dialog-dynamic.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { saveAs } from 'file-saver';
import { AppSettings } from '../../global/app-url';

// Tooltip start
export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 1000,
  hideDelay: 1000,
  touchendHideDelay: 1000,
};
// tool tip end

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  // Tooltip start
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults }
  ],
  // tool tip end
})

export class TestComponent implements OnInit {
  public test1: any;
  constructor(private datePipe: DatePipe, public dialog: MatDialog) { }
  Highcharts: typeof Highcharts = Highcharts;

  chartOptions1: Highcharts.Options = {
    chart: {
      renderTo: "trafficthreeA",
      type: "line",
      events: {
        drilldown: function (e) {
          var chart = this;
          var drilldownseries = [{
            "name": 'Impression',
            "id": 'levelA2',
            "data": [
              ['01 Mar', 41.10],
              ['02 Mar', 21.12],
              ['03 Mar', 11.15],
              ['04 Mar', 20.14],
              ['05 Mar', 11.12],
              ['06 Mar', 10.14],
              ['07 Mar', 10.14]

            ],
            marker:
            {
              enabled: false,
              symbol: 'circle'
            }
          },
          {
            "name": 'Cpm',
            "id": 'levelA2',
            "data": [
              ['01 Mar', 21.10],
              ['02 Mar', 11.12],
              ['03 Mar', 1.15],
              ['04 Mar', 40.14],
              ['05 Mar', 91.12],
              ['06 Mar', 30.14],
              ['07 Mar', 20.14]

            ],
            marker:
            {
              enabled: false,
              symbol: 'circle'
            }
          }
          ]

          if (!e.seriesOptions) {
            // @ts-ignore
            chart.addSingleSeriesAsDrilldown(e.point, drilldownseries[0]);
            // @ts-ignore
            chart.addSingleSeriesAsDrilldown(e.point, drilldownseries[1]);
            // @ts-ignore
            chart.applyDrilldown();
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
      type: 'category',
      labels: {
        // rotation: -45,
        overflow: 'justify'
      },
      gridLineColor: 'transparent',
      lineWidth: 0,
      tickWidth: 0,
      gridLineWidth: 0
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


    tooltip: {
      valuePrefix: '$'
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: false,
        },
        tooltip: {
          headerFormat: '<span>{series.name}</span><br>',
          pointFormat: '<span style="color:{point.color}">● {point.name}</span> : <b>${point.y:.f}</b><br/>',
        },
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
      allowPointSelect: true,
      name: 'New',
      type: 'column',
      data: [{
        name: 'Direct',
        y: 10.12,
        drilldown: 'levelA2'
      }, {
        name: 'Refferal',
        y: 12.14,
        drilldown: 'Refferal0'
      }, {
        name: 'Organic',
        y: 14.14,
        drilldown: 'Organic0'
      }, {
        name: 'Social',
        y: 16.14,
        drilldown: 'Social0'
      }, {
        name: 'Others',
        y: 17.14,
        drilldown: 'Others0'
      }]
    },
    {
      name: 'Returning',
      type: 'column',
      data: [{
        name: 'Direct',
        y: 10.11,
        drilldown: 'Direct1'
      }, {
        name: 'Refferal',
        y: 11.12,
        drilldown: 'Refferal1'
      }, {
        name: 'Organic',
        y: 13.13,
        drilldown: 'Organic1'
      }, {
        name: 'Social',
        y: 12.14,
        drilldown: 'Social1'
      }, {
        name: 'Others',
        y: 14.14,
        drilldown: 'Others1'
      }]
    },
    {
      name: 'Loyal',
      type: 'column',
      data: [{
        name: 'Direct',
        y: 10.11,
        drilldown: 'Direct2'
      }, {
        name: 'Refferal',
        y: 11.12,
        drilldown: 'Refferal2'
      }, {
        name: 'Organic',
        y: 12.10,
        drilldown: 'Organic2'
      }, {
        name: 'Social',
        y: 13.12,
        drilldown: 'Social2'
      }, {
        name: 'Others',
        y: 15.14,
        drilldown: 'Others2'
      }]
    }],

  }


  getchart() {
    // @ts-ignore
    Highcharts.chart('container', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Highcharts multi-series drilldown'
      },
      subtitle: {
        text: 'The <em>allowPointDrilldown</em> option makes point clicks drill to the whole category'
      },
      xAxis: {
        type: 'category'
      },

      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true
          }
        }
      },

      series: [{
        name: '2010',
        data: [{
          name: 'Republican',
          y: 5,
          drilldown: 'republican-2010'
        }, {
          name: 'Democrats',
          y: 2,
          drilldown: 'democrats-2010'
        }, {
          name: 'Other',
          y: 4,
          drilldown: 'other-2010'
        }]
      }, {
        name: '2014',
        data: [{
          name: 'Republican',
          y: 4,
          drilldown: 'republican-2014'
        }, {
          name: 'Democrats',
          y: 4,
          drilldown: 'democrats-2014'
        }, {
          name: 'Other',
          y: 4,
          drilldown: 'other-2014'
        }]
      }],
      drilldown: {
        allowPointDrilldown: false,
        series: [{
          id: 'republican-2010',
          name: 'Republican 2010',
          type: 'line',
          data: [
            ['East', 4],
            ['West', 2],
            ['North', 1],
            ['South', 4]
          ]
        }, {
          id: 'democrats-2010',
          name: 'Republican 2010',
          type: 'line',
          data: [
            ['East', 6],
            ['West', 2],
            ['North', 2],
            ['South', 4]
          ]
        }, {
          id: 'other-2010',
          name: 'Other 2010',
          type: 'line',
          data: [
            ['East', 2],
            ['West', 7],
            ['North', 3],
            ['South', 2]
          ]
        }, {
          id: 'republican-2014',
          name: 'Republican 2014',
          type: 'line',
          data: [
            ['East', 2],
            ['West', 4],
            ['North', 1],
            ['South', 7]
          ]
        }, {
          id: 'democrats-2014',
          name: 'Democrats 2014',
          type: 'line',
          data: [
            ['East', 4],
            ['West', 2],
            ['North', 5],
            ['South', 3]
          ]
        }, {
          id: 'other-2014',
          name: 'Other 2014',
          type: 'line',
          data: [
            ['East', 7],
            ['West', 8],
            ['North', 2],
            ['South', 2]
          ]
        }]
      }
    });
  }


  ngOnInit() {
    this.getchart();
    var chart = Highcharts.chart("trafficthreeA", this.chartOptions1);
  }
}