import { Component, ViewChild, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import {HttpClient} from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SalesDialogDynamicComponent } from '../sales-dialog-dynamic/sales-dialog-dynamic.component';
import { ObmadmanageinvitepublisherService } from './obmadmanageinvitepublisher.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-obm-admanager-invite-publisherdetails',
  templateUrl: './obm-admanager-invite-publisherdetails.component.html',
  styleUrls: ['./obm-admanager-invite-publisherdetails.component.scss']
})

export class OBMAdManagerPublisherDetailsComponent implements OnInit  {
  form: FormGroup;
  submitted = false;
  public isSpinnerVisible: boolean = false;

  public message: string;

  public publisherid: string;
  public publisherUniqueId: string;
  public pubUniqueId: string;

  public isRefferedname: boolean = false;
  public isRefferedemail: boolean = false;
  public isRefferedmobile: boolean = false;

  public isAdxforappshare: boolean = false;
  public isAdxforcontentshare: boolean = false;
  public isAdxforvideoshare: boolean = false;
  public ReadOnlyStyle: boolean = false;
  refferby_email_dis: boolean = false;
  refferby_name_dis: boolean = false;
  refferby_phno_dis: boolean = false;
  public emailStatus: string;
  public salesId : number;
  public channelId: string;
  public referStatus: string;

  public publisherEmail : string;
  public publisherContact: string;

  PublisherType: any = ['Individual', 'Media House', 'Network'];
  OrganizationType: any = ['Company', 'Firm', 'HUF', 'Individual', 'Other'];

  constructor(private fb: FormBuilder, public dialog: MatDialog, private location: Location, private restAPI:ObmadmanageinvitepublisherService, private router: Router, private actRoute: ActivatedRoute, private http : HttpClient) { 
    this.publisherid = actRoute.snapshot.paramMap.get('pub_id');
    
  }

  ngOnInit() {
      
    this.form = this.fb.group({
      publisheremail: ['', [Validators.required, Validators.email]],
      publishercontact: ['', [Validators.required]],
      publisher_type: ['', [Validators.required]],
      org_type: ['', [Validators.required]],
      org_name:[null,[Validators.required,Validators.minLength(3),Validators.pattern("^[a-zA-Z0-9-./&_ ]+")]],
      domainmanaged:[null,[Validators.pattern("^[0-9]+")]],
      editorialteamsize:['',[Validators.pattern("^[0-9]+")]],
      directsale:[''],
      adxforapp:[''],
      adxforcontent:[''],
      adxforvideo:[''],
      adxforappshare:['',[Validators.pattern("^[0-9]+")]],
      adxforcontentshare:['',[Validators.pattern("^[0-9]+")]],
      adxforvideoshare:['',[Validators.pattern("^[0-9]+")]],
      adsensenetworkid:['',[Validators.pattern("^[a-zA-Z0-9-]+")]],
      adsenserevenueshare:['',[Validators.pattern("^[0-9]+")]],
      analyticsid:['',[Validators.pattern("^[a-zA-Z0-9-]+")]],
      publishersales:['', [Validators.required]],
      publishersaleschannel:['', [Validators.required]],
      publisherremark:['',[Validators.pattern("^[a-zA-Z0-9 ]+")]],
      hasreffered:[''],
      refferedname:[''],
      refferedemail:[''],
      refferedmobile:['']
    });
    this.callObmInvitePublisherData();
  }

