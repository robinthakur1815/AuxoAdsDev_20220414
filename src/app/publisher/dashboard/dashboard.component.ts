import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDynamicComponent } from '../dialog-dynamic/dialog-dynamic.component';
import { dashboardService } from './dasboard.service';
import { Chart } from 'angular-highcharts';
import Highcharts from 'highcharts';
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions, TooltipPosition } from '@angular/material/tooltip';
import { max } from 'lodash';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { BreakpointObserver } from '@angular/cdk/layout';
import { $ } from 'protractor';

// Tooltip start
export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
    showDelay: 1000,
    hideDelay: 1000,
    touchendHideDelay: 1000,
  };
  // tool tip end


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
     // Tooltip start
    encapsulation: ViewEncapsulation.None,
    providers: [
        { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults }
    ],
   // tool tip end
})
export class DashboardComponent implements OnInit {
    child_net_code = localStorage.getItem('child_net_code');
    childnetdash: boolean = false;
    message: string;
    date: string;
    public bankDetailStrip: boolean = false;

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
    public isSpinnerVisibleTopBox: boolean = true;



    public topboxearningGraph: any;
    public topboxcpmGraph: any;
    public topboxctrGraph: any;
    public topboxfilledGraph: any;
    public earningCPMtrend: any;
    public revenueadtype: any;
    public unfilledTrend: any;
    public advertiserTrend: any;


    
    public isSpinnerVisibleEarnT: boolean = true;
    public earnCPMTrendData: any;
    public earnCPMTrendDate: any;



    public isSpinnerVisiblePVD: boolean = true;
    public pageViewsByDevice: any;


    public isSpinnerVisibleUFT: boolean = true;
    public unfilledTrendGraphData: any;
    public unfilledTrendGraphDate: any;


    public isSpinnerVisibleAdType: boolean = true;
    public richmediaEarningAdType: number = 0;
    public richmediaCPMAdType: number = 0;
    public imageEarningAdType: number = 0;
    public imageCPMAdType: number = 0;
    public textEarningAdType: number = 0;
    public textCPMAdType: number = 0;
    public videoEarningAdType: number = 0;
    public videoCPMAdType: number = 0;
    public animatedEarningAdType: number = 0;
    public animatedCPMAdType: number = 0;
    public otherEarningAdType: number = 0;
    public otherCPMAdType: number = 0;


    public isSpinnerVisibleIB: boolean = true;
    public indbenchdata: any;
    public indbench_flag: any;


    public isSpinnerVisibleAT: boolean = true;
    public ATvertical: any;
    public ATimpression: any;
    public ATcpm: any;
    public ELEMENT_DATA1: Element1[] = [];




