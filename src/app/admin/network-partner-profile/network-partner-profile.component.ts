import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminDialogDynamicComponent } from '../dialog-dynamic/admin-dialog-dynamic.component';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { PartnerProfileService } from './network-partner-profile.service';
import { AppSettings } from '../../global/app-url';
import { ActivatedRoute } from '@angular/router';
declare var $: any;

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
  public acc_mgr_list: any;



  public pub_child_net_code_model: any;
  public pub_adsense_id_model: any;
  public pub_fname_model: any;
  public pub_lname_model: any;
  public pub_manager_id_model: string;
  public pub_email_model: any;
  public pub_address_model: any;
  public contact_model: any;
  public pub_company_model: any;
  public pub_display_share_model: any;
  public pub_video_share_model: any;
  public pub_app_share_model: any;
  constructor(activatedRouter: ActivatedRoute, private _partnerProfileService: PartnerProfileService, private fb: FormBuilder, private location: Location, private router: Router, public dialog: MatDialog, private http: HttpClient) {
    this.pub_id = activatedRouter.snapshot.paramMap.get('id');
  }
  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
  ngOnInit() {
    this.profileform = this.fb.group({
      child_net_code: [null, Validators.compose([Validators.required, Validators.minLength(5),Validators.maxLength(20), this.noWhitespaceValidator, Validators.pattern("^[0-9]+")])],
      pub_adsense_id: [null, Validators.compose([Validators.minLength(12), Validators.pattern("^[a-zA-Z0-9-]+")])],
      pub_fname: [null, Validators.compose([Validators.required, Validators.minLength(3), this.noWhitespaceValidator, Validators.pattern("^[a-zA-Z0-9-./& ]+")])],
      pub_lname: [null, Validators.compose([Validators.pattern("^[a-zA-Z0-9-./& ]+")])],
      manager_id: [null, Validators.compose([Validators.required])],
      pub_email: [{value: null, disabled: true}],
      pub_address: [null, Validators.compose([Validators.minLength(5)])],
      contact: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(12), Validators.pattern(/^[1-9][0-9]*$/)])],
      pub_company: [null, Validators.compose([Validators.required, Validators.minLength(3), this.noWhitespaceValidator, Validators.pattern("^[a-zA-Z0-9-./& ]+")])],
      pub_display_share: [null, Validators.compose([Validators.maxLength(3), Validators.pattern("^[0-9]+")])],
      pub_video_share: [null, Validators.compose([Validators.maxLength(3), Validators.pattern("^[0-9]+")])],
      pub_app_share: [null, Validators.compose([Validators.maxLength(3), Validators.pattern("^[0-9]+")])],
    });
    this._partnerProfileService.getpubProfile(this.pub_id).subscribe(dataResult => {
      if (dataResult['status_code'] == '200') {
        this.pub_child_net_code_model = dataResult['data']['profileData']['child_net_code'];
        this.pub_adsense_id_model = dataResult['data']['profileData']['pub_adsense_id'];
        this.pub_fname_model = dataResult['data']['profileData']['pub_fname'];
        this.pub_lname_model = dataResult['data']['profileData']['pub_lname'];
        this.pub_manager_id_model = dataResult['data']['profileData']['manager_id'].toString();
        this.pub_email_model = dataResult['data']['profileData']['pub_email'];
        this.pub_address_model = dataResult['data']['profileData']['pub_address'];
        this.contact_model = dataResult['data']['profileData']['contact'];
        this.pub_company_model = dataResult['data']['profileData']['pub_company'];
        this.pub_display_share_model = dataResult['data']['profileData']['pub_display_share'];
        this.pub_video_share_model = dataResult['data']['profileData']['pub_video_share'];
        this.pub_app_share_model = dataResult['data']['profileData']['pub_app_share'];

        this.acc_mgr_list = dataResult['manager_list'];
        this.isSpinnerVisible = false;
      } else {
        this.message = dataResult['message'];
        this.dialog.open(AdminDialogDynamicComponent,
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
    if (this.profileform.invalid) {
      console.log("invalid update from");
      return;
    } else {
      let currentUrl = this.router.url;
      this.isSpinnerVisible = true;
      const fData: any = new FormData;
      fData.append("uniq_id", localStorage.getItem('uniq_id'));
      fData.append("manager_id", this.profileform.value.manager_id);
      fData.append("child_net_code", this.profileform.value.child_net_code);
      fData.append("pub_adsense_id", this.profileform.value.pub_adsense_id);
      fData.append("pub_fname", this.profileform.value.pub_fname);
      fData.append("pub_lname", this.profileform.value.pub_lname);
      // fData.append("pub_email", this.profileform.value.pub_email);
      fData.append("pub_address", this.profileform.value.pub_address);
      fData.append("contact", this.profileform.value.contact);
      fData.append("pub_company", this.profileform.value.pub_company);
      fData.append("pub_display_share", this.profileform.value.pub_display_share);
      fData.append("pub_video_share", this.profileform.value.pub_video_share);
      fData.append("pub_app_share", this.profileform.value.pub_app_share);
      fData.append("partner_uniq_id", this.pub_id);
      var t = localStorage.getItem('access_token');
      var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
      const httpOptions = {
        headers: headers_object
      };

      this.http.post(AppSettings.API_STARTPOINT + '/assets/api/admin/backend-admin/save_profile.php', fData, httpOptions).subscribe(data => {
        if (data['status_code'] == '200') {
          this.isSpinnerVisible = false;
          this.message = data['message'];
          this.dialog.open(AdminDialogDynamicComponent,
            {
              width: '450px',
              data: { message: this.message }
            });
        } else {
          this.isSpinnerVisible = false;
          this.message = data['message'];
          this.dialog.open(AdminDialogDynamicComponent,
            {
              width: '450px',
              data: { message: this.message }
            });
        }
      });
    }

  }

}

