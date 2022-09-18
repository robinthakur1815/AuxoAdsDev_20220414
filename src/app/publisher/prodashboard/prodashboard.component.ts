import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Chart } from 'angular-highcharts';
import Drilldown from 'highcharts/modules/drilldown';
Drilldown(Highcharts);
import * as Highcharts from 'highcharts/highmaps';
import { MatTableDataSource } from '@angular/material/table';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions, TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ProDashboardService } from './prodashboard.service';
declare var $: any;
import { DialogDynamicComponent } from '../dialog-dynamic/dialog-dynamic.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppSettings } from '../../global/app-url';
// Tooltip start
export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
    showDelay: 100,
    hideDelay: 100,
    touchendHideDelay: 100,
};
// tool tip end

@Component({
    selector: 'app-prodashboard',
    templateUrl: './prodashboard.component.html',
    styleUrls: ['./prodashboard.component.scss'],
    // Tooltip start
    encapsulation: ViewEncapsulation.None,
    providers: [
        { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults }
    ],
    // tool tip end
})

export class ProDashboardComponent implements OnInit {
    // Tooltip start
    positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
    position = new FormControl(this.positionOptions[0]);

    showDelay = new FormControl(1000);
    hideDelay = new FormControl(2000);

    disabled = new FormControl(true);

    message = new FormControl('Info about the action');


    position1 = new FormControl(this.positionOptions[0]);
    // Tooltip end
    overview = [];
    devices = [];
    geo = [];
    lvl1 = [];
    lvl1geo = [];
    graphdatelvl3 = [];
    graphdatelvl3geo = [];
    isSpinnerVisible: boolean = false;
    messageForDialog: string;
    date: string;
    public prodashboardone: any;
    public prodashboardtwo: any;
    public prodashboardthree: any;
    public prodashboardfour: any;
    public prodashboardfive: any;
    public prodashboardsix: any;
    public HBwithDDhbd_graph_data: any;
    public HBwithDDdirect_graph_data: any;
    public HBwithDDtabledata: any;

    adunitgraphrootdata = [];
    adunitlvl1data1 = [];
    adunitgraphdatelvl3 = [];

    public isSpinnerVisible1: boolean = true;
    public isSpinnerVisible2: boolean = true;
    public isSpinnerVisible3: boolean = true;
    public isSpinnerVisible4: boolean = true;
    public isSpinnerVisibleAdunit: boolean = true;

    public proVarmsg: any;


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




