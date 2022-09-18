import { Component, Optional, Inject } from '@angular/core';
import { AddDomainService } from './adddomain.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDynamicComponent } from '../dialog-dynamic/dialog-dynamic.component';
import { Location } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  NgForm
} from '@angular/forms';
export interface domainPro {
  email: string;
  domain: string;
  appname: string;
  appid: string;
  apptype: string;
  emails: string;
  domains: string;
  gamAcc: string;
}
@Component({
  selector: 'app-add-new-domain',
  templateUrl: './add-new-domain.component.html',
  styleUrls: ['./add-new-domain.component.scss']
})

export class AddNewDomainComponent {
  panelOpenState = false;
  step = 0;
  local_data: any;
  message: string;
  radioText: boolean = true;
  inviteForm: boolean = true;
  isSpinnerVisible: boolean = false;
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  // end collapse

  options: FormGroup;

  hide = true;

  constructor(private _adddomainService: AddDomainService, @Optional() @Inject(MAT_DIALOG_DATA) public data: domainPro, public dialog: MatDialog, private location: Location) { this.local_data = { ...data }; }

  ngOnInit() {

    this.gamEmail();

    //default value for radio button in send invite
    this.local_data.gamAcc = 'yes';
  }
  backPage() {
    this.location.back();
  }

  //gam_email check
  gamEmail() {
    this.isSpinnerVisible = true;
    this._adddomainService.getGamData(localStorage.getItem('uniq_id'), localStorage.getItem('useremail')).subscribe((response) => {

      
      if (response['status_code'] == '200') {
        this.inviteForm = false;
        this.local_data.email = response['pub_details']['gam_email'];
        this.isSpinnerVisible = false;
      }
      else if (response['status_code'] == '204') {

        this.local_data.domains = response['domain'];
        this.inviteForm = true;
        this.isSpinnerVisible = false;
      }
      else {
        this.message = "Something went wrong";
        this.dialog.open(DialogDynamicComponent,

          {
            width: '450px',
            data: { message: this.message }
          });

      }

    })
  }

  //Invite Check
  radioChange(e) {


    if (e.value == "no") {
      this.radioText = false;
      this.local_data.emails = '';
      //this.local_data.domains='';
    } else {
      this.radioText = true;
      this.local_data.emails = '';
      //this.local_data.domains='';
    }

  }

  //Send Invite to publishers
  sendInvite(form: NgForm) {
    this.isSpinnerVisible = true;
    const checkDomain = this.local_data.domains;
    if (checkDomain == null || checkDomain == '') {
      this.local_data.domains = 'NULL';
    }

    this._adddomainService.postInvite(localStorage.getItem('uniq_id'), this.local_data.domains, this.local_data.emails, this.local_data.gamAcc).subscribe((response) => {

      if (response['status_code'] == '200') {
        this.message = response['invite']['text'];
        this.dialog.open(DialogDynamicComponent,
          {
            width: '450px',
            data: { message: this.message }
          });

        form.reset();

        this.gamEmail();
        this.isSpinnerVisible = false;
      } else if (response['status_code'] == '422') {

        this.message = response['message'];
        this.dialog.open(DialogDynamicComponent,

          {
            width: '450px',
            data: { message: this.message }
          });

        this.isSpinnerVisible = false;
      } else {
        this.message = response['message'];
        this.dialog.open(DialogDynamicComponent,
          {
            width: '450px',
            data: { message: this.message }
          });
        this.isSpinnerVisible = false;
      }

    })
  }

  //Add New Domain
  postNewDomain(form: NgForm) {
    this.isSpinnerVisible = true;
    this._adddomainService.postDomain(localStorage.getItem('uniq_id'), this.local_data.domain).subscribe((response) => {

      if (response['status_code'] == '200') {


        this.message = response['invite']['text'];
        this.dialog.open(DialogDynamicComponent,
          {
            width: '450px',
            data: { message: this.message }
          });

        form.controls['domain'].reset();
        this.isSpinnerVisible = false;
      } else if (response['status_code'] == '422') {

        this.message = response['message'];
        this.dialog.open(DialogDynamicComponent,

          {
            width: '450px',
            data: { message: this.message }
          });
        this.isSpinnerVisible = false;

      } else {
        this.message = response['message'];
        this.dialog.open(DialogDynamicComponent,
          {
            width: '450px',
            data: { message: this.message }
          });
        this.isSpinnerVisible = false;
      }

    })
  }

  //Add New APP
  postNewApp(form: NgForm) {
    // jQuery("#appbtn").prop('disabled', true);
    this.isSpinnerVisible = true;
    this._adddomainService.postApp(localStorage.getItem('uniq_id'), this.local_data.apptype, this.local_data.appname, this.local_data.appid).subscribe((response) => {

      if (response['status_code'] == '200') {

        this.message = response['app']['text'];
        this.dialog.open(DialogDynamicComponent,
          {
            width: '450px',
            data: { message: this.message }
          });
        form.reset();
        this.isSpinnerVisible = false;
      } else if (response['status_code'] == '422') {

        this.message = response['message'];
        this.dialog.open(DialogDynamicComponent,
          {
            width: '450px',
            data: { message: this.message }
          });
        this.isSpinnerVisible = false;
      } else {
        this.message = response['message'];
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

