import { Component, Inject } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  NgForm
} from '@angular/forms';

@Component({
  selector: 'app-finance-vertical-header',
  templateUrl: './finance-vertical-header.component.html',
  styleUrls: []
})

export class FinanceAppHeaderComponent {
  public config: PerfectScrollbarConfigInterface = {};
  animal = '';
  name = '';
  public showInvnotify = true;
  public errorMsg;
  public acc_name = localStorage.getItem('acc_name');
  public useremail = localStorage.getItem('useremail');
  child_net_code = localStorage.getItem('child_net_code');
  childnetmenu: boolean = false;
  this_month: string;
  previous_month: string;
  message: string;
  // This is for Notifications 
  notifications: Object[] = [
    {
      round: 'round-primary',
      icon: 'fa-thin fa-g',
      title: 'govtjobbuzz786@gmail.com',
      subject: 'govtjobbuzz786@gmail.com has been transfered from Jatin Yadav to Keshav Goswami.',
      time: 'Yesterday at 21:40'
    },
    {
      round: 'round-warning',
      icon: 'fa-thin fa-b',
      title: 'brgehlot2017@gmail.com',
      subject: 'brgehlot2017@gmail.com has been transfered from Pintu Prasad to Rajeshwari Attri.',
      time: '12 hours ago'
    },
    {
      round: 'round-success',
      icon: 'fa-thin fa-k',
      title: 'kashyapkumbhani1867898765@gmail.com',
      subject: 'kashyapkumbhani18@gmail.com has been transfered from Pintu Prasad to Keshav Goswami.',
      time: 'Wed at 12:48'
    },
    {
      round: 'round-info',
      icon: 'fa-thin fa-h',
      title: 'himanshub@gmail.com',
      subject: 'himanshub@gmail.com has been transfered from Pintu Prasad to Keshav Goswami.',
      time: 'Tue at 21:31'
    },
    {
      round: 'round-danger',
      icon: 'fa-thin fa-a',
      title: 'ashgeeky1@gmail.com',
      subject: 'ashgeeky1@gmail.com has been transfered from Pintu Prasad to Keshav Goswami.',
      time: 'Tue at 21:31'
    }
  ];

  // This is for Mymessages
  mymessages: Object[] = [
    {
      useravatar: 'assets/images/users/1.jpg',
      status: 'online',
      from: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:30 AM'
    },
    {
      useravatar: 'assets/images/users/2.jpg',
      status: 'busy',
      from: 'Sonu Nigam',
      subject: 'I have sung a song! See you at',
      time: '9:10 AM'
    },
    {
      useravatar: 'assets/images/users/2.jpg',
      status: 'away',
      from: 'Arijit Sinh',
      subject: 'I am a singer!',
      time: '9:08 AM'
    },
    {
      useravatar: 'assets/images/users/4.jpg',
      status: 'offline',
      from: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:00 AM'
    }
  ];

  public selectedLanguage: any = {
    language: 'English',
    code: 'en',
    type: 'US',
    icon: 'us'
  }

  public languages: any[] = [{
    language: 'English',
    code: 'en',
    type: 'US',
    icon: 'us'
  },
  {
    language: 'Español',
    code: 'es',
    icon: 'es'
  },
  {
    language: 'Français',
    code: 'fr',
    icon: 'fr'
  },
  {
    language: 'German',
    code: 'de',
    icon: 'de'
  }]

  // dialogue start

  constructor(private translate: TranslateService, public dialog: MatDialog) {
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {

    //header revenue

    
  }


  changeLanguage(lang: any) {
    this.translate.use(lang.code)
    this.selectedLanguage = lang;
  }
}
