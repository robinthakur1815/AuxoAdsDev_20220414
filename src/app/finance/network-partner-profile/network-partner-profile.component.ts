import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { PartnerProfileService } from './network-partner-profile.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FinanceDialogDynamicComponent } from '../finance-dialog-dynamic/finance-dialog-dynamic.component';

@Component({
  selector: 'app-network-partner-profile',
  templateUrl: './network-partner-profile.component.html',
  styleUrls: ['./network-partner-profile.component.scss']
})

  export class NetworkPartnerProfileComponent  {
    public pub_id: any;
    public profileform: FormGroup = Object.create(null);
    acc_mgr_list = [];
    public message;
    public isSpinnerVisible: boolean = true;

    public pub_child_net_code_model: any;
    public pub_adsense_id_model: any;
    public pub_analytics_id_model: any;
    public pub_manager_id_model: string;
    public pub_fname_model: any;
    public pub_lname_model: any;
    public pub_acc_name_model: any;
    public pub_email_model: any;
    public pub_address_model: any;
    public contact_model: any;
    public pub_company_model: any;
    public pub_display_share_model: any;
    public pub_video_share_model: any;
    public pub_app_share_model: any;
    public partner_uniq_id_model: any;
    public pub_user_status_model: any;


    constructor(activatedRouter: ActivatedRoute,private fb: FormBuilder, private location: Location, private router: Router,private _partnerService: PartnerProfileService,public dialog: MatDialog) {
      this.pub_id = activatedRouter.snapshot.paramMap.get('id');
    }

    ngOnInit() {
      this.profileform = this.fb.group({
        pub_child_net_code: new FormControl({value: null, disabled: true}),
        pub_adsense_id: new FormControl({value: null, disabled: true}),
        pub_analytics_id: new FormControl({value: null, disabled: true}),
        pub_manager_id: new FormControl({value: null, disabled: true}),
        pub_fname: new FormControl({value: null, disabled: true}),
        pub_lname: new FormControl({value: null, disabled: true}),
        pub_email: new FormControl({value: null, disabled: true}),
        pub_address: new FormControl({value: null, disabled: true}),
        contact: new FormControl({value: null, disabled: true}),
        pub_company: new FormControl({value: null, disabled: true}),
        pub_display_share: new FormControl({value: null, disabled: true}),
        pub_video_share: new FormControl({value: null, disabled: true}),
        pub_user_status: new FormControl({value: null, disabled: true}),
        
      });
      this.callbackfuntion();
    }
    callbackfuntion(){
      this._partnerService.getAccountManagerList().subscribe(dataResult => {
          if (dataResult['status_code'] == '200') {
              this.acc_mgr_list = dataResult['manager_list'];
          } else {
            this.message = dataResult['message'];
            this.dialog.open(FinanceDialogDynamicComponent,
                {
                    width: '450px',
                    data: { message: this.message }
                });
            this.isSpinnerVisible = false;
          }
      });

      this._partnerService.getpubProfile(this.pub_id).subscribe(dataResult => {
        if (dataResult['status_code'] == '200') {
          this.pub_child_net_code_model = dataResult['data']['profileData']['child_net_code'];
          this.pub_adsense_id_model = dataResult['data']['profileData']['pub_adsense_id'];
          this.pub_analytics_id_model = dataResult['data']['profileData']['pub_analytics_id'];
          this.pub_manager_id_model = dataResult['data']['profileData']['manager_id'].toString();
          this.pub_fname_model = dataResult['data']['profileData']['pub_fname'];
          this.pub_lname_model = dataResult['data']['profileData']['pub_lname'];
          this.pub_acc_name_model = dataResult['data']['profileData']['pub_acc_name'];
          this.pub_email_model = dataResult['data']['profileData']['pub_email'];
          this.pub_address_model = dataResult['data']['profileData']['pub_address'];
          this.contact_model = dataResult['data']['profileData']['contact'];
          this.pub_company_model = dataResult['data']['profileData']['pub_company'];
          this.pub_display_share_model = dataResult['data']['profileData']['pub_display_share'];
          this.pub_video_share_model = dataResult['data']['profileData']['pub_video_share'];
          this.pub_app_share_model = dataResult['data']['profileData']['pub_app_share'];
          this.partner_uniq_id_model = dataResult['data']['profileData']['pub_uniq_id'];
          const user_status = dataResult['data']['profileData']['user_status'];
          if(user_status=='Y'){
            this.pub_user_status_model = 1;
          }else{
            this.pub_user_status_model = 0;
          }
          
  
          this.isSpinnerVisible = false;
        } else {
          this.message = dataResult['message'];
          this.dialog.open(FinanceDialogDynamicComponent,
            {
              width: '450px',
              data: { message: this.message }
            });
          this.isSpinnerVisible = false;
        }
      });
  }
    backPage(){
      this.location.back();
    }
  
  }

