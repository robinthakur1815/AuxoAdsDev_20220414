import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { MatTableDataSource } from '@angular/material/table';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions, TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { KeyinsightsAudienceOverService } from './keyinsights-audience-overview.service';
declare var $: any;
import { DialogDynamicComponent } from '../dialog-dynamic/dialog-dynamic.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//import { saveAs } from 'file-saver';
import { AppSettings } from '../../global/app-url';
import Highcharts from 'highcharts';

// Tooltip start
export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
    showDelay: 1000,
    hideDelay: 1000,
    touchendHideDelay: 1000,
};
// tool tip end

@Component({
    selector: 'app-keyinsights-audience-overview',
    templateUrl: './keyinsights-audience-overview.component.html',
    styleUrls: ['./keyinsights-audience-overview.component.scss'],
    // Tooltip start
    encapsulation: ViewEncapsulation.None,
    providers: [
        { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults }
    ],
    // tool tip end
})

export class KeyinsightsAudienceOverviewComponent implements OnInit {
    userPageViewdata = [];
    userPro = [];
    userPagePro = [];
    dataDuration = [];
    dataPageSession = [];
    dataSessDuration = [];
    bounce_rate = [];
    page_load_data = [];
    donut_chart_data = [];
    tabulardata_bouncerate = [];
    pageviews = [];
    sessions = [];
    donutTotal = [];
    date: string;
    dateD: string;
    daterange: string;
    isSpinnerVisible: boolean = false;
    messageForDialog: string;
    date_range_userpageviews: any;

    // Tooltip start
    positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
    position = new FormControl(this.positionOptions[0]);

    showDelay = new FormControl(1000);
    hideDelay = new FormControl(2000);

    disabled = new FormControl(true);

    message = new FormControl('Info about the action');


    position1 = new FormControl(this.positionOptions[0]);
    // Tooltip end

    public userprofile0: any;
    public userprofile1: any;
    public userprofile1A: any;
    public userprofile2: any;
    public userprofile3: any;
    public userprofile4: any;
    public userprofile5: any;
    public userprofile6: any;