    constructor(private _dashboardService: dashboardService, public dialog: MatDialog,private datePipe: DatePipe,breakpointObserver: BreakpointObserver) {
        Highcharts.setOptions({
            lang: {
                thousandsSep: ','
            }
        });
        breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
            this.displayedColumns1 = result.matches ?
                ['position1', 'name1', 'weight1', 'coverage1', 'bounce1', 'user1', 'ctr1', 'cpm1'] :
                ['position1', 'name1', 'weight1', 'coverage1', 'bounce1', 'user1', 'ctr1', 'cpm1'];
        });
        
    }
    earningGraph(data) {
        this.topboxearningGraph = new Chart({
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
        this.topboxcpmGraph = new Chart({
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
        this.topboxctrGraph = new Chart({
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
        this.topboxfilledGraph = new Chart({
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
    earnCPMTrendChart(earnedCPMTrenddata:any,earnedCPMTrenddate:any){
        this.earningCPMtrend = new Chart({
            chart: {
                marginTop: 30,
                type: 'column',
                scrollablePlotArea: {
                    minWidth: 500,
                    scrollPositionY: 0,
                    scrollPositionX: 0,
                    opacity: 1
                },
                style: {
                    fontFamily: 'Noto sans KR',
                }
            },

            colors: ['#29a3fb', '#ffa115', '#27cb71e3', '#8d70fa', '#e94265', '#a9a9a9', '#22c6db', '#F38FB3', '#6691E1', '#86948d'],

            title: {
                text: ''
            },
            xAxis: {
                categories: earnedCPMTrenddate
            },

            yAxis: [{
                labels: {
                    format: '{value}',
                },

                title: {
                    text: 'Earnings ($)',
                },
                min: 0
            },
            {
                min: 0,
                title: {
                    text: 'CPM ($)',
                },
                opposite: true
            }
            ],


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
                valuePrefix: '$',
                shared:true,

                // formatter: function () {
                //     let index1 = this.point.index;
                //     let seriesColor = this.point.color;
                    
                //     let totEarning:number=0;
                //     let auxoNetworkEarning:number=0;
                //     let auxoProEarning:number=0;
                //     let adsenseEarning:number=0;
                //     let totCPM:number=0;
                //     let auxoNetworkCPM:number=0;
                //     let auxoProCPM:number=0;
                //     let adsenseCPM:number=0;
                //     let avgCount:number = 0;
                //     let totAvgCPM:number=0;
                //     let auxoNetworkStatus:number=0;
                //     let auxoproStatus:number=0;
                //     let adsenseStatus:number=0;
                //     earnedCPMTrenddata.forEach(element => {
                //         if(element.name=="Auxo Network"){
                //             totEarning += element.data[index1];
                //             auxoNetworkEarning = element.data[index1];
                //             auxoNetworkStatus = 1;
                //         }
                //         if(element.name=="Auxo Pro"){
                //             totEarning += element.data[index1];
                //             auxoProEarning = element.data[index1];
                //             auxoproStatus = 1;
                //         }
                //         if(element.name=="Adsense"){
                //             totEarning += element.data[index1];
                //             adsenseEarning = element.data[index1];
                //             adsenseStatus = 1;
                //         }
                //         if(element.name=="Auxo Network CPM"){
                //             totCPM += element.data[index1];
                //             avgCount += 1;
                //             auxoNetworkCPM = element.data[index1];
                //         }
                //         if(element.name=="Auxo Pro CPM"){
                //             totCPM += element.data[index1];
                //             avgCount += 1;
                //             auxoProCPM = element.data[index1];
                //         }
                //         if(element.name=="Adsense CPM"){
                //             totCPM += element.data[index1];
                //             avgCount += 1;
                //             adsenseCPM = element.data[index1];
                //         }
                //         totAvgCPM = totCPM/avgCount;
                //     });
                //     let allHtml:any='';
                //     allHtml +='<span style="color:'+seriesColor+'">●</span> Total Earnings: <b>$'+Highcharts.numberFormat(totEarning,2)+'</b></br>';
                //     if(auxoNetworkStatus==1){
                //         allHtml +='<span style="color:'+seriesColor+'">●</span> Auxo Network Earnings: <b>$'+Highcharts.numberFormat(auxoNetworkEarning,2)+'</b></br>';
                //     }
                //     if(auxoproStatus==1){
                //         allHtml +='<span style="color:'+seriesColor+'">●</span> Auxo Pro Earnings: <b>$'+Highcharts.numberFormat(auxoProEarning,2)+'</b></br>';
                //     }
                //     if(adsenseStatus==1){
                //         allHtml +='<span style="color:'+seriesColor+'">●</span> Adsense Earnings: <b>$'+Highcharts.numberFormat(adsenseEarning,2)+'</b></br>';
                //     }
                //     allHtml +='<span style="color:'+seriesColor+'">●</span> Average CPM: <b>$'+Highcharts.numberFormat(totAvgCPM,2)+'</b></br>';
                //     if(auxoNetworkStatus==1){
                //         allHtml +='<span style="color:'+seriesColor+'">●</span> Auxo Network CPM: <b>$'+Highcharts.numberFormat(auxoNetworkCPM,2)+'</b></br>';
                //     }
                //     if(auxoproStatus==1){
                //         allHtml +='<span style="color:'+seriesColor+'">●</span> Auxo Pro CPM: <b>$'+Highcharts.numberFormat(auxoProCPM,2)+'</b></br>';
                //     }
                //     if(adsenseStatus==1){
                //         allHtml +='<span style="color:'+seriesColor+'">●</span> Adsense CPM: <b>$'+Highcharts.numberFormat(adsenseCPM,2)+'</b></br>';
                //     }
                //     return allHtml;
                // },
                
            },

            exporting: {
                enabled: false
            },

            credits: {
                enabled: false
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
                },
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: false
                    }
                }
            },

            series: earnedCPMTrenddata
        });
    }
    pageViewsByDeviceChart(pageViewData: any) {
        this.revenueadtype = new Chart({
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
                //valueSuffix: ' ',
                // pointFormat: '<span style="color:{point.color}">●</span> {series.name}: <b>{point.y:,.0f}</b>   </br><span style="color:{point.color}">●</span> Earnings: <b>${point.y:,.0f}</b>     </br><span style="color:{point.color}">●</span> CPM: <b>${point.y:,.0f}</b>',

                formatter: function () {
                    const seriesName = this.point.name;
                    const seriesColor = this.point.color;
                    return '<span>'+seriesName+'</span></br><span style="color:'+seriesColor+'">●</span> AdRequest: <b>'+Highcharts.numberFormat(pageViewData[seriesName].adreq,0)+'</b>   </br><span style="color:'+seriesColor+'">●</span> Earnings: <b>$'+Highcharts.numberFormat(pageViewData[seriesName].earnings,2)+'</b>     </br><span style="color:'+seriesColor+'">●</span> CPM: <b>$'+pageViewData[seriesName].cpm+'</b>';
                },
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
                name: 'AdRequest',
                type: 'pie',
                data: [
                    ['Mobile', pageViewData.Mobile.adreq],
                    ['Desktop', pageViewData.Desktop.adreq],
                    ['Tablet', pageViewData.Tablet.adreq],
                    ['ConnectedTV', pageViewData.ConnectedTV.adreq],
                ]
            }]
            

        });
    }
    UnfilledTrendChart(unfilleddata: any, unfilleddate: any) {
        this.unfilledTrend = new Chart({
            chart: {
                marginRight: 30,
                marginTop: 30,
                marginLeft: 60,
                zoomType: 'x',
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
                text: ''
            },

            exporting: {
                enabled: false
            },

            credits: {
                enabled: false
            },

            xAxis: {
                categories: unfilleddate,
            },
            yAxis: {
                title: {
                    text: 'Rate (%)'
                }
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
                valueSuffix: '%'
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
                type: 'area',
                marker: {
                    enabled: false,
                    symbol: 'circle'
                },
                name: 'Unfilled Trend',
                data: unfilleddata,
                showInLegend: false
            }],
            navigation: {
                menuItemStyle: {
                    fontSize: '10px'
                }
            }

        });
    }
    AdvertiserTrendChart(vertical: any, impression: any, cpm: any) {
        this.advertiserTrend = new Chart({
            chart: {
                marginTop: 30,
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
                categories: vertical,
                crosshair: true
            }],
            yAxis: [

                {
                    title: {
                        text: 'CPM ($)',
                    },
                    labels: {
                        // format: '{value} $',
                    },
                    opposite: true,
                }, {
                    labels: {
                    },
                    title: {
                        text: 'Impression',
                    }
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
                itemMarginTop: 5,
                itemMarginBottom: -10,
                itemStyle: {
                    lineHeight: '14px'
                }
            },
            series: [{
                name: 'Impression',
                type: 'column',
                yAxis: 1,
                data: impression,
            }, {
                name: 'CPM',
                type: 'area',
                marker: {
                    enabled: false,
                    symbol: 'circle'
                },
                data: cpm,
                tooltip: {
                    valuePrefix: '$',
                }
            }]

        });
    }
    
    // table start
    displayedColumns1 = ['position1', 'name1', 'weight1', 'coverage1', 'bounce1', 'user1', 'ctr1', 'cpm1'];
    dataSource1 = new MatTableDataSource<Element1>(this.ELEMENT_DATA1);
    //  table end
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

        this._dashboardService.bankDetailStripfn().subscribe(dataResult => {
            if (dataResult['status_code'] == '200') {
                var pub_swift_code = dataResult['resultdata'][0]['swift_code'];
                var pub_country = dataResult['resultdata'][0]['country'].trim();
                if (pub_country == 99) {
                    if(pub_swift_code=='' || pub_swift_code==null){
                        this.bankDetailStrip = true;
                    }else{
                        this.bankDetailStrip = false;
                    }
                }else{
                    this.bankDetailStrip = false;
                }
            } else {
                this.bankDetailStrip = false;
            }
        });

        this.date = this.datePipe.transform(localStorage.getItem('startdate'), 'd MMM') + ' - ' + this.datePipe.transform(localStorage.getItem('enddate'), 'd MMM, Y');
        if (this.child_net_code == null || this.child_net_code == "null") {
            this.message = "Your account is being verified by Google. Once approved your Auxo Ads dashboard will be ready! An email will be shared with you once you are good to go.";

            this.dialog.open(DialogDynamicComponent,
                {
                    width: '530px',
                    data: { message: this.message, message1: "In the meantime :", googleAcc: true }
                });
            this.childnetdash = true;
        } else {
            this.childnetdash = false;
        }
        this._dashboardService.dashboardTopBox(localStorage.getItem('uniq_id'), localStorage.getItem('child_net_code'), localStorage.getItem('range'), localStorage.getItem('startdate'), localStorage.getItem('enddate')).subscribe(dataResult => {
            if (dataResult['status_code'] == '200') {
                this.topDatahead(dataResult);
                this.isSpinnerVisibleTopBox = false;
            } else {
                this.isSpinnerVisibleTopBox = false;
            }
        });
        this._dashboardService.dashboardEarnCPMTrend(localStorage.getItem('uniq_id'), localStorage.getItem('child_net_code'), localStorage.getItem('range'), localStorage.getItem('startdate'), localStorage.getItem('enddate')).subscribe(dataResult => {
            if (dataResult['status_code'] == '200') {
                this.earnCPMTrendData = dataResult['data']['trendcpm'];
                this.earnCPMTrendDate = dataResult['data']['date'];
                this.earnCPMTrendChart(this.earnCPMTrendData,this.earnCPMTrendDate);
                this.isSpinnerVisibleEarnT = false;
            } else {
                this.isSpinnerVisibleEarnT = false;
            }
        });

        this._dashboardService.dashboardPageViews(localStorage.getItem('uniq_id'), localStorage.getItem('child_net_code'), localStorage.getItem('range'), localStorage.getItem('startdate'), localStorage.getItem('enddate')).subscribe(dataResult => {
            if (dataResult['status_code'] == '200') {
                this.pageViewsByDevice = dataResult['data'];
                this.pageViewsByDeviceChart(this.pageViewsByDevice);
                this.isSpinnerVisiblePVD = false;
            } else {
                this.isSpinnerVisiblePVD = false;
            }
        });
        this._dashboardService.dashboardUnfilledTrend(localStorage.getItem('uniq_id'), localStorage.getItem('child_net_code'), localStorage.getItem('range'), localStorage.getItem('startdate'), localStorage.getItem('enddate')).subscribe(dataResult => {
            if (dataResult['status_code'] == '200') {
                this.unfilledTrendGraphData = dataResult['data']["unfilled_trend"];
                this.unfilledTrendGraphDate = dataResult['data']['date'];
                this.UnfilledTrendChart(this.unfilledTrendGraphData, this.unfilledTrendGraphDate);
                this.isSpinnerVisibleUFT = false;
            } else {
                this.isSpinnerVisibleUFT = false;
            }
        });
        this._dashboardService.dashboardAdTypes(localStorage.getItem('uniq_id'), localStorage.getItem('child_net_code'), localStorage.getItem('range'), localStorage.getItem('startdate'), localStorage.getItem('enddate')).subscribe(dataResult => {
            if (dataResult['status_code'] == '200') {
                this.richmediaEarningAdType = dataResult['data']["Richmedia"]["earnings"];
                this.richmediaCPMAdType = dataResult['data']["Richmedia"]["cpm"];
                this.imageEarningAdType = dataResult['data']["Image"]["earnings"];
                this.imageCPMAdType = dataResult['data']["Image"]["cpm"];
                this.textEarningAdType = dataResult['data']["Text"]["earnings"];
                this.textCPMAdType = dataResult['data']["Text"]["cpm"];
                this.videoEarningAdType = dataResult['data']["Video"]["earnings"];
                this.videoCPMAdType = dataResult['data']["Video"]["cpm"];
                this.animatedEarningAdType = dataResult['data']["Animated"]["earnings"];
                this.animatedCPMAdType = dataResult['data']["Animated"]["cpm"];
                this.otherEarningAdType = dataResult['data']["Unmatched"]["earnings"];
                this.otherCPMAdType = dataResult['data']["Unmatched"]["cpm"];
                this.isSpinnerVisibleAdType = false;
            } else {
                this.isSpinnerVisibleAdType = false;
            }
        });
        
        this._dashboardService.dashboardBanchmark(localStorage.getItem('uniq_id'), localStorage.getItem('anlytic_id'), localStorage.getItem('range'), localStorage.getItem('startdate'), localStorage.getItem('enddate')).subscribe(dataResult => {
            if (dataResult['status_code'] == '200') {
                this.indbenchdata = dataResult['data']['ind_bench'];
			    this.indbench_flag = dataResult['data']['ind_bench'][0]['no_analytic_flag'];
                if(this.indbench_flag==true){
                    this.ELEMENT_DATA1.push({ position1: "Industry Benchmark", name1: dataResult['data']['ind_bench'][0]['a_spu'], weight1: dataResult['data']['ind_bench'][0]['a_pps'], coverage1: dataResult['data']['ind_bench'][0]['a_atp'], bounce1: dataResult['data']['ind_bench'][0]['a_br'], user1:dataResult['data']['ind_bench'][0]['a_ru'], ctr1:dataResult['data']['ind_bench'][0]['a_ectr'], cpm1:dataResult['data']['ind_bench'][0]['a_cpm']});

                    this.ELEMENT_DATA1.push({ position1: dataResult['data']['ind_bench'][0]['website'], name1: dataResult['data']['ind_bench'][0]['s_spu'], weight1: dataResult['data']['ind_bench'][0]['s_pps'], coverage1: dataResult['data']['ind_bench'][0]['s_atp'], bounce1: dataResult['data']['ind_bench'][0]['s_br'], user1:dataResult['data']['ind_bench'][0]['s_ru'], ctr1:dataResult['data']['ind_bench'][0]['s_ectr'], cpm1:dataResult['data']['ind_bench'][0]['s_cpm']});
                }
                this.isSpinnerVisibleIB = false;
            } else {
                this.isSpinnerVisibleIB = false;
            }
        });
        this._dashboardService.dashboardAdvertiserTrend(localStorage.getItem('uniq_id'), '123456789').subscribe(dataResult => {
            if (dataResult['status_code'] == '200') {
                this.ATvertical = dataResult['data']["vertical"];
                this.ATimpression = dataResult['data']['impression'];
                this.ATcpm = dataResult['data']["CPM"];
                this.AdvertiserTrendChart(this.ATvertical, this.ATimpression, this.ATcpm);
                this.isSpinnerVisibleAT = false;
            } else {
                this.isSpinnerVisibleAT = false;
            }
        });

    }
    
}
// table start
export interface Element1 {
    name1: string;
    position1: string;
    weight1: string;
    coverage1: string;
    bounce1:string;
    user1: string;
    ctr1: string;
    cpm1: string
}

// const ELEMENT_DATA1: Element1[] = [
//     { position1: "Industry Benchmark", name1: "0.52", weight1: "0.86", coverage1: "00:00:58", bounce1: "77.1", user1:"14.7", ctr1:"0.6", cpm1:"0.09"},
//     { position1: "fresh2refresh.com", name1: "1.04", weight1: "1.61", coverage1: "00:00:58", bounce1: "77.1", user1:"14.7", ctr1:"0.6", cpm1:"0.09"},
//     { position1: "fresh.com", name1: "1.04", weight1: "1.61", coverage1: "00:00:58", bounce1: "77.1", user1:"14.7", ctr1:"0.6", cpm1:"0.09"},
// ];