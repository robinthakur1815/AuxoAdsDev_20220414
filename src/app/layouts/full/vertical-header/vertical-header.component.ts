import { Component,Inject } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// dialogue start

@Component({
  selector: 'app-vertical-header-dialog',
//   template: `<h1 mat-dialog-title>Hi {{data.name}}</h1>
// <div mat-dialog-content>
// <p>What's your favorite animal?</p>
// <mat-form-field>
//   <input matInput tabindex="1" [(ngModel)]="data.animal">
// </mat-form-field>
// </div>
// <div mat-dialog-actions>
// <button mat-button [mat-dialog-close]="data.animal" tabindex="2">Ok</button>
// <button mat-button (click)="onNoClick()" tabindex="-1">No Thanks</button>
// </div>`
templateUrl: 'dialog-overview-example.html',
})
export class VerticalAppHeaderDialogComponent {
  isChecked1 = true;
  isChecked2 = true;
  isChecked3 = true;
  public acc_name = localStorage.getItem('acc_name');
  public useremail = localStorage.getItem('useremail');
  constructor(
      public dialogRef: MatDialogRef<VerticalAppHeaderDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
      this.dialogRef.close();
  }
}

// dialogue End



@Component({
  selector: 'app-vertical-header',
  templateUrl: './vertical-header.component.html',
  styleUrls: []
})

export class VerticalAppHeaderComponent {
  public config: PerfectScrollbarConfigInterface = {};
  animal = '';
  name = '';
  public acc_name = localStorage.getItem('acc_name');
  public useremail = localStorage.getItem('useremail');
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

  constructor(private translate: TranslateService,public dialog: MatDialog) {
    translate.setDefaultLang('en');
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(VerticalAppHeaderDialogComponent, {
        width: '420px',
        data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
        
        this.animal = result;
    });
  }

  // dialogue start

  changeLanguage(lang: any) {
    this.translate.use(lang.code)
    this.selectedLanguage = lang;
  }
}
