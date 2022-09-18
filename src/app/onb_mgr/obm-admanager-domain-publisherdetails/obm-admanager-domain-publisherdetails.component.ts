import { Component, ViewChild, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import {HttpClient} from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDynamicComponent } from 'src/app/publisher/dialog-dynamic/dialog-dynamic.component';
import { ObmadmanagerdomainpublisherService } from './obmadmanagerdomainpublisher.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-obm-admanager-domain-publisherdetails',
  templateUrl: './obm-admanager-domain-publisherdetails.component.html',
  styleUrls: ['./obm-admanager-domain-publisherdetails.component.scss']
})

export class OBMAdManagerPublisherDetailsComponent implements OnInit{

  public form: FormGroup = Object.create(null);
  submitted = false;
  public isSpinnerVisible: boolean = false;

  public message: string;

  public publisherid: string;
  public domainid: string;
  public publisherUniqueId: string;

  public verticleName: string;
  public emailStatus: string;

  public publisherName: string;
  public webName: string;
  public McmNonMcmStatus: string;
  public publisherEmail: string;

  PublisherType: any = ['Individual', 'Media House', 'Network'];
  OrganizationType: any = ['Company', 'Firm', 'HUF', 'Individual', 'Other'];
  TrafficSource: any = ['Organic', 'Direct', 'Social', 'Refferal', 'Search'];
  InventoryQuality: any = ['Premium', 'Basic', 'Affilate'];

  constructor(private fb: FormBuilder, public dialog: MatDialog, private location: Location, private restAPI:ObmadmanagerdomainpublisherService, private router: Router, private actRoute: ActivatedRoute, private http : HttpClient) { 
    this.publisherid = actRoute.snapshot.paramMap.get('pub_id');
    this.domainid = actRoute.snapshot.paramMap.get('domain_id');

    this.form = this.fb.group({
      publisheremail: ['', [Validators.required, Validators.email]],
      publishercontact: ['', [Validators.required]],
      org_type: ['', [Validators.required]],
      org_name:['', [Validators.required]],
      web_name:['', [Validators.required]],
      traffic_source:['', [Validators.required]],
      primary_geo:['',[this.noWhitespaceValidator,Validators.pattern("^[a-zA-Z ]+")]],
      inventory_quality:['', [Validators.required]],
      veriticle_one:['', [Validators.required]],
      veriticle_two:['',[this.noWhitespaceValidator,Validators.pattern("^[a-zA-Z ]+")]],
      analyticsid:['',[Validators.pattern("^[a-zA-Z0-9-]+")]]
    });
  }

  ngOnInit() {
    this.callObmDomainPublisherData();
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

      const publisher_data: any = 
      {
          "obm_uniq_id":this.publisherUniqueId,
          "domain_id": this.domainid,
          "vertical1": this.form.value.veriticle_one,
          "vertical2": this.form.value.veriticle_two,
          "inventory_quality": this.form.value.inventory_quality,
          "primary_geo": this.form.value.primary_geo,
          "traffic_source": this.form.value.traffic_source,
          "web_analytics_id": this.form.value.analyticsid,
          "email_status":this.emailStatus,
          "pub_name":this.publisherName,
          "web_name":this.webName,
          "mcm_nonmcm_status":this.McmNonMcmStatus, //1 fro MCM & 0 For NonMcm
          "pub_email":this.publisherEmail
      };

      return this.restAPI.getObmAdManagerDomainFormData(localStorage.getItem('uniq_id'),localStorage.getItem('useremail'), publisher_data).subscribe((response)=>{

        if (response['status_code'] == '200') {
          this.isSpinnerVisible = false;
          this.message = response['message'];
          this.dialog.open(DialogDynamicComponent,
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
            this.dialog.open(DialogDynamicComponent,
            {
                width: '450px',
                data: {message:this.message}
            });
        }
      });
    }
  }

  publisherData: any = [];
  verticalsData: any = [];
  callObmDomainPublisherData(){
    this.isSpinnerVisible = true;
    // this.actRoute.queryParams.subscribe(params => {
    //   this.publisherid = params.publisherid;
    //   this.domainid = params.domainid;
    // });

    return this.restAPI.getObmAdManagerDomainPublisherData(localStorage.getItem('uniq_id'),localStorage.getItem('useremail'), this.publisherid, this.domainid).subscribe((response)=>{

        if(response['status_code']=='200'){
            this.publisherData = response.data;
            this.verticalsData = response.verticals;

            this.verticleName = this.publisherData.vertical;
            this.emailStatus = this.publisherData.email_status;
            this.publisherName = this.publisherData.name;
            this.webName = this.publisherData.web_name;
            this.McmNonMcmStatus = this.publisherData.mcm_nonmcm_status;
            this.publisherEmail = this.publisherData.pub_email;

            this.form = this.fb.group({
              publisheremail: [{value: this.publisherData.pub_email, disabled: true}],
              publishercontact: [{value: this.publisherData.contact, disabled: true}],
              org_type: [{value: this.publisherData.pub_org_type, disabled: true}],
              org_name:[{value: this.publisherData.pub_company, disabled: true}],
              web_name:[{value: this.publisherData.web_name, disabled: true}],
              traffic_source:[this.publisherData.web_traffic_source],
              // primary_geo:[this.publisherData.web_primary_geo],
              primary_geo:[this.publisherData.web_primary_geo,[this.noWhitespaceValidator,Validators.pattern("^[a-zA-Z ]+")]],
              inventory_quality:[this.publisherData.web_inventory_qty],
              veriticle_one:[this.verticleName],
              veriticle_two:[this.publisherData.vertical2,[Validators.pattern("^[a-zA-Z ]+")]],
              analyticsid:[this.publisherData.web_analtics_id,[Validators.pattern("^[a-zA-Z0-9-]+")]],
            });

            this.isSpinnerVisible = false;
        }else{

            this.message = "Token is expired, Please login again!!";
            this.dialog.open(DialogDynamicComponent,
            {
                width: '450px',
                data: {message:this.message}
            });
            this.isSpinnerVisible = false;
        }
    });
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

