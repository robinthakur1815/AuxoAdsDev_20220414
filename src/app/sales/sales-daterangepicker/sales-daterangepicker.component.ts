import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
// import * as moment from 'moment';
import * as moment from 'moment-timezone';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-sales-daterangepicker',
  templateUrl: './sales-daterangepicker.component.html',
  styleUrls: ['./sales-daterangepicker.component.scss']
})
export class SalesDateRangePickerComponent implements OnInit {
  dataSelected: any;
  alwaysShowCalendars: boolean;
  showRangeLabelOnInput: boolean;
  keepCalendarOpeningWithRange: boolean;
  maxDate: moment.Moment;
  minDate: moment.Moment;
  invalidDates: moment.Moment[] = [];

  tooltips = [
    { date: moment(), text: 'Today is just unselectable' },
    { date: moment().add(2, 'days'), text: 'Yeeeees!!!' }
  ];
  inlineDateTime: any;
  ranges: any = {
    Today: [moment(), moment()],
    // Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 10 Days': [moment().subtract(9, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment()],
    'Last Month': [
      moment().subtract(1, 'month').startOf('month'),
      moment().subtract(1, 'month').endOf('month')
    ],
    'Last 3 Month': [
      moment().subtract(3, 'month').startOf('month'),
      moment().subtract(1, 'month').endOf('month')
    ]
  };
  isInvalidDate = (m: moment.Moment) => {
    return this.invalidDates.some(d => d.isSame(m, 'day'));
  }
  isTooltipDate = (m: moment.Moment) => {
    const tooltip = this.tooltips.find(tt => tt.date.isSame(m, 'day'));
    if (tooltip) {
      return tooltip.text;
    } else {
      return false;
    }
  }

