import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
// import * as moment from 'moment';
import * as moment from 'moment-timezone';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  selected: any;
  inlineDateTime: any;

  constructor(private router: Router) {
    moment.tz.setDefault("Pacific/Honolulu");
    if(localStorage.getItem('range')=='today'){
      this.selected = {
        startDate: moment().set({ hours: 0, minutes: 0 }),
        endDate: moment().set({ hours: 23, minutes: 59 })
      };
    }else if(localStorage.getItem('range')=='yesterday'){
      this.selected = {
        startDate:moment().subtract(1, 'days').set({ hours: 0, minutes: 0 }),
        endDate: moment().subtract(1, 'days').set({ hours: 23, minutes: 59 })
      };
    }else if(localStorage.getItem('range')=='7days'){
      this.selected = {
        startDate: moment().subtract(6, 'days').set({ hours: 0, minutes: 0 }),
        endDate: moment().set({ hours: 23, minutes: 59 })
      };
    }else if(localStorage.getItem('range')=='last30days'){
      this.selected = {
        startDate: moment().subtract(29, 'days').set({ hours: 0, minutes: 0 }),
        endDate: moment().set({ hours: 23, minutes: 59 })
      };
    }else if(localStorage.getItem('range')=='thismonth'){
      this.selected = {
        startDate: moment().startOf('month').set({ hours: 0, minutes: 0 }),
        endDate: moment().set({ hours: 23, minutes: 59 })
      };
    }else if(localStorage.getItem('range')=='lastmonth'){
      this.selected = {
        startDate: moment().subtract(1, 'month').startOf('month').set({ hours: 0, minutes: 0 }),
        endDate: moment().subtract(1, 'month').endOf('month').set({ hours: 23, minutes: 59 })
      };
    }else if(localStorage.getItem('range')=='3month'){
      this.selected = {
        startDate: moment().subtract(3, 'month').startOf('month').set({ hours: 0, minutes: 0 }),
        endDate: moment().subtract(1, 'month').endOf('month').set({ hours: 23, minutes: 59 })
      };
    }else{
      let newdatecustomstart  = new Date(localStorage.getItem('startdate'));
      let newdatecustomend  = new Date(localStorage.getItem('enddate'));
      this.selected = {
        startDate: newdatecustomstart,
        endDate: newdatecustomend
      };
    }
    
  }


  ngOnInit() {
  }
  choosedDateTime(e: any) {
    this.inlineDateTime = e;
  }
  // ngAfterViewInit() { 

  // }
}
