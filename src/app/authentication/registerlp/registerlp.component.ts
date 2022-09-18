import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Livedemo } from './livedemo.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RegisterLpService } from './registerlp.service';
import {PasswordValidator} from './password.validator';
import { DialogDynamicComponent } from '../../publisher/dialog-dynamic/dialog-dynamic.component';
declare var $: any;
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';


const password = new FormControl('', [Validators.required, Validators.minLength(8), PasswordValidator.cannotContainSpace]);
const confirmPassword = new FormControl('', CustomValidators.equalTo(password));

@Component({
  selector: 'app-registerlp',
  templateUrl: './registerlp.component.html',
  styleUrls: ['./registerlp.component.scss']
})
export class RegisterLpComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  isSpinnerVisible: boolean = false;
  tc: boolean = false;
  emailCheck: boolean = false;
  domainCheck: boolean = false;
  error: string;
  errorDomain: string;
  message: string;
  submitted: boolean = false;
  savetc: boolean;
  uniq_id: any;
  countrydata = [];
  public form: FormGroup = Object.create(null);
  public liveDemoform: FormGroup = Object.create(null);
  public newsletterform: FormGroup = Object.create(null);
  // public message;

  public isSpinnerVisiblenewsletter: boolean = false;
  public isSpinnerVisiblelivedemo: boolean = false;

  domainCount: number = 425;
  impressionCount: number = 6351015264;
  pageviewCount: number = 2265995264;
  demandCount: number = 5;
  domainCountstop: any;
  demandCountstop: any;
  impressionCountstop: any;
  pageviewCountstop: any;
  constructor(private fb: FormBuilder, private router: Router, private _registerService: RegisterLpService, private livedemo: Livedemo, public dialog: MatDialog) { }

  ngOnInit() {
    //country api code
    this._registerService.getCountry().subscribe((response) => {
      if (response['status_code'] == '200') {
        this.countrydata = response['country'];
      }
    })

    //validation signupform
    this.form = this.fb.group({
      email: [null, Validators.compose([Validators.email,Validators.required,Validators.pattern("^([a-zA-Z0-9]+\.)+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$")])],
      fname: [null, Validators.compose([Validators.required, Validators.minLength(3), this.noWhitespaceValidator,Validators.pattern("^[a-zA-Z ]+")])],
      lname: [null,Validators.compose([Validators.pattern("^[a-zA-Z ]+")])],
      business_type: [null, Validators.compose([Validators.required])],
      domain: [null, Validators.compose([Validators.required,
      Validators.pattern("(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?")])],
      country: [null, Validators.compose([Validators.required])],
      savetc: [true, Validators.requiredTrue],
      mobile: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(12), Validators.pattern(/^[1-9][0-9]*$/)])],
      password: password,
      confirmPassword: confirmPassword
    });

    this.liveDemoform = this.fb.group({
      userName: [null, Validators.compose([Validators.required, Validators.minLength(3), this.noWhitespaceValidator,Validators.pattern("^[a-zA-Z ]+")])],
      // livedemoemail: [null, Validators.compose([Validators.email, Validators.required,Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])],
      livedemoemail: [null, Validators.compose([Validators.email, Validators.required,Validators.pattern("^([a-zA-Z0-9]+\.)+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$")])],
      textname: [null, Validators.compose([Validators.required, Validators.minLength(3), this.noWhitespaceValidator])]
    });

    this.newsletterform = this.fb.group({
      nwsltrname: [null, Validators.compose([Validators.required, Validators.minLength(3), this.noWhitespaceValidator,Validators.pattern("^[a-zA-Z ]+")])],
      nwsltremail: [null, Validators.compose([Validators.email,Validators.required,Validators.pattern("^([a-zA-Z0-9]+\.)+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$")])],
    });

    this.domainCountstop = setInterval(() => {
      this.domainCount++;
      if (this.domainCount == 2500) {
        clearInterval(this.domainCountstop);
      }
    }, 100);
    this.impressionCountstop = setInterval(() => {
      this.impressionCount++;
      if (this.impressionCount == 8351015264) {
        clearInterval(this.impressionCountstop);
      }
    });
    this.pageviewCountstop = setInterval(() => {
      this.pageviewCount++;
      if (this.pageviewCount == 4265995264) {
        clearInterval(this.pageviewCountstop);
      }
    });
    this.demandCountstop = setInterval(() => {
      this.demandCount++;
      if (this.demandCount == 50) {
        clearInterval(this.demandCountstop);
      }
    }, 100);
    
  }

  onSubmit() {

    this.submitted = true;
    this.error = '';
    this.errorDomain = '';
    this.message = '';
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    if (this.form.valid) {

      this.isSpinnerVisible = true;
      //call api
      this._registerService.postSignup(this.form.value.email, this.form.value.password, this.form.value.fname, this.form.value.lname, this.form.value.domain, this.form.value.country, this.form.value.mobile,this.form.value.business_type).subscribe((response) => {

        
        if (response['status_code'] == '201') {
          
          this.isSpinnerVisible = false;
          this.uniq_id = response['uniq_id'];
          this.router.navigate(['/authentication/publisher-services/' + this.uniq_id]);
        }
        else if (response['status_code'] == '422') {
          if (response['message'] == 'Invalid Domain') {
            this.errorDomain = "Invalid Domain (Domain name format like www.example.com)";
            this.domainCheck = true;
          } else if (response['message'] == 'Domain already exists, please check details!') {
            this.errorDomain = response['message'];
            this.domainCheck = true;
          }
          else {

            this.emailCheck = true;
          }
          this.isSpinnerVisible = false;
        }
        else {
          this.error = response['message'];
          this.isSpinnerVisible = false;
        }

      })
    }

  }

  nwsltrSubmit() {
    const userName = this.newsletterform.value.nwsltrname;
    const email = this.newsletterform.value.nwsltremail;
    if (this.newsletterform.invalid) {
      return;
    }
    if (this.newsletterform.valid) {
      this.isSpinnerVisiblenewsletter = true;
      this.livedemo.newsletterDetails(userName, email).subscribe(data => {
        this.isSpinnerVisiblenewsletter = false;
        this.newsletterform.reset();
        if (data['status_code'] == '200') {
          //this.message = data['message'];
          this.message = "Thank you for subscribing to our weekly newsletter!";
          this.dialog.open(DialogDynamicComponent,
            {
              width: '450px',
              data: { message: this.message }
            });
        } else {
          this.message = data['message'];
          this.dialog.open(DialogDynamicComponent,
            {
              width: '450px',
              data: { message: this.message }
            });
        }
      });
    }
  }

  liveDemoSubmit() {
    
    const userName = this.liveDemoform.value.userName;
    const livedemoemail = this.liveDemoform.value.livedemoemail;
    const textname = this.liveDemoform.value.textname;

    if (this.liveDemoform.invalid) {
      return;
    }
    if (this.liveDemoform.valid) {
      this.isSpinnerVisiblelivedemo = true;
      this.livedemo.liveDemoDetails(userName, livedemoemail, textname).subscribe(data => {
        this.isSpinnerVisiblelivedemo = false;
        if (data['status_code'] == '201') {
          this.liveDemoform.reset();
          this.closebutton.nativeElement.click();
          this.message = "Thank you for requesting for Auxo Ads demo. Our team will get in touch with you soon to schedule a session.";
          this.dialog.open(DialogDynamicComponent,
            {
              width: '450px',
              data: { message: this.message }
            });
        } else {
          this.closebutton.nativeElement.click();
          this.message = data['message'];
          this.dialog.open(DialogDynamicComponent,
            {
              width: '450px',
              data: { message: this.message }
            });
        }

      });
    }
  }
  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
  public cannotContainSpace(control: FormControl) {
    if ((control.value as string).indexOf(' ') >= 0) {
      return { cannotContainSpace: true }
    }
    return null;
  }

  onBusnChange(event:any) {
    const business_type = event.value;
    if (business_type == 'Website') {
      this.form.get('domain').setValidators([Validators.required,Validators.pattern("(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?")]);
      this.form.get('domain').updateValueAndValidity();
    }else{
      this.form.get('domain').clearValidators();
      this.form.get('domain').updateValueAndValidity(); 
    }
  }
}