    //Overview
    getOverviewGraph(dataOver) {

        this.prodashboardsix = new Chart({
            chart: {
                marginRight: 30,
                //   marginRight:20,
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
                // layout: 'vertical',
                // align: 'right',
                // verticalAlign: 'top',
                // y: 50,
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
                categories: dataOver.date,

                type: 'datetime',
                labels: {
                    overflow: 'justify'
                }
            },

            yAxis: {
                title: {
                    text: 'Estimated Earnings($)'
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
                            // [0, Highcharts.getOptions().colors[0]],
                            // [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                }
            },


            series: [{
                name: 'Auxo Pro',
                type: 'area',
                data: dataOver.tot_revenue,
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
    // auxopro display device start graph
    Highcharts: typeof Highcharts = Highcharts;

    getDevicechart(x, y, z) {
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
                allowPointSelect: true,
                keys: ['name', 'y', 'selected', 'sliced'],
                name: 'Device',
                colorByPoint: true,
                //   xAxis: 0,
                data: x,
            }],
            drilldown: {
                drillUpButton: {
                    relativeTo: 'spacingBox',
                    position: {
                        y: 5,
                        x: 5
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
    getGeochart(x, y, z) {
        // auxopro display Geo start graph

        Highcharts.chart("container1", {
            chart: {
                renderTo: 'container1',
                marginTop: 30,
                // marginLeft: 7,
                plotShadow: false,
                type: 'pie',
                style: {
                    fontFamily: 'Noto sans KR',
                },

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
                data: x
            }],


            drilldown: {
                drillUpButton: {
                    relativeTo: 'spacingBox',
                    position: {
                        y: 5,
                        x: 5
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

    getHBwithDDchart(hb_data, dd_data) {
        this.prodashboardfive = new Chart({
            chart: {
                marginRight: 30,
                //   marginRight:20,
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
                // layout: 'vertical',
                // align: 'right',
                // verticalAlign: 'top',
                // y: 50,
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
                categories: hb_data.date,

                type: 'datetime',
                labels: {
                    overflow: 'justify'
                }
            },

            yAxis: {
                title: {
                    text: 'Estimated Earnings($)'
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
                            // [0, Highcharts.getOptions().colors[0]],
                            // [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                }
            },


            series: [{
                name: 'Direct Deal',
                type: 'area',
                data: dd_data.tot_revenue,
                marker: {
                    enabled: false,
                    symbol: 'circle'
                },
            }, {
                name: 'Header Bidder',
                type: 'area',
                data: hb_data.tot_revenue,
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
    adunitgetchart(x, y, z) {
        const that = this;
        Highcharts.chart("containerAdunit", {
            chart: {
                renderTo: 'containerAdunit',
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
                allowPointSelect: true,
                keys: ['name', 'y', 'selected', 'sliced'],
                name: 'Ad Units',
                colorByPoint: true,
                //   xAxis: 0,
                data: x
            }],

            drilldown: {

                drillUpButton: {
                    relativeTo: 'spacingBox',
                    position: {
                        y: 5,
                        x: 5
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
    constructor(breakpointObserver: BreakpointObserver, private _ProService: ProDashboardService, private datePipe: DatePipe, public dialog: MatDialog) {
        // Table start
        breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
            this.displayedColumns = result.matches ?
                ['hd_date', 'dd_impression', 'dd_cpm', 'dd_reveune', 'hd_impression', 'hd_cpm', 'hd_reveune', 'total_revenue'] :
                ['hd_date', 'dd_impression', 'dd_cpm', 'dd_reveune', 'hd_impression', 'hd_cpm', 'hd_reveune', 'total_revenue'];
        });
        // Table End

    }
    earningGraph(data) {
        this.prodashboardone = new Chart({
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
        this.prodashboardtwo = new Chart({
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
        this.prodashboardthree = new Chart({
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
        this.prodashboardfour = new Chart({
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


        let promises = [];

        this._ProService.getProDashHBwithDD(localStorage.getItem('startdate'), localStorage.getItem('enddate'), localStorage.getItem('uniq_id'))
            .subscribe(dataResult => {

                if (dataResult['status_code'] == '200') {

                    this.HBwithDDhbd_graph_data = dataResult['data']["hbd_graph_data"];
                    this.HBwithDDdirect_graph_data = dataResult['data']["direct_graph_data"];
                    this.HBwithDDtabledata = dataResult['data']['all_table_data'];
                    this.dataSource = new MatTableDataSource(this.HBwithDDtabledata);
                    this.getHBwithDDchart(this.HBwithDDhbd_graph_data, this.HBwithDDdirect_graph_data);
                    this.topDatahead(dataResult);
                    this.isSpinnerVisible1 = false;
                } else {
                    this.topDatahead(dataResult);
                    this.isSpinnerVisible1 = false;
                    this.proVarmsg = dataResult['message'];
                    this.dialog.open(DialogDynamicComponent,
                        {
                            width: '450px',
                            data: { message: this.proVarmsg }
                        });
                }

            });
        //this.isSpinnerVisible = true;
        this.date = this.datePipe.transform(localStorage.getItem('startdate'), 'd MMM') + ' - ' + this.datePipe.transform(localStorage.getItem('enddate'), 'd MMM, Y');

        this._ProService.getProDashoverview(localStorage.getItem('startdate'), localStorage.getItem('enddate'), localStorage.getItem('uniq_id'))
            .subscribe(dataResult => {

                if (dataResult['status_code'] == '200') {

                    this.overview = dataResult['data']["hbd_graph_data"];
                    this.getOverviewGraph(this.overview);
                    this.isSpinnerVisible2 = false;
                } else {
                    this.isSpinnerVisible2 = false;
                    
                }

            });

        this._ProService.getProDashDevice(localStorage.getItem('startdate'), localStorage.getItem('enddate'), localStorage.getItem('uniq_id'))
            .subscribe(dataResult => {

                if (dataResult['status_code'] == '200') {

                    this.devices = dataResult['data']["level1"];
                    this.lvl1 = dataResult['data']['level2'];
                    this.graphdatelvl3 = dataResult['data']["level3_dates"];
                    this.getDevicechart(this.devices, this.lvl1, this.graphdatelvl3);
                    this.isSpinnerVisible3 = false;
                } else {
                    this.isSpinnerVisible3 = false;
                }

            });
        this._ProService.getProDashGeo(localStorage.getItem('startdate'), localStorage.getItem('enddate'), localStorage.getItem('uniq_id'))
            .subscribe(dataResult => {

                if (dataResult['status_code'] == '200') {

                    this.geo = dataResult['data']["level1"];
                    this.lvl1geo = dataResult['data']['finaldata'];
                    this.graphdatelvl3geo = dataResult['data']["level3_dates"];
                    this.getGeochart(this.geo, this.lvl1geo, this.graphdatelvl3geo);
                    this.isSpinnerVisible4 = false;
                } else {
                    this.isSpinnerVisible4 = false;
                }

            });
        this._ProService.getProDashAdunits(localStorage.getItem('startdate'), localStorage.getItem('enddate'), localStorage.getItem('uniq_id')).subscribe(dataResult => {

            if (dataResult['status_code'] == '200') {
                this.adunitgraphrootdata = dataResult['data']["level1"];
                this.adunitlvl1data1 = dataResult['data']['level2'];
                this.adunitgraphdatelvl3 = dataResult['data']["level3_dates"];
                this.adunitgetchart(this.adunitgraphrootdata, this.adunitlvl1data1, this.adunitgraphdatelvl3);
                this.isSpinnerVisibleAdunit = false;
            } else {
                this.isSpinnerVisibleAdunit = false;
            }

        });
    }



    // Table start
    // displayedColumns = ['hd_date', 'dd_request', 'dd_cpm', 'dd_impression', 'hd_request', 'hd_cpm', 'hd_impression', 'hd_reveune'];
    displayedColumns = ['hd_date', 'dd_impression', 'dd_cpm', 'dd_reveune', 'hd_impression', 'hd_cpm', 'hd_reveune', 'total_revenue'];
    dataSource: MatTableDataSource<Element[]>;
    // dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
    // Table End
}

// Table start
export interface Element {
    hd_date: any;
    dd_request: any;
    dd_cpm: any;
    dd_impression: any;
    hd_request: any;
    hd_cpm: any;
    hd_impression: any;
    hd_reveune: any;
    dd_reveune: any;
}

// const ELEMENT_DATA: Element[] = [
//     { position: "6 April 2021", name: 263789, weight: 0.05, symbol: 41.09, coverage: 325037, ctr: 0.14, estimatedcpm: 36.27, estimatedrevenue: 421299 },
//     { position: "7 April 2021", name: 363789, weight: 0.03, symbol: 41.09, coverage: 325037, ctr: 0.14, estimatedcpm: 36.27, estimatedrevenue: 421299 },
//     { position: "8 April 2021", name: 264789, weight: 0.02, symbol: 41.09, coverage: 325037, ctr: 0.14, estimatedcpm: 36.27, estimatedrevenue: 421299 },
//     { position: "9 April 2021", name: 263789, weight: 0.01, symbol: 41.09, coverage: 325037, ctr: 0.14, estimatedcpm: 36.27, estimatedrevenue: 421299 },
//     { position: "10 April 2021", name: 463789, weight: 0.04, symbol: 41.09, coverage: 325037, ctr: 0.14, estimatedcpm: 36.27, estimatedrevenue: 421299 },
//     { position: "11 April 2021", name: 663789, weight: 0.05, symbol: 41.09, coverage: 325037, ctr: 0.14, estimatedcpm: 36.27, estimatedrevenue: 421299 },
//     { position: "12 April 2021", name: 13789, weight: 0.05, symbol: 41.09, coverage: 325037, ctr: 0.14, estimatedcpm: 36.27, estimatedrevenue: 421299 },
//     { position: "13 April 2021", name: 23789, weight: 0.01, symbol: 41.09, coverage: 325037, ctr: 0.14, estimatedcpm: 36.27, estimatedrevenue: 421299 },
//     { position: "14 April 2021", name: 63789, weight: 0.07, symbol: 41.09, coverage: 325037, ctr: 0.14, estimatedcpm: 36.27, estimatedrevenue: 421299 },
//     { position: "15 April 2021", name: 26389, weight: 0.05, symbol: 41.09, coverage: 325037, ctr: 0.14, estimatedcpm: 36.27, estimatedrevenue: 421299 },

// ];
// Table End