  constructor(private router: Router,private datePipe: DatePipe) {
    //moment.tz.setDefault("Pacific/Honolulu");
    // this.maxDate = moment().add(2, 'weeks');
    // this.minDate = moment().subtract(3, 'days'); 

    this.maxDate = moment();
    this.minDate = moment().subtract(3, 'days');



    this.alwaysShowCalendars = true;
    this.keepCalendarOpeningWithRange = true;
    this.showRangeLabelOnInput = true;
    // this.dataSelected = {
    //   startDate: moment().subtract(6, 'days').set({ hours: 0, minutes: 0 }),
    //   endDate: moment().set({ hours: 23, minutes: 59 })
    // };
    

    if(localStorage.getItem('range')=='today'){
      this.dataSelected = {
        startDate: moment().set({ hours: 0, minutes: 0 }),
        endDate: moment().set({ hours: 23, minutes: 59 })
      };
    }
    else if(localStorage.getItem('range')=='yesterday'){
      this.dataSelected = {
        startDate:moment().subtract(1, 'days').set({ hours: 0, minutes: 0 }),
        endDate: moment().subtract(1, 'days').set({ hours: 23, minutes: 59 })
      };
    }
    else if(localStorage.getItem('range')=='7days'){
      this.dataSelected = {
        startDate: moment().subtract(6, 'days').set({ hours: 0, minutes: 0 }),
        endDate: moment().set({ hours: 23, minutes: 59 })
      };
    }else if(localStorage.getItem('range')=='10days'){
      this.dataSelected = {
        startDate: moment().subtract(9, 'days').set({ hours: 0, minutes: 0 }),
        endDate: moment().set({ hours: 23, minutes: 59 })
      };
    }else if(localStorage.getItem('range')=='last30days'){
      this.dataSelected = {
        startDate: moment().subtract(29, 'days').set({ hours: 0, minutes: 0 }),
        endDate: moment().set({ hours: 23, minutes: 59 })
      };
    }else if(localStorage.getItem('range')=='thismonth'){
      this.dataSelected = {
        startDate: moment().startOf('month').set({ hours: 0, minutes: 0 }),
        endDate: moment().set({ hours: 23, minutes: 59 })
      };
    }else if(localStorage.getItem('range')=='lastmonth'){
      this.dataSelected = {
        startDate: moment().subtract(1, 'month').startOf('month').set({ hours: 0, minutes: 0 }),
        endDate: moment().subtract(1, 'month').endOf('month').set({ hours: 23, minutes: 59 })
      };
    }else if(localStorage.getItem('range')=='3month'){
      this.dataSelected = {
        startDate: moment().subtract(3, 'month').startOf('month').set({ hours: 0, minutes: 0 }),
        endDate: moment().subtract(1, 'month').endOf('month').set({ hours: 23, minutes: 59 })
      };
    }else{
     
      let newdatecustomstart  = this.datePipe.transform(localStorage.getItem('startdate'), 'd MMM Y');
      let newdatecustomend  = this.datePipe.transform(localStorage.getItem('enddate'), 'd MMM Y');
      
     
      this.dataSelected = {
        startDate: newdatecustomstart,
        endDate: newdatecustomend
           
      };
      
      
    }
   
  
  }
  rangeClicked(range: any) {
    // console.log('[rangeClicked] range is : ', range);
    
  }
  datesUpdated(range: any) {
    let currentUrl = this.router.url;
    let finalstrtdate = moment(range.startDate).format("YYYY-MM-DD");
    let finalenddate = moment(range.endDate).format("YYYY-MM-DD");
    let today =  moment().format("YYYY-MM-DD");
    let yesterday =  moment().subtract(1, 'days').format("YYYY-MM-DD");
    let day7 =  moment().subtract(6, 'days').format("YYYY-MM-DD");
    let day10 =  moment().subtract(9, 'days').format("YYYY-MM-DD");
    let day30 =  moment().subtract(29, 'days').format("YYYY-MM-DD");
    let thismonthstart =  moment().startOf('month').format("YYYY-MM-DD");

    let lastmonthstart =   moment().subtract(1, 'month').startOf('month').format("YYYY-MM-DD");
    let lastmonthend =   moment().subtract(1, 'month').endOf('month').format("YYYY-MM-DD");

    let last3monthstart =   moment().subtract(3, 'month').startOf('month').format("YYYY-MM-DD");
    let last3monthend =   moment().subtract(1, 'month').endOf('month').format("YYYY-MM-DD");

   
    if (finalstrtdate != 'Invalid date' && finalenddate != 'Invalid date'){

      if(finalstrtdate == today && finalenddate == today){
        localStorage.setItem('range', "today");
      }else if(finalstrtdate == yesterday && finalenddate == yesterday){
        localStorage.setItem('range', "yesterday");
      }else if(finalstrtdate == day7 && finalenddate == today){
        localStorage.setItem('range', "7days");
      }else if(finalstrtdate == day10 && finalenddate == today){
        localStorage.setItem('range', "10days");
      }else if(finalstrtdate == day30 && finalenddate == today){
        localStorage.setItem('range', "last30days");
      }else if(finalstrtdate == thismonthstart && finalenddate == today){
        localStorage.setItem('range', "thismonth");
      }else if(finalstrtdate == lastmonthstart && finalenddate == lastmonthend){
        localStorage.setItem('range', "lastmonth");
      }else if(finalstrtdate == last3monthstart && finalenddate == last3monthend){
        localStorage.setItem('range', "3month");
      }else{
        localStorage.setItem('range', "custom");
      }
      localStorage.setItem('startdate', finalstrtdate);
      localStorage.setItem('enddate', finalenddate);
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
      });
    }
  }



  ngOnInit() {
  }
  choosedDateTime(e: any) {
    this.inlineDateTime = e;
  }
  // ngAfterViewInit() { 
 
  // }

  myFunctionOne(){

    console.log('Call Function One from Component One');
    let ranges: any = {
      Today111: [moment(), moment()],
      // Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      'Last 7 Days': [moment().subtract(6, 'days'), moment()],
      'Last 10 Days': [moment().subtract(9, 'days'), moment()],
      'Last 30 Days': [moment().subtract(29, 'days'), moment()],
      'This Month': [moment().startOf('month'), moment()],
      'Last Month': [
        moment().subtract(1, 'month').startOf('month'),
        moment().subtract(1, 'month').endOf('month')
      ],
      'Last 3 Month': [
        moment().subtract(3, 'month').startOf('month'),
        moment().subtract(1, 'month').endOf('month')
      ]
    };
  }


}
