import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDynamicAccComponent } from '../dialog-dynamic/dialog-dynamic.component';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { Location } from '@angular/common';
import { PartnerProfileService } from './network-partner-profile.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
declare var $: any;
import { AppSettings } from '../../global/app-url';

@Component({
  selector: 'app-network-partner-profile',
  templateUrl: './network-partner-profile.component.html',
  styleUrls: ['./network-partner-profile.component.scss']
})

export class NetworkPartnerProfileComponent implements OnInit {
  pub_id: any;
  public isSpinnerVisible: boolean = true;
  options: FormGroup;
  public profileform: FormGroup = Object.create(null);
  public message: any;
  // public profile: any;
  public domianList: any;


  public pub_adsense_id_model: any;
  public pub_analytics_id_model: any;
  public pub_fname_model: any;
  public pub_lname_model: any;
  public pub_acc_name_model: any;
  public pub_email_model: any;
  public contact_model: any;
  public pub_company_model: any;
  public pub_display_share_model: any;
  public pub_video_share_model: any;
  public pub_app_share_model: any;
  public partner_uniq_id_model: any;

  constructor(activatedRouter: ActivatedRoute, private _partnerProfileService: PartnerProfileService, private fb: FormBuilder, private location: Location, private router: Router, public dialog: MatDialog,private http: HttpClient) {
    this.pub_id = activatedRouter.snapshot.paramMap.get('id');

    
    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
      color: 'primary',
      fontSize: [16, Validators.min(10)]
    });
  }

  ngOnInit() {
    this.profileform = this.fb.group({
      // pub_email: [null, Validators.compose([Validators.required])],
      pub_email: new FormControl({value: null, disabled: true}),
      pub_adsense_id: new FormControl({value: null, disabled: true}),
      pub_analytics_id: new FormControl({value: null, disabled: true}),
      pub_fname: new FormControl({value: null, disabled: true}),
      pub_lname: new FormControl({value: null, disabled: true}),
      pub_acc_name: new FormControl({value: null, disabled: true}),
      contact: new FormControl({value: null, disabled: true}),
      pub_company: new FormControl({value: null, disabled: true}),
      web_name: new FormControl({value: null, readonly: true}),
      partner_uniq_id: new FormControl({value: null, readonly: true}),
      pub_id: new FormControl({value: null, readonly: true}),
      pub_display_share: new FormControl({value: null, disabled: true}),
      pub_video_share: new FormControl({value: null, disabled: true}),
      pub_app_share: new FormControl({value: null, disabled: true}),
    });
    this._partnerProfileService.getpubProfile(this.pub_id).subscribe(dataResult => {
      if (dataResult['status_code'] == '200') {
        this.pub_adsense_id_model = dataResult['data']['profileData']['pub_adsense_id'];
        this.pub_analytics_id_model = dataResult['data']['profileData']['pub_analytics_id'];
        this.pub_fname_model = dataResult['data']['profileData']['pub_fname'];
        this.pub_lname_model = dataResult['data']['profileData']['pub_lname'];
        this.pub_acc_name_model = dataResult['data']['profileData']['pub_acc_name'];
        this.pub_email_model = dataResult['data']['profileData']['pub_email'];
        this.contact_model = dataResult['data']['profileData']['contact'];
        this.pub_company_model = dataResult['data']['profileData']['pub_company'];
        this.pub_display_share_model = dataResult['data']['profileData']['pub_display_share'];
        this.pub_video_share_model = dataResult['data']['profileData']['pub_video_share'];
        this.pub_app_share_model = dataResult['data']['profileData']['pub_app_share'];
        this.partner_uniq_id_model = dataResult['data']['profileData']['pub_uniq_id'];

        this.domianList = dataResult['data']['DomainData'];
        this.isSpinnerVisible = false;
      } else {
        this.message = dataResult['message'];
        this.dialog.open(DialogDynamicAccComponent,
          {
            width: '450px',
            data: { message: this.message }
          });
        this.isSpinnerVisible = false;
      }
    });
  }
  backPage() {
    this.location.back();
  }

  /** Publisher Profile Update Code  */
  profileSubmit() {
    let currentUrl = this.router.url;
    this.isSpinnerVisible = true;
    const fData: any = new FormData;
    fData.append("uniq_id", localStorage.getItem('uniq_id'));
    fData.append("manager_id", localStorage.getItem('manager_id'));
    fData.append("pub_id", this.profileform.value.pub_id);
    fData.append("pub_adsense_id", this.profileform.value.pub_adsense_id);
    fData.append("pub_display_share", this.profileform.value.pub_display_share);
    fData.append("pub_video_share", this.profileform.value.pub_video_share);
    fData.append("pub_app_share", this.profileform.value.pub_app_share);
    fData.append("partner_uniq_id", this.profileform.value.partner_uniq_id);
    var t = localStorage.getItem('access_token');
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
    const httpOptions = {
      headers: headers_object
    };

    this.http.post(AppSettings.API_STARTPOINT+'/assets/api/admin/acc_mgr/save_profile.php', fData, httpOptions).subscribe(data => {
      if (data['status_code'] == '200') {
        this.isSpinnerVisible = false;
        this.message = data['message'];
        
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentUrl]);
        });
      } else {
        this.isSpinnerVisible = false;
        this.message = data['message'];
        this.dialog.open(DialogDynamicAccComponent,
          {
            width: '450px',
            data: { message: this.message }
          });
      }
    })
  }
}

