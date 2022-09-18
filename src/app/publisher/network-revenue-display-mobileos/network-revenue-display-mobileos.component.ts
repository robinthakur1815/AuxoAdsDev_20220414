import { Component,OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highmaps';
import Drilldown from 'highcharts/modules/drilldown';
Drilldown(Highcharts);

@Component({
  selector: 'app-network-revenue-display-mobileos',
  templateUrl: './network-revenue-display-mobileos.component.html',
  styleUrls: ['./network-revenue-display-mobileos.component.scss'], 
})


  export class NetworkRevenueDisplayMobileOsComponent implements OnInit {
    expandContent = true;
data1 = [{
  'name': 'Unknown',
  'place': '846514',
  'phone': '637885',
  'request': '665796',
  'coverage': '79.02%',
  'ctr': '0.10%',
  'cpm': '0.10',
  'revenue': '54.31',
  'expanded': false
},

{
  'name': 'Android-9',
  'place': '756514',
  'phone': '987885',
  'request': '665796',
  'coverage': '79.02%',
  'ctr': '0.10%',
  'cpm': '0.10',
  'revenue': '54.31',
  'expanded': false
},

{
  'name': 'Android-6',
  'place': '846514',
  'phone': '637885',
  'request': '665796',
  'coverage': '79.02%',
  'ctr': '0.10%',
  'cpm': '0.10',
  'revenue': '54.31',
  'expanded': false
},

{
  'name': 'Android-7_1',
  'place': '216514',
  'phone': '637885',
  'request': '665796',
  'coverage': '79.02%',
  'ctr': '0.10%',
  'cpm': '0.10',
  'revenue': '54.31',
  'expanded': false
},

{
  'name': 'Android-7',
  'place': '116514',
  'phone': '637885',
  'request': '665796',
  'coverage': '79.02%',
  'ctr': '0.10%',
  'cpm': '0.10',
  'revenue': '54.31',
  'expanded': false
},

{
  'name': 'Android-8',
  'place': '656514',
  'phone': '637885',
  'request': '665796',
  'coverage': '79.02%',
  'ctr': '0.10%',
  'cpm': '0.10',
  'revenue': '54.31',
  'expanded': false
},
]


data2 = [{
  'whoseData': 'Unknown',
  'datades': {
    'name': '01 April 2021',
    'hobbies': '91898',
    'profession': '71605',
    'requestex': '74575',
    'coveragex': '80.00%',
    'ctrex': '0.08%',
    'cpmex': '0.11',
    'revenuex': '0.65',
  },
},

// start data Unknown

{
  'whoseData': 'Unknown',
  'datades': {
    'name': '02 April 2021',
    'hobbies': '91898',
    'profession': '71605',
    'requestex': '74575',
    'coveragex': '80.00%',
    'ctrex': '0.08%',
    'cpmex': '0.11',
    'revenuex': '0.65',
  },
},

{
  'whoseData': 'Unknown',
  'datades': {
    'name': '03 April 2021',
    'hobbies': '91898',
    'profession': '71605',
    'requestex': '74575',
    'coveragex': '80.00%',
    'ctrex': '0.08%',
    'cpmex': '0.11',
    'revenuex': '0.65',
  },
},

{
  'whoseData': 'Unknown',
  'datades': {
    'name': '04 April 2021',
    'hobbies': '91898',
    'profession': '71605',
    'requestex': '74575',
    'coveragex': '80.00%',
    'ctrex': '0.08%',
    'cpmex': '0.11',
    'revenuex': '0.65',
  },
},

{
  'whoseData': 'Unknown',
  'datades': {
    'name': '05 April 2021',
    'hobbies': '91898',
    'profession': '71605',
    'requestex': '74575',
    'coveragex': '80.00%',
    'ctrex': '0.08%',
    'cpmex': '0.11',
    'revenuex': '0.65',
  },
},

// end Unknown data


{
  'whoseData': 'Android-9',
  'datades': {
    'name': '06 April 2021',
    'hobbies': '0',
    'profession': '0',
    'requestex': '0',
    'coveragex': '10.00%',
    'ctrex': '50.00%',
    'cpmex': '0.00',
    'revenuex': '0.00',
  }
},

{
  'whoseData': 'Android-6',
  'datades': {
    'name': '07 April 2021',
    'hobbies': '0',
    'profession': '0',
    'requestex': '0',
    'coveragex': '10.00%',
    'ctrex': '50.00%',
    'cpmex': '0.00',
    'revenuex': '0.00',
  }
},

{
  'whoseData': 'Android-7_1',
  'datades': {
    'name': '08 April 2021',
    'hobbies': '0',
    'profession': '0',
    'requestex': '0',
    'coveragex': '10.00%',
    'ctrex': '50.00%',
    'cpmex': '0.00',
    'revenuex': '0.00',
  }
},

{
  'whoseData': 'Android-7',
  'datades': {
    'name': '09 April 2021',
    'hobbies': '0',
    'profession': '0',
    'requestex': '0',
    'coveragex': '10.00%',
    'ctrex': '50.00%',
    'cpmex': '0.00',
    'revenuex': '0.00',
  }
},

{
  'whoseData': 'Android-8',
  'datades': {
    'name': '10 April 2021',
    'hobbies': '0',
    'profession': '0',
    'requestex': '0',
    'coveragex': '10.00%',
    'ctrex': '50.00%',
    'cpmex': '0.00',
    'revenuex': '0.00',
  }
},


]

    Highcharts: typeof Highcharts = Highcharts;
        // adsense adtypes start graph
        chartOptions: Highcharts.Options = {
            chart: {
                renderTo: 'container',
                marginTop:30,
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
            },

            colors: ['#29a3fb' ,'#ffa115',  '#27cb71e3', '#8d70fa', '#e94265', '#a9a9a9', '#22c6db'],
    
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
              categories: [
                  '1Nov',
                  '2Nov',
                  '3Nov',
                  '4Nov',
                  '5Nov',
                  '6Nov',
                  '7Nov',
                  '8Nov',
                  '9Nov',
                  '10Nov',
                  '11Nov',
                  '12Nov',
                  '13Nov',
                  '14Nov',
                  '15Nov',
                  '16Nov',
                  '17Nov',
                  '18Nov',
                  '19Nov',
                  '20Nov',
                  '21Nov',
                  '22Nov',
                  '23Nov',
                  '24Nov',
                  '25Nov',
                  '26Nov',
                  '27Nov',
                  '28Nov',
                  '29Nov',
                  '30Nov',
                  '31Nov'
              ],
        
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
                  text: 'Estimated Revenue($)'
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
                name: 'Mobile OS',
                colorByPoint: true,
              //   xAxis: 0,
                data: [{
                  name: 'Unknown',
                  y: 5,
                  drilldown: 'Unknown'
                }, {
                  name: 'Android-9',
                  y: 2,
                  drilldown: 'Android-9'
                }, {
                  name: 'Android-6',
                  y: 4,
                  drilldown: 'Android-6'
                }, {
                  name: 'Android-7_1',
                  y: 4,
                  sliced: true,
                  drilldown: 'Android-7_1'
                }, {
                  name: 'Android-7',
                  y: 4,
                  drilldown: 'Android-7'
                }, {
                  name: 'Android-8',
                  y: 4,
                  drilldown: 'Android-8'
                }]
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
            
                  series: [{
                    name: 'Unknown',
                    id: 'Unknown',
                    data: [
                      ['01 Mar', 4],
                      ['02 Mar', 2],
                      ['03 Mar', 1],
                      ['04 Mar', 2],
                      ['05 Mar', 1]
                    ],
                     marker: 
                     {
                        enabled: false,
                        symbol: 'circle'
                     }, 
                    type: 'area'
                  }, 
            
                  {
                    name: 'Android-9',
                    id: 'Android-9',
                    data: [
                      ['01 Mar', 4],
                      ['02 Mar', 2],
                      ['03 Mar', 1],
                      ['04 Mar', 12],
                      ['05 Mar', 1]
                    ],
                     marker: 
                     {
                        enabled: false,
                        symbol: 'circle'
                     }, 
                    type: 'area'
                  }, 
            
                  {
                    name: 'Android-6',
                    id: 'Android-6',
                    data: [
                      ['01 Mar', 2],
                      ['02 Mar', 2],
                      ['03 Mar', 2],
                      ['04 Mar', 2],
                      ['05 Mar', 2]
                    ],
                    marker: 
                    {
                        enabled: false,
                        symbol: 'circle'
                     }, 
                    type: 'area'
                  },

                  {
                    name: 'Android-7_1',
                    id: 'Android-7_1',
                    data: [
                      ['01 Mar', 2],
                      ['02 Mar', 2],
                      ['03 Mar', 2],
                      ['04 Mar', 2],
                      ['05 Mar', 2]
                    ],
                    marker: 
                    {
                        enabled: false,
                        symbol: 'circle'
                     }, 
                    type: 'area'
                  },

                  {
                    name: 'Android-7',
                    id: 'Android-7',
                    data: [
                      ['01 Mar', 2],
                      ['02 Mar', 2],
                      ['03 Mar', 2],
                      ['04 Mar', 2],
                      ['05 Mar', 2]
                    ],
                    marker: 
                    {
                        enabled: false,
                        symbol: 'circle'
                     }, 
                    type: 'area'
                  },

                  {
                    name: 'Android-8',
                    id: 'Android-8',
                    data: [
                      ['01 Mar', 2],
                      ['02 Mar', 2],
                      ['03 Mar', 2],
                      ['04 Mar', 2],
                      ['05 Mar', 2]
                    ],
                    marker: 
                    {
                        enabled: false,
                        symbol: 'circle'
                     }, 
                    type: 'area'
                  }],
                //    navigation: {
                //   menuItemStyle: {
                //       fontSize: '10px'
                //   }
                //  } 
                }   
             }
        // end end
    
  

    ngOnInit() {
        var chart = Highcharts.chart("container", this.chartOptions);
    }

    findDetails(data) {
      return this.data2.filter(x => x.whoseData === data.name);
    }
  }