    //Users and PageViews Overview Chart
    getUserPageGraph(userPagedata) {
        this.userprofile0 = new Chart({
            chart: {
                marginTop: 30,
                marginRight: 25,
                // marginLeft: 65,
                zoomType: 'xy',
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
                categories: userPagedata.date,
                crosshair: true
            }],
            yAxis: [{
                labels: {
                    // format: '{value}M',
                },
                title: {
                    text: 'Number',
                }
            },
            // Secondary yAxis
            {
                title: {
                    text: '',
                },
                labels: {
                    format: '{value}',
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
                name: 'Users',
                type: 'column',
                // yAxis: 1,
                data: userPagedata.users,
                // tooltip: {
                //     valueSuffix: ' mm'
                // }
            }, {
                name: 'PageViews',
                type: 'area',
                marker: {
                    enabled: false,
                    symbol: 'circle'
                },
                data: userPagedata.pageviews,
                // tooltip: {
                //     valueSuffix: '°C'
                // }
            }]
        });

    }
    getAudienceUserPro(userPro) {
        //  Audience By User Profile
        this.userprofile1 = new Chart({
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
                //   valuePrefix: '%'
                //valueSuffix: ' '
                pointFormat: '<span style="color:{point.color}">●</span> {series.name} %: <b>{point.percentage:.1f} %</b></br><span style="color:{point.color}">●</span> {point.name} Users: <b>{point.y:,.0f}</b>'
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
                name: 'Users',
                type: 'pie',
                data: [
                    ['New', userPro[0].New],
                    ['Returning', userPro[0].Returning],
                    ['Loyal', userPro[0].Loyal],
                ]

            }]
        });
    }
    getPageUserPro(userPagePro) {
        //PageViews By Users Profile
        this.userprofile1A = new Chart({
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
                // valuePrefix: '$'
                //valueSuffix: ' '
                pointFormat: '<span style="color:{point.color}">●</span> {series.name} %: <b>{point.percentage:.1f} %</b></br><span style="color:{point.color}">●</span> {point.name} PageViews : <b>{point.y:,.0f}</b>'
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
                name: 'PageViews',
                type: 'pie',
                data: [
                    ['New', userPagePro[0].New],
                    ['Returning', userPagePro[0].Returning],
                    ['Loyal', userPagePro[0].Loyal],
                ]
            }]
        });
    }

    getSessionDuration(dataDuration, sess) {

        //  userprofile2 start
        this.userprofile2 = new Chart({
            chart: {
                marginTop: 30,
                // marginRight:20,
                // marginLeft: 65,
                zoomType: 'xy',
                style: {
                    fontFamily: 'Noto sans KR',
                },
                //     scrollablePlotArea: {
                //     minWidth: 500,
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
                categories: ['New', 'Returning', 'Loyal'],
                crosshair: true
            }],

            yAxis: [{
                labels: {
                    // format: '{value}M',
                },
                title: {
                    text: 'Session / Users',
                }
            },
            // Secondary yAxis
            {
                title: {
                    text: 'Avg. Session Duration (Sec)',
                },
                labels: {
                    format: '{value}',
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
                showInLegend: true,
                name: 'Session / Users',
                type: 'column',
                yAxis: 1,
                data: dataDuration.users,
                // tooltip: {
                //     valueSuffix: ' mm'
                // }
            }, {
                showInLegend: true,
                name: 'Avg. Session Duration',
                type: 'area',
                marker: {
                    enabled: false,
                    symbol: 'circle'
                },
                data: sess,
                tooltip: {
                    //valueSuffix: ' Sec'

                    pointFormat: '<span style="color:#ffa115">●</span> {series.name}: <b>{point.y:%H:%M:%S}</b>',
                }
            }]
        });
    }
    getPageSession(dataPageSession, pageViews, sessions) {
        //Pages / Session By User Profile
        this.userprofile3 = new Chart({
            chart: {
                marginTop: 30,
                marginRight: 25,
                // marginLeft: 65,
                zoomType: 'xy',
                style: {
                    fontFamily: 'Noto sans KR',
                }
                //     scrollablePlotArea: {
                //     minWidth: 500,
                //     scrollPositionX: 1,
                //     opacity: 0
                // }
            },

            // colors: ['#29a3fb' ,'#ffa115',  '#27cb71e3', '#8d70fa', '#e94265', '#a9a9a9', '#22c6db'],
            colors: ['#29a3fb'],

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
                categories: ['New', 'Returning', 'Loyal'],
                crosshair: true
            }],


            yAxis: [
                {
                    labels: {
                        // format: '{value} %'
                    },
                    title: {
                        text: 'Pages / Session',
                    },
                }],


            tooltip: {
                // valuePrefix: '$',   
                shared: true,
                formatter: function () {

                    return this.points.reduce(function (s, point) {
                        return s + '<br/><span style="color:#29a3fb">●</span> ' + point.series.name + ': <b>' +
                            point.y + '</b><br/><span style="color:#29a3fb">●</span> PageViews: <b>' + pageViews[point.point.index] + '</b><br/><span style="color:#29a3fb">●</span> Sessions: <b> ' + sessions[point.point.index] + '</b>';

                    }, '' + this.x);

                },
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
                showInLegend: false,
                name: 'Pages / Session',
                type: 'column',
                data: dataPageSession,

            },

            ]

        });

    }

    getBounceRate(dataBounce) {

        //Bounce Rate By User Profile
        this.userprofile4 = new Chart({
            chart: {
                marginTop: 30,
                marginRight: 25,
                // marginLeft: 65,
                zoomType: 'xy',
                style: {
                    fontFamily: 'Noto sans KR',
                }
                //     scrollablePlotArea: {
                //     minWidth: 500,
                //     scrollPositionX: 1,
                //     opacity: 0
                // }
            },

            // colors: ['#29a3fb' ,'#ffa115',  '#27cb71e3', '#8d70fa', '#e94265', '#a9a9a9', '#22c6db'],
            colors: ['#29a3fb'],

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
                categories: ['New', 'Returning', 'Loyal'],
                crosshair: true
            }],


            yAxis: [
                {
                    labels: {
                        // format: '{value} %'
                    },
                    title: {
                        text: 'Bounce Rate (%)',
                    },
                }],


            tooltip: {
                valueSuffix: ' %',
                shared: true,
                // pointFormat: '<span style="color:{point.color}">●</span> {series.name} : {point.y:,.1f} %' 
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
                showInLegend: false,
                name: 'Bounce Rate',
                type: 'column',
                data: dataBounce,
                // tooltip: {
                //     valueSuffix: ' mm'
                // }
            }]
        });
    }
    getPageLoad(dataPageLoad) {
        //Avg. Page Load Time Trend
        this.userprofile6 = new Chart({
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

            colors: ['#29a3fb', '#ffa115', '#27cb71e3', '#8d70fa', '#e94265', '#a9a9a9', '#22c6db'],

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
                },
            },

            // subtitle: {
            //     text: '',
            //     align: 'left'
            // },

            xAxis: {
                categories: dataPageLoad.date,

                type: 'datetime',
                labels: {
                    overflow: 'justify'
                }
            },

            yAxis: {
                title: {
                    text: 'Avg Page Load Time (Sec)'
                }
            },

            tooltip: {
                valueSuffix: ' ',
                //   pointFormat: '<span style="color:{point.color}">●</span> {series.name} : {point.y:,.1f}' 
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
                name: 'Sec ',
                type: 'area',
                data: dataPageLoad.time,
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
    getDonutDevice(dataDonut) {

        //  userprofile5 start
        this.userprofile5 = new Chart({
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
                //valueSuffix: ' %',
                pointFormat: '<span style="color:{point.color}">●</span> {series.name} %: <b>{point.percentage:.1f} %</b></br><span style="color:{point.color}">●</span> {point.name} Users: <b>{point.y:,.0f}</b>',
                shared: true,
                useHTML: true
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
                name: 'Users',
                type: 'pie',
                data: [
                    ['Mobile', dataDonut.Mobile],
                    ['Desktop', dataDonut.Desktop],
                    ['Tablet', dataDonut.Tablet]
                ]
            }]
        });
    }
    // table start 
    constructor(breakpointObserver: BreakpointObserver, private _keyAudienceOverService: KeyinsightsAudienceOverService, private datePipe: DatePipe, public dialog: MatDialog) {
        // table End

        Highcharts.setOptions({
            lang: {
                thousandsSep: ','
            }
        });
        // Table start
        breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
            this.displayedColumns2 = result.matches ?
                ['position2', 'curr', 'pre'] :
                ['position2', 'curr', 'pre'];
        });
        // Table End

    }
    displayedColumns2 = ['position2', 'curr', 'pre'];
    dataSource2: MatTableDataSource<Element2[]>;
    ngOnInit() {
        this.isSpinnerVisible = true;
        //api
        this._keyAudienceOverService.getAudienceOver(localStorage.getItem('uniq_id'), localStorage.getItem('anlytic_id'), localStorage.getItem('child_net_code'))
            .subscribe(dataResult => {

                if (dataResult['status_code'] == '200') {
                    this.userPageViewdata = dataResult['data']["user_pageviews_data"];
                    this.userPro = dataResult['data']["audience_user_profile"];
                    this.userPagePro = dataResult['data']["pageviews"];
                    this.dataDuration = dataResult['data']['session_user_duration'];
                    this.date_range_userpageviews = dataResult['data']['date_range_userpageviews'];
                    //var aa = dataResult['data']['session_duration'];
                    //var aa = ["40:00:00","61:00:02","65","74","77"];
                    //  var json = '["00:40","61","65"]',
                    //     dataString = JSON.parse(json),
                    //     data = [],
                    //     i;

                    // for (i = 0; i < dataString.length; i++) {
                    //   this.dataSessDuration[i] = +dataString[i];
                    // }
                    this.dataSessDuration = dataResult['data']['session_duration'];
                    //this.dataSessDuration = [12500,13500,61000];

                    this.dataPageSession = dataResult['data']['pages_per_session'];
                    this.bounce_rate = dataResult['data']['bounce_rate'];
                    this.page_load_data = dataResult['data']['page_load_data'];
                    this.donut_chart_data = dataResult['data']['donut_chart_data'];
                    this.pageviews = dataResult['data']['pageviews_tooltip'];
                    this.sessions = dataResult['data']['session'];
                    this.date = dataResult['data']["date_range"];
                    this.dateD = dataResult['data']["date_range_donut"];
                    this.getUserPageGraph(this.userPageViewdata);

                    if (this.userPro.length > 0) {
                        this.getAudienceUserPro(this.userPro);
                    }
                    if (this.userPagePro.length > 0) {
                        this.getPageUserPro(this.userPagePro);
                    }
                    if (this.dataDuration.length > 0 || this.dataSessDuration.length > 0) {
                        this.getSessionDuration(this.dataDuration, this.dataSessDuration);
                    }

                    this.getPageSession(this.dataPageSession, this.pageviews, this.sessions);
                    this.getBounceRate(this.bounce_rate);
                    this.getPageLoad(this.page_load_data);
                    this.getDonutDevice(this.donut_chart_data);






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


        //api
        this._keyAudienceOverService.getBounceOver(localStorage.getItem('uniq_id'), localStorage.getItem('anlytic_id'), localStorage.getItem('child_net_code'))
            .subscribe(dataResult => {

                if (dataResult['status_code'] == '200') {
                    this.daterange = dataResult['data']['daterange']
                    this.dataSource2 = new MatTableDataSource(dataResult['data']['tabulardata_bouncerate']);


                } else {
                    // this.messageForDialog = "Something went wrong"; 
                    // this.dialog.open(DialogDynamicComponent,

                    //   { 
                    //     width: '450px',
                    //     data:  {message:this.messageForDialog}
                    //   });  
                    //this.isSpinnerVisible = false;    
                }

            });
    }

    // Table start
    //displayedColumns2 = ['position2', 'name2', 'weight2'];
    // dataSource2 = new MatTableDataSource<Element2>(ELEMENT_DATA2);
}

export interface Element2 {
    position2: string;
    curr: number;
    pre: number;
}

// const ELEMENT_DATA2: Element2[] = [
//     { position2: "Mobile", name2: "74.92" , weight2: "76.54" },
//     { position2: "Desktop", name2: "82.96" , weight2: "83.54" },
//     { position2: "Tablet", name2: "77.95" , weight2: "85.54" },
// ];

// Table End