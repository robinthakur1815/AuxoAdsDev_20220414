import { Component, Inject } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HeaderService } from './publisherheader.service';
import { DialogDynamicComponent } from '../dialog-dynamic/dialog-dynamic.component';
import { Router } from '@angular/router';
import {
  NgForm
} from '@angular/forms';
// dialogue start

@Component({
  selector: 'app-vertical-header-dialog',
  templateUrl: 'publisher-dialog-inventory.html',
  styleUrls: ['./publisher-vertical-header.component.scss']
})
export class PublisherAppHeaderDialogComponent {
  isChecked1 = true;
  isChecked2 = false;
  isChecked3 = false;
  isChecked4 = false;
  isChecked5 = false;
  public acc_name = localStorage.getItem('acc_name');
  public useremail = localStorage.getItem('useremail');
  isSpinnerVisible: boolean = false;
  message: string;
  newsletter: boolean = false;
  old_service = [];

  constructor(
    public dialogRef: MatDialogRef<PublisherAppHeaderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _headerService: HeaderService, public dialog: MatDialog
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {

    this.pubService();
    
  }

  //pub services check
  pubService() {
    this.isSpinnerVisible = true;
    this._headerService.getPubService(localStorage.getItem('uniq_id'), localStorage.getItem('useremail')).subscribe((response) => {
      
      this.isSpinnerVisible = false;
      if (response['status_code'] == '200') {
        if (response['service'].length > 0) {

          response['service'].forEach((value) => {
            this.old_service.push(value['service_id']);
            if (value['service_id'] == 5) {
              this.isChecked2 = true;
            }
            if (value['service_id'] == 4) {
              this.isChecked3 = true;
            }
            if (value['service_id'] == 7) {
              this.isChecked4 = true;
            }
          });
        }
        if (response['news'] != null) {

          this.isChecked5 = true;
        }

      }



    })
  }

  invenSubmit(form: NgForm) {
    this.isSpinnerVisible = true;

    const servArr = [1, 2, 3];
    const servFalseArr = [];

    if (form.value.premium == true) {
      servArr.push(5);
    } else {
      servFalseArr.push(5);
    }
    if (form.value.fill == true) {
      servArr.push(4);
    } else {
      servFalseArr.push(4);
    }
    if (form.value.cdp == true) {
      servArr.push(7);
    } else {
      servFalseArr.push(7);
    }
    if (form.value.letter == true) {

      this.newsletter = true;
    } else {
      this.newsletter = false;
    }
    this._headerService.postInvenSerData(localStorage.getItem('uniq_id'), servArr, localStorage.getItem('useremail'), this.newsletter, this.acc_name, this.old_service, servFalseArr).subscribe((response) => {

      
      if (response['status_code'] == '201') {
        this.dialogRef.close();
        this.isSpinnerVisible = false;
        this.message = "Thank you for registering services on Auxo Ads!";
        this.dialog.open(DialogDynamicComponent,
          {
            width: '450px',
            data: { message: this.message }
          });

      }
      else {
        this.message = "Something went wrong";
        this.dialog.open(DialogDynamicComponent,
          {
            width: '450px',
            data: { message: this.message }
          });
        this.isSpinnerVisible = false;
      }

    })

  }

}

// dialogue End



@Component({
  selector: 'app-publisher-vertical-header',
  templateUrl: './publisher-vertical-header.component.html',
  styleUrls: []
})

export class PublisherAppHeaderComponent {
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
  role_id = localStorage.getItem('role_id');
  roleMenu: boolean = false;
  rolePublisher: boolean = false;
  roleNetwork: boolean = false;
  roleExeMenu: boolean = false;
  roleEditiorMenu: boolean = false;
  // This is for Notifications
  notifications: Object[] = [
    {
      round: 'round-danger',
      icon: 'ti-link',
      title: 'Launch Admin',
      subject: 'Just see the my new admin!',
      time: '9:30 AM'
    },
    {
      round: 'round-success',
      icon: 'ti-calendar',
      title: 'Event today',
      subject: 'Just a reminder that you have event',
      time: '9:10 AM'
    },
    {
      round: 'round-info',
      icon: 'ti-settings',
      title: 'Settings',
      subject: 'You can customize this template as you want',
      time: '9:08 AM'
    },
    {
      round: 'round-primary',
      icon: 'ti-user',
      title: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:00 AM'
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

  constructor(private translate: TranslateService, public dialog: MatDialog, private headerService: HeaderService,public router: Router) {
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {

    //role condtion
    if (this.role_id == '3') {
      this.rolePublisher = true;
    }
    if (this.role_id == '6') {
      this.roleNetwork = true;
    }

    if (this.role_id == '12') {
      this.roleMenu = true;

    }
    if (this.role_id == '13') {
      this.roleExeMenu = true;

    }
    if (this.role_id == '14') {
      this.roleEditiorMenu = true;
    }

    //header revenue

    this.headerService.getHeaderRev(localStorage.getItem('uniq_id'), localStorage.getItem('child_net_code'), localStorage.getItem('pub_acc_name'), localStorage.getItem('pub_acc_new_name'), localStorage.getItem('ads_id')).subscribe((response) => {

      if (response['status_code'] == '200') {
        this.this_month = response['data']['this_month'];
        this.previous_month = response['data']['last_month'];

      } else {
        this.message = "Something went wrong";
        this.dialog.open(DialogDynamicComponent,
          {
            width: '450px',
            data: { message: this.message }
          });
      }
    })


    this.headerService.getInvoicenotify(localStorage.getItem('uniq_id'))
      .subscribe(dataResult => {
        if (dataResult['status_code'] == '201') {
          this.showInvnotify = true;
        } else if (dataResult['status_code'] == '200') {
          this.showInvnotify = true;
        } else {
          this.showInvnotify = false;
        }
      },
        error => this.errorMsg = error);

    setInterval(() => { this.myFunc() }, 180000);
  }

  myFunc() {
    this.headerService.getInvoicenotify(localStorage.getItem('uniq_id'))
      .subscribe(dataResult => {
        if (dataResult['status_code'] == '201') {
          this.showInvnotify = true;
        } else if (dataResult['status_code'] == '200') {
          this.showInvnotify = true;
        } else {
          this.showInvnotify = false;
        }
      },
        error => this.errorMsg = error);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PublisherAppHeaderDialogComponent, {
      width: '420px',
      data: { name: this.name, animal: this.animal }
    });

    
  }

  // dialogue start

  changeLanguage(lang: any) {
    this.translate.use(lang.code)
    this.selectedLanguage = lang;
  }
}
