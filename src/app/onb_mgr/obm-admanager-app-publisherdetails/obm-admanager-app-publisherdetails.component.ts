import { Component, ViewChild, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import {HttpClient} from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDynamicComponent } from 'src/app/publisher/dialog-dynamic/dialog-dynamic.component';
import { ObmadmanagerapppublisherService } from './obmadmanagerapppublisher.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-obm-admanager-app-publisherdetails',
  templateUrl: './obm-admanager-app-publisherdetails.component.html',
  styleUrls: ['./obm-admanager-app-publisherdetails.component.scss']
})

export class OBMAdManagerPublisherDetailsComponent implements OnInit{

  public form: FormGroup = Object.create(null);
  submitted = false;
  public isSpinnerVisible: boolean = false;

  public message: string;

  public publisherid: string;
  public appid: string;
  public publisherUniqueId: string;

  public verticleName: string;
  public publisherEmail: string;

  PublisherType: any = ['Individual', 'Media House', 'Network'];
  OrganizationType: any = ['Company', 'Firm', 'HUF', 'Individual', 'Other'];
  TrafficSource: any = ['Organic', 'Direct', 'Social', 'Refferal', 'Search'];
  InventoryQuality: any = ['Premium', 'Basic', 'Affilate'];

  constructor(private fb: FormBuilder, public dialog: MatDialog, private location: Location, private restAPI:ObmadmanagerapppublisherService, private router: Router, private actRoute: ActivatedRoute, private http : HttpClient) { 
    this.publisherid = actRoute.snapshot.paramMap.get('pub_id');
    this.appid = actRoute.snapshot.paramMap.get('app_id');

    this.form = this.fb.group({
      publisheremail: ['', [Validators.required, Validators.email]],
      publishercontact: ['', [Validators.required]],
      org_type: ['', [Validators.required]],
      org_name:['', [Validators.required]],
      app_name:['', [Validators.required]],
      traffic_source:['', [Validators.required]],
      primary_geo:['',[this.noWhitespaceValidator,Validators.pattern("^[a-zA-Z ]+")]],
      inventory_quality:['', [Validators.required]],
      veriticle_one:['', [Validators.required]],
      veriticle_two:[null,[this.noWhitespaceValidator,Validators.pattern("^[a-zA-Z ]+")]],
    });
  }

  ngOnInit() {
    this.callObmAppPublisherData();
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
          "pub_id": this.publisherid,
          "app_id": this.appid,
          "vertical1": this.form.value.veriticle_one,
          "vertical2": this.form.value.veriticle_two,
          "inventory_quality": this.form.value.inventory_quality,
          "primary_geo": this.form.value.primary_geo,
          "traffic_source": this.form.value.traffic_source,
          "pub_email":this.publisherEmail
      };
      
      return this.restAPI.getObmAdManagerAppFormData(localStorage.getItem('uniq_id'),localStorage.getItem('useremail'), publisher_data).subscribe((response)=>{

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
  callObmAppPublisherData(){
    this.isSpinnerVisible = true;
    // this.actRoute.queryParams.subscribe(params => {
    //   this.publisherid = params.publisherid;
    //   this.appid = params.appid;
    // });

    return this.restAPI.getObmAdManagerAppPublisherData(localStorage.getItem('uniq_id'),localStorage.getItem('useremail'), this.publisherid, this.appid).subscribe((response)=>{

        if(response['status_code']=='200'){
            this.publisherData = response.data;
            this.verticalsData = response.verticals;

            this.verticleName = this.publisherData.vertical;
            this.publisherEmail = this.publisherData.pub_email;
            
            this.form = this.fb.group({
              publisheremail: [{value: this.publisherData.pub_email, disabled: true}],
              publishercontact: [{value: this.publisherData.contact, disabled: true}],
              org_type: [this.publisherData.pub_org_type],
              org_name:[{value: this.publisherData.pub_company, disabled: true}],
              app_name:[{value: this.publisherData.app_name, disabled: true}],
              traffic_source:[this.publisherData.traffic_source],
              primary_geo:[this.publisherData.primary_geo,[this.noWhitespaceValidator,Validators.pattern("^[a-zA-Z ]+")]],
              inventory_quality:[this.publisherData.inventory_qty],
              veriticle_one:[this.verticleName],
              veriticle_two:[this.publisherData.vertical2,[this.noWhitespaceValidator,Validators.pattern("^[a-zA-Z ]+")]],
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