  backPage(){
    this.location.back();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit() {
    let currentUrl = this.router.url;

    if (this.form.invalid) {
      return;
    }

    if (this.form.valid) {
      this.isSpinnerVisible = true;
      this.publisherUniqueId = localStorage.getItem('uniq_id');

      var hasrefferedVal="Y";
      if(this.form.value.hasreffered=="")
        hasrefferedVal = "N";

        var adxforcontent = 1;
        var adxforvideo = 1;
        var adxforapp = 1;
        if(this.form.value.adxforcontent==false)
          adxforcontent = 0;

          if(this.form.value.adxforvideo==false)
          adxforvideo = 0;

          if(this.form.value.adxforapp==false)
          adxforapp = 0;

      const publisher_data: any = 
      {
          "obm_uniq_id":this.publisherUniqueId,
          "pub_id": this.publisherid,
          "pub_uniq_id":this.pubUniqueId,
          "pub_email": this.publisherEmail,
          "pub_contact": this.publisherContact,
          "pub_type": this.form.value.publisher_type,
          "org_type": this.form.value.org_type,
          "org_name": this.form.value.org_name,
          "domain_managed": this.form.value.domainmanaged,
          "team_size": this.form.value.editorialteamsize,
          "direct_sales": this.form.value.directsale,
          "adx_for_display": adxforcontent,
          "adx_for_video": adxforvideo,
          "adx_for_app": adxforapp,
          "display_share": this.form.value.adxforcontentshare,
          "video_share": this.form.value.adxforvideoshare,
          "app_share": this.form.value.adxforappshare,
          "adsense_id": this.form.value.adsensenetworkid,
          "adsense_share": this.form.value.adsenserevenueshare,
          "sales_id": this.form.value.publishersales,
          "channel_id": this.form.value.publishersaleschannel,
          "remark": this.form.value.publisherremark,
          "refer": hasrefferedVal,
          "refer_name": this.form.value.refferedname,
          "refer_email": this.form.value.refferedemail,
          "refer_contact": this.form.value.refferedmobile,
          "analytics_id": this.form.value.analyticsid,
          "email_status": this.emailStatus
      };

      return this.restAPI.getObmAdManagerInviteFormData(localStorage.getItem('uniq_id'),localStorage.getItem('useremail'), publisher_data).subscribe((response)=>{

        if (response['status_code'] == '200') {
          this.isSpinnerVisible = false;
          this.message = response['message'];
          this.dialog.open(SalesDialogDynamicComponent,
          {
              width: '450px',
              data: {message:this.message}
          });

          // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          //   this.router.navigate([currentUrl]);
          // });
        } else {
            this.isSpinnerVisible = false;
            this.message = response['message'];
            this.dialog.open(SalesDialogDynamicComponent,
            {
                width: '450px',
                data: {message:this.message}
            });
        }
      });
    }
  }

  publisherData: any = [];
  publisherApp: any = [];
  publisherSales: any = [];
  publisherSalesChannel: any = [];
  publisherReferer: any = [];

  callObmInvitePublisherData(){
    this.isSpinnerVisible = true;
    // this.actRoute.queryParams.subscribe(params => {
    //   this.publisherid = params.publisherid;
    // });

    return this.restAPI.getObmAdManagerInvitePublisherData(localStorage.getItem('uniq_id'),localStorage.getItem('useremail'), this.publisherid).subscribe((response)=>{
        if(response['status_code']=='200'){

            this.publisherData = response.data;
            this.publisherApp = response.app;
            this.publisherSales = response.sales;
            this.publisherSalesChannel = response.saleschannel;
            this.publisherReferer = response.refer;

            this.emailStatus = this.publisherData.email_status;
            this.salesId = this.publisherData.sal_id;
            this.channelId = this.publisherData.channel_id;
            this.pubUniqueId = this.publisherData.pub_uniq_id;

            this.publisherEmail = this.publisherData.pub_email;
            this.publisherContact = this.publisherData.contact;

            if(this.publisherReferer.length==0){
              this.referStatus = '';
              this.publisherData.refer = "";
            }else{
              this.referStatus = 'Y';
              this.publisherData.refer = 'Y';
              this.ReadOnlyStyle = true;
              this.refferby_email_dis = true;
              this.refferby_name_dis = true;
              this.refferby_phno_dis = true;
              this.showReferDetails(this.referStatus);
            }

            if(this.publisherData.adx_for_app==1){
              this.isAdxforappshare = true;
            }
            if(this.publisherData.adx_for_display==1){
              this.isAdxforcontentshare = true;
            }
            if(this.publisherData.adx_for_video==1){
              this.isAdxforvideoshare = true;
            }

            this.form = this.fb.group({
              publisheremail: [{value: this.publisherEmail, disabled: true}],
              publishercontact: [{value: this.publisherContact, disabled: true}],
              publisher_type: [this.publisherData.pub_type],
              org_type: [this.publisherData.pub_org_type],
              org_name:[this.publisherData.pub_company,[Validators.required,Validators.minLength(3),Validators.pattern("^[a-zA-Z0-9-./&_ ]+")]],
              domainmanaged:[this.publisherData.total_domain_mang,[Validators.pattern("^[0-9]+")]],
              editorialteamsize:[this.publisherData.edit_team_size,[Validators.pattern("^[0-9]+")]],
              directsale:[this.publisherData.direct_sale],
              adxforapp:[this.publisherData.adx_for_app],
              adxforcontent:[this.publisherData.adx_for_display],
              adxforvideo:[this.publisherData.adx_for_video],
              adxforappshare:[this.publisherData.pub_app_share,[Validators.pattern("^[0-9]+")]],
              adxforcontentshare:[this.publisherData.pub_display_share,[Validators.pattern("^[0-9]+")]],
              adxforvideoshare:[this.publisherData.pub_video_share,[Validators.pattern("^[0-9]+")]],
              adsensenetworkid:[this.publisherData.pub_adsense_id,[Validators.pattern("^[a-zA-Z0-9-]+")]],
              adsenserevenueshare:[this.publisherData.pub_adsense_share,[Validators.pattern("^[0-9]+")]],
              analyticsid:[this.publisherData.pub_analytics_id,[Validators.pattern("^[a-zA-Z0-9-]+")]],
              publishersales:[this.publisherData.sal_id],
              publishersaleschannel:[this.publisherData.channel_id],
              publisherremark:[this.publisherData.remark,[Validators.pattern("^[a-zA-Z0-9 ]+")]],
              hasreffered:[this.publisherData.refer],
              refferedname:[{value:this.publisherReferer.refferby_name,disabled:this.refferby_name_dis}],
              refferedemail:[{value:this.publisherReferer.refferby_email,disabled:this.refferby_email_dis}],
              refferedmobile:[{value:this.publisherReferer.refferby_phno,disabled:this.refferby_phno_dis}]
            });
            this.isSpinnerVisible = false;
        }else{

            this.message = "Token is expired, Please login again!!";
            this.dialog.open(SalesDialogDynamicComponent,
            {
                width: '450px',
                data: {message:this.message}
            });
            this.isSpinnerVisible = false;
        }
    });
  }

  showAppRevenue(){
    this.isAdxforappshare = this.isAdxforappshare ? false : true;
    if(this.isAdxforappshare){
      this.form.get('adxforappshare').setValidators([Validators.required,Validators.pattern("^[0-9]+")]);
      this.form.get('adxforappshare').updateValueAndValidity();
    }else{
      this.form.get("adxforappshare").setValue("0");
      this.form.get("adxforappshare").clearValidators();
      this.form.get("adxforappshare").updateValueAndValidity();
    }
  }

  showContentRevenue(){
    this.isAdxforcontentshare = this.isAdxforcontentshare ? false : true;
    if(this.isAdxforcontentshare){
      this.form.get('adxforcontentshare').setValidators([Validators.required,Validators.pattern("^[0-9]+")]);
      this.form.get('adxforcontentshare').updateValueAndValidity();
    }else{
      this.form.get("adxforcontentshare").setValue("0");
      this.form.get("adxforcontentshare").clearValidators();
      this.form.get("adxforcontentshare").updateValueAndValidity();
    }
  }

  showVideoRevenue(){
    this.isAdxforvideoshare = this.isAdxforvideoshare ? false : true;
    if(this.isAdxforvideoshare){
      this.form.get('adxforvideoshare').setValidators([Validators.required,Validators.pattern("^[0-9]+")]);
      this.form.get('adxforvideoshare').updateValueAndValidity();
    }else{
      this.form.get("adxforvideoshare").setValue("0");
      this.form.get("adxforvideoshare").clearValidators();
      this.form.get("adxforvideoshare").updateValueAndValidity();
    }
  }

  showReferDetails(refereValue: string){
    this.isRefferedname = this.isRefferedname ? false : true;
    this.isRefferedemail = this.isRefferedemail ? false : true;
    this.isRefferedmobile = this.isRefferedmobile ? false : true;

    if(refereValue=="Y"){
      this.isRefferedname = true;
      this.isRefferedemail = true;
      this.isRefferedmobile = true;
    }else{
      this.isRefferedname = false;
      this.isRefferedemail = false;
      this.isRefferedmobile = false;
    }

    if(this.isRefferedname){
      this.form.get('refferedname').setValidators([Validators.compose([Validators.required, Validators.minLength(3), this.noWhitespaceValidator,Validators.pattern("^[a-zA-Z ]+")])]);
      this.form.get('refferedname').updateValueAndValidity();
    }else{
      this.form.get("refferedname").setValue("");
      this.form.get("refferedname").clearValidators();
      this.form.get("refferedname").updateValueAndValidity();
    }

    if(this.isRefferedemail){
      this.form.get('refferedemail').setValidators(Validators.compose([Validators.email,Validators.required,Validators.pattern("^([a-zA-Z0-9]+\.)+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$")]));
      this.form.get('refferedemail').updateValueAndValidity();
    }else{
      this.form.get("refferedemail").setValue("");
      this.form.get("refferedemail").clearValidators();
      this.form.get("refferedemail").updateValueAndValidity();
    }

    if(this.isRefferedmobile){
      this.form.get('refferedmobile').setValidators(Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(12), Validators.pattern(/^[1-9][0-9]*$/)]));
      this.form.get('refferedmobile').updateValueAndValidity();
    }else{
      this.form.get("refferedmobile").setValue("");
      this.form.get("refferedmobile").clearValidators();
      this.form.get("refferedmobile").updateValueAndValidity();
    }

  }
  public noWhitespaceValidator(control: FormControl) {
    const isWhitespacelen = (control.value || '').length;
    let isValid: any;
    if(isWhitespacelen >0){
      const isWhitespace = (control.value || '').trim().length === 0;
      isValid = !isWhitespace;
      return isValid ? null : { 'whitespace': true };
    }else{
      return null;
    }
  }
}
