import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import {FormBuilder,FormGroup,Validators,FormControl} from '@angular/forms';
import { BankdetailService } from './bankdetails.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDynamicComponent } from '../dialog-dynamic/dialog-dynamic.component';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AppSettings } from '../../global/app-url';
declare var $: any;


@Component({
  templateUrl: './filedialog.component.html',
  styleUrls: ['./bankdetails.component.scss']
})

export class DialogOverviewExampleBankDetailsComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleBankDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}


@Component({
  selector: 'app-bankdetails',
  templateUrl: './bankdetails.component.html',
  styleUrls: ['./bankdetails.component.scss']
})

export class BankDetailsComponent implements OnInit {
  countrydata = [];
  statedata = [];
  bankdataresult: boolean = false;
  options: FormGroup;
  public bankdetailform: FormGroup = Object.create(null);
  public countryInd: boolean = false;
  public aadharshowhide: boolean = true;
  public incorpshowhide: boolean = true;
  public countrySingapore: boolean = false;
  public countryOther: boolean = false;
  public gstregistredinner: boolean = true;
  public gstregistredouter: boolean = false;
  public isSpinnerVisible: boolean = false;


  public pub_company_type;
  public pub_country;
  public pub_country_code_id;
  public pub_acc_holder_address;
  public pub_city;
  public pub_state;
  public pub_postal_code;
  public pub_acc_holder_name;
  public pub_bank_name;
  public pub_acc_number;
  // public pub_bank_ifsc;
  public pub_swift_code;
  public pub_bank_address;
  public pub_bank_city;
  public pub_bank_state;
  public pub_bank_postal;
  public pub_bank_acc_type;
  public pub_pan_number;
  public pub_gst_address;
  public pub_gst_city;
  public pub_gst_state;
  public pub_gst_postal;
  public pub_gst_num;
  public pub_gst_certificate;
  public pub_pan_card_file;
  public pub_incorp_certificate_fille;
  public pub_aadhaar_card_file;
  public pub_cancel_check_file;

  public pub_bank_id;
  public pub_itr_copy;
  public pub_region_type;
  public pub_service_tax;
  public pub_service_tax_num;
  public pub_status_bank:number;
  public gstregistred;
  public pub_panfilename;
  public pub_gstfilename;
  public pub_corpfilename;
  public pub_aadharfilename;
  public pub_chequefilename;
  public pubfilenameset;
  public pubfiletitleset;

  public gst_extn;
  public pan_extn;
  public aadhar_extn;
  public incorp_extn;
  public cheque_extn;
  public file_extenstion;
  

  message: string;
  hide = true;
  gstimages_up : string[] = [];
  panimages_up : string[] = [];
  corpimages_up : string[] = [];
  aadharimages_up : string[] = [];
  chequeimages_up : string[] = [];

  constructor(private fb: FormBuilder, private location: Location, private _bankdetailService: BankdetailService, public dialog: MatDialog, private http: HttpClient, private router: Router) {
    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
      color: 'primary',
      fontSize: [16, Validators.min(10)]
    });
  }
  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
  ngOnInit() {
    this.isSpinnerVisible = true;
    this.bankdetailform = this.fb.group({

      org_type: [null, Validators.compose([Validators.required])],
      org_country: [null, Validators.compose([Validators.required])],
      org_address: [null, Validators.compose([Validators.required,Validators.minLength(5),this.noWhitespaceValidator])],
      org_city: [null, Validators.compose([Validators.required,Validators.minLength(3),this.noWhitespaceValidator,Validators.pattern("^[a-zA-Z ]+")])],
      org_state: [null, Validators.compose([Validators.required,Validators.minLength(3),this.noWhitespaceValidator,Validators.pattern("^[a-zA-Z ]+")])],
      org_postelcode: [null, Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(12),this.noWhitespaceValidator, Validators.pattern("^[a-zA-Z0-9- ]*$")])],
      acc_holder_name: [null, Validators.compose([Validators.required,Validators.minLength(3),this.noWhitespaceValidator,Validators.pattern("^[a-zA-Z0-9-./& ]+")])],
      bank_name: [null, Validators.compose([Validators.required,Validators.minLength(3),this.noWhitespaceValidator,Validators.pattern("^[a-zA-Z ]+")])],
      account_number: [null, Validators.compose([Validators.required,Validators.minLength(5),Validators.maxLength(34),this.noWhitespaceValidator,Validators.pattern("^[a-zA-Z0-9]*$")])],
      // bank_ifsc: [null, Validators.compose([Validators.required,Validators.minLength(11),this.noWhitespaceValidator,Validators.pattern("^[a-zA-Z]{4}0[a-zA-Z0-9]{6}$")])],
      bank_swift_code: [null, Validators.compose([Validators.required,Validators.minLength(8),Validators.pattern("^[a-zA-Z0-9]*$")])],
      bank_address: [null, Validators.compose([Validators.required,Validators.minLength(5),this.noWhitespaceValidator])],
      bank_city: [null, Validators.compose([Validators.required,Validators.minLength(3),this.noWhitespaceValidator,Validators.pattern("^[a-zA-Z ]+")])],
      bank_state: [null, Validators.compose([Validators.required,Validators.minLength(3),this.noWhitespaceValidator,Validators.pattern("^[a-zA-Z ]+")])],
      bank_postalcode: [null, Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(12),this.noWhitespaceValidator, Validators.pattern("^[a-zA-Z0-9- ]*$")])],
      bank_acctype: [null, Validators.compose([Validators.required])],
      GST: [null, Validators.compose([Validators.required,Validators.minLength(1)])],
      GST_address: [null, Validators.compose([Validators.required,Validators.minLength(5),this.noWhitespaceValidator])],
      GST_city: [null, Validators.compose([Validators.required,Validators.minLength(3),this.noWhitespaceValidator,Validators.pattern("^[a-zA-Z ]+")])],
      GST_state: [null, Validators.compose([Validators.required,Validators.minLength(3),this.noWhitespaceValidator,Validators.pattern("^[a-zA-Z ]+")])],
      GST_postalcode: [null, Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(12),this.noWhitespaceValidator, Validators.pattern("^[a-zA-Z0-9- ]*$")])],
      GST_num: [null, Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(15),this.noWhitespaceValidator, Validators.pattern("^[a-zA-Z0-9]+")])],
      PAN_num: [null, Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(10),this.noWhitespaceValidator, Validators.pattern("[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}")])],
      GST_file: ['', Validators.compose([Validators.required])],
      pan_file: [null, Validators.compose([Validators.required])],
      incorp_file: [null, Validators.compose([Validators.required])],
      aadhaar_file: [null, Validators.compose([Validators.required])],
      cancelcheck_file: [null, Validators.compose([Validators.required])],
    });
    //country api code
    this._bankdetailService.getCountry().subscribe((response) => {
      if (response['status_code'] == '200') {
        this.countrydata = response['country'];
      }
    });
    this._bankdetailService.getState().subscribe((response) => {
      if (response['status_code'] == '200') {
        this.statedata = response['state']; 
      }
    }); 
    this._bankdetailService.getbankDetail().subscribe((response) => {
      if (response['status_code'] == '200') {
        this.bankdataresult = true;
        this.pub_company_type = response['resultdata'][0]['company_type'];
        this.pub_country = response['resultdata'][0]['country'].trim();
        this.pub_pan_card_file = response['resultdata'][0]['pan_card_file'];
        this.pub_incorp_certificate_fille = response['resultdata'][0]['incorp_certificate_fille'];
        this.pub_aadhaar_card_file = response['resultdata'][0]['aadhaar_card_file'];
        this.pub_cancel_check_file = response['resultdata'][0]['cancel_check_file'];
        if (this.pub_country == 99) {
          
          this.countryInd = true;
          this.countryOther = false;
          this.countrySingapore = false;
          this.gstregistredouter = true;
          
          if(this.pub_company_type == 'individual'){
            this.incorpshowhide = false;
            this.aadharshowhide = true;
            
            this.bankdetailform.get('incorp_file').clearValidators();
            this.bankdetailform.get('incorp_file').updateValueAndValidity();

            if(this.pub_aadhaar_card_file=='' || this.pub_aadhaar_card_file==null){
              this.bankdetailform.controls['aadhaar_file'].markAsTouched();
              this.bankdetailform.get('aadhaar_file').setValidators([Validators.required]);
              this.bankdetailform.get('aadhaar_file').updateValueAndValidity();
            }else{
              this.bankdetailform.get('aadhaar_file').clearValidators();
              this.bankdetailform.get('aadhaar_file').updateValueAndValidity();
            }

          }else{
            this.incorpshowhide = true;
            this.aadharshowhide = false;
            
            this.bankdetailform.get('aadhaar_file').clearValidators();
            this.bankdetailform.get('aadhaar_file').updateValueAndValidity();


            if(this.pub_incorp_certificate_fille=='' || this.pub_incorp_certificate_fille==null){
              this.bankdetailform.controls['incorp_file'].markAsTouched();
              this.bankdetailform.get('incorp_file').setValidators([Validators.required]);
              this.bankdetailform.get('incorp_file').updateValueAndValidity();
            }else{
              this.bankdetailform.get('incorp_file').clearValidators();
              this.bankdetailform.get('incorp_file').updateValueAndValidity();
            }


          }


          if(this.pub_pan_card_file=='' || this.pub_pan_card_file==null){
            this.bankdetailform.controls['pan_file'].markAsTouched();
            this.bankdetailform.get('pan_file').setValidators([Validators.required]);
            this.bankdetailform.get('pan_file').updateValueAndValidity();
          }else{
            this.bankdetailform.get('pan_file').clearValidators();
            this.bankdetailform.get('pan_file').updateValueAndValidity();
          }
          
          
          if(this.pub_cancel_check_file=='' || this.pub_cancel_check_file==null){
            this.bankdetailform.controls['cancelcheck_file'].markAsTouched();
            this.bankdetailform.get('cancelcheck_file').setValidators([Validators.required]);
            this.bankdetailform.get('cancelcheck_file').updateValueAndValidity();
          }else{
            this.bankdetailform.get('cancelcheck_file').clearValidators();
            this.bankdetailform.get('cancelcheck_file').updateValueAndValidity();
          }



        } else if (this.pub_country == 192) {
          this.countrySingapore = true;
          this.countryInd = false;
          this.countryOther = false;
          this.gstregistredouter = true;
          this.aadharshowhide = false;
          this.incorpshowhide = false;
          this.bankdetailform.get('PAN_num').clearValidators();
          this.bankdetailform.get('PAN_num').updateValueAndValidity();
          this.bankdetailform.get('pan_file').clearValidators();
          this.bankdetailform.get('pan_file').updateValueAndValidity();
          this.bankdetailform.get('incorp_file').clearValidators();
          this.bankdetailform.get('incorp_file').updateValueAndValidity();
          this.bankdetailform.get('aadhaar_file').clearValidators();
          this.bankdetailform.get('aadhaar_file').updateValueAndValidity();
          this.bankdetailform.get('cancelcheck_file').clearValidators();
          this.bankdetailform.get('cancelcheck_file').updateValueAndValidity();
        } else {
          this.countryOther = true;
          this.countryInd = false;
          this.countrySingapore = false;
          this.gstregistredouter = false;
          this.aadharshowhide = false;
          this.incorpshowhide = false;
          this.bankdetailform.get('PAN_num').clearValidators();
          this.bankdetailform.get('PAN_num').updateValueAndValidity();
          this.bankdetailform.get('pan_file').clearValidators();
          this.bankdetailform.get('pan_file').updateValueAndValidity();
          this.bankdetailform.get('incorp_file').clearValidators();
          this.bankdetailform.get('incorp_file').updateValueAndValidity();
          this.bankdetailform.get('aadhaar_file').clearValidators();
          this.bankdetailform.get('aadhaar_file').updateValueAndValidity();
          this.bankdetailform.get('cancelcheck_file').clearValidators();
          this.bankdetailform.get('cancelcheck_file').updateValueAndValidity();
        }
        this.pub_country_code_id = response['resultdata'][0]['country_code_id'];
        this.pub_acc_holder_address = response['resultdata'][0]['acc_holder_address'];
        this.pub_city = response['resultdata'][0]['city'];
        this.pub_state = response['resultdata'][0]['state'];
        this.pub_postal_code = response['resultdata'][0]['postal_code'];
        this.pub_acc_holder_name = response['resultdata'][0]['acc_holder_name'];
        this.pub_bank_name = response['resultdata'][0]['bank_name'];
        this.pub_acc_number = response['resultdata'][0]['acc_number'];
        // this.pub_bank_ifsc = response['resultdata'][0]['bank_ifsc'];
        this.pub_swift_code = response['resultdata'][0]['swift_code'];
        this.pub_bank_address = response['resultdata'][0]['bank_address'];
        this.pub_bank_city = response['resultdata'][0]['bank_city'];
        this.pub_bank_state = response['resultdata'][0]['bank_state'];
        this.pub_bank_postal = response['resultdata'][0]['bank_postal'];

        this.pub_bank_acc_type = response['resultdata'][0]['bank_acc_type'];
        this.pub_pan_number = response['resultdata'][0]['pan_number'];
        this.pub_gst_address = response['resultdata'][0]['gst_address'];
        this.pub_gst_city = response['resultdata'][0]['gst_city'];
        this.pub_gst_state = response['resultdata'][0]['gst_state'];
        this.pub_gst_postal = response['resultdata'][0]['gst_postal'];
        this.pub_gst_num = response['resultdata'][0]['gst_num'];
        this.pub_gst_certificate = response['resultdata'][0]['gst_certificate'];
        
        
        this.pub_bank_id = response['resultdata'][0]['bank_id'];
        this.pub_itr_copy = response['resultdata'][0]['itr_copy'];
        this.pub_region_type = response['resultdata'][0]['region_type'];
        this.pub_service_tax = response['resultdata'][0]['service_tax'];
        this.pub_service_tax_num = response['resultdata'][0]['service_tax_num'];
        this.pub_status_bank = response['resultdata'][0]['status_bank'];

        this.gst_extn = response['resultdata'][0]['gst_extn'].toLowerCase();
        this.pan_extn = response['resultdata'][0]['pan_extn'].toLowerCase();
        this.aadhar_extn = response['resultdata'][0]['aadhar_extn'].toLowerCase();
        this.incorp_extn = response['resultdata'][0]['incorp_extn'].toLowerCase();
        this.cheque_extn = response['resultdata'][0]['cheque_extn'].toLowerCase();

        if(this.pub_swift_code=='' || this.pub_swift_code==null){
          this.bankdetailform.controls['bank_swift_code'].markAsTouched();
        }

        if (this.pub_gst_num != '' && this.pub_gst_num != null) {
          this.gstregistred = 1;
          this.gstregistredinner = true;
        } else {
          this.gstregistred = 0;
          this.gstregistredinner = false;
        }
        if (this.gstregistred == 1) {
          this.bankdetailform.get('GST_address').setValidators([Validators.required,Validators.minLength(5),this.noWhitespaceValidator]);
          this.bankdetailform.get('GST_address').updateValueAndValidity();
          this.bankdetailform.get('GST_city').setValidators([Validators.required,Validators.minLength(3),this.noWhitespaceValidator,Validators.pattern("^[a-zA-Z ]+")]);
          this.bankdetailform.get('GST_city').updateValueAndValidity();
          this.bankdetailform.get('GST_state').setValidators([Validators.required,Validators.minLength(3),this.noWhitespaceValidator,Validators.pattern("^[a-zA-Z ]+")]);
          this.bankdetailform.get('GST_state').updateValueAndValidity();
          this.bankdetailform.get('GST_postalcode').setValidators([Validators.required,Validators.minLength(3),Validators.maxLength(12),this.noWhitespaceValidator, Validators.pattern("^[a-zA-Z0-9- ]*$")]);
          this.bankdetailform.get('GST_postalcode').updateValueAndValidity();
          this.bankdetailform.get('GST_num').setValidators([Validators.required,Validators.minLength(10),Validators.maxLength(15),this.noWhitespaceValidator, Validators.pattern("^[a-zA-Z0-9]+")]);
          this.bankdetailform.get('GST_num').updateValueAndValidity();
          this.bankdetailform.get('GST_file').setValidators([Validators.required]);
          this.bankdetailform.get('GST_file').updateValueAndValidity();
          
          if(this.pub_gst_certificate=='' || this.pub_gst_certificate==null){
            this.bankdetailform.controls['GST_file'].markAsTouched();
            this.bankdetailform.get('GST_file').setValidators([Validators.required]);
            this.bankdetailform.get('GST_file').updateValueAndValidity();
          }else{
            this.bankdetailform.get('GST_file').clearValidators();
            this.bankdetailform.get('GST_file').updateValueAndValidity();
          }
        }else{
          this.bankdetailform.get('GST_address').clearValidators();
          this.bankdetailform.get('GST_address').updateValueAndValidity();
          this.bankdetailform.get('GST_city').clearValidators();
          this.bankdetailform.get('GST_city').updateValueAndValidity();
          this.bankdetailform.get('GST_state').clearValidators();
          this.bankdetailform.get('GST_state').updateValueAndValidity();
          this.bankdetailform.get('GST_postalcode').clearValidators();
          this.bankdetailform.get('GST_postalcode').updateValueAndValidity();
          this.bankdetailform.get('GST_num').clearValidators();
          this.bankdetailform.get('GST_num').updateValueAndValidity();
          this.bankdetailform.get('GST_file').clearValidators();
          this.bankdetailform.get('GST_file').updateValueAndValidity();
        }

        

      } else {
        this.bankdataresult = false;
      }

      this.isSpinnerVisible = false;
    });



  }

  getFontSize() {
    return Math.max(10, this.options.value.fontSize);
  }

  backPage() {
    this.location.back();
  }
  onaadharChange(event: any) {
    const org_type = event.value;
    if (org_type == 'individual') {
      this.aadharshowhide = true;
      this.incorpshowhide = false;
      if (this.pub_aadhaar_card_file == '' || this.pub_aadhaar_card_file == null) {
        this.bankdetailform.get('aadhaar_file').setValidators([Validators.required]);
        this.bankdetailform.get('aadhaar_file').updateValueAndValidity();
      } else {
        this.bankdetailform.get('aadhaar_file').clearValidators();
        this.bankdetailform.get('aadhaar_file').updateValueAndValidity();
      }
      this.bankdetailform.get('incorp_file').clearValidators();
      this.bankdetailform.get('incorp_file').updateValueAndValidity();
    } else {
      this.aadharshowhide = false;
      this.incorpshowhide = true;
      this.bankdetailform.get('aadhaar_file').clearValidators();
      this.bankdetailform.get('aadhaar_file').updateValueAndValidity();
      if (this.pub_incorp_certificate_fille == '' || this.pub_incorp_certificate_fille == null) {
        this.bankdetailform.get('incorp_file').setValidators([Validators.required]);
        this.bankdetailform.get('incorp_file').updateValueAndValidity();
      } else {
        this.bankdetailform.get('incorp_file').clearValidators();
        this.bankdetailform.get('incorp_file').updateValueAndValidity();
      }
    }
  }
  onPercentChange(event: any) {
    // alert("hello");
    const org_comapny_typeCHk = this.bankdetailform.value.org_type;
    const GST_typeCHk = this.bankdetailform.value.GST;
    const org_country = event.value;
    if (org_country == 99) {
      /** for india conditions */
      this.countryInd = true;
      this.countryOther = false;
      this.countrySingapore = false;
      this.gstregistredouter = true;

      if (org_comapny_typeCHk == 'individual') {
        this.aadharshowhide = true;
        this.incorpshowhide = false;

        this.bankdetailform.get('incorp_file').clearValidators();
        this.bankdetailform.get('incorp_file').updateValueAndValidity();
        if (this.pub_aadhaar_card_file == '' || this.pub_aadhaar_card_file == null) {
          this.bankdetailform.get('aadhaar_file').setValidators([Validators.required]);
          this.bankdetailform.get('aadhaar_file').updateValueAndValidity();
        } else {
          this.bankdetailform.get('aadhaar_file').clearValidators();
          this.bankdetailform.get('aadhaar_file').updateValueAndValidity();
        }

      } else {
        this.aadharshowhide = false;
        this.incorpshowhide = true;
        if (this.pub_incorp_certificate_fille == '' || this.pub_incorp_certificate_fille == null) {
          this.bankdetailform.get('incorp_file').setValidators([Validators.required]);
          this.bankdetailform.get('incorp_file').updateValueAndValidity();
        } else {
          this.bankdetailform.get('incorp_file').clearValidators();
          this.bankdetailform.get('incorp_file').updateValueAndValidity();
        }
        this.bankdetailform.get('aadhaar_file').clearValidators();
        this.bankdetailform.get('aadhaar_file').updateValueAndValidity();
      }
      this.bankdetailform.get('PAN_num').setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(10), this.noWhitespaceValidator, Validators.pattern("[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}")]);
      this.bankdetailform.get('PAN_num').updateValueAndValidity();
      if (this.pub_pan_card_file == '' || this.pub_pan_card_file == null) {
        this.bankdetailform.get('pan_file').setValidators([Validators.required]);
        this.bankdetailform.get('pan_file').updateValueAndValidity();
      } else {
        this.bankdetailform.get('pan_file').clearValidators();
        this.bankdetailform.get('pan_file').updateValueAndValidity();
      }

      if (this.pub_cancel_check_file == '' || this.pub_cancel_check_file == null) {
        this.bankdetailform.get('cancelcheck_file').setValidators([Validators.required]);
        this.bankdetailform.get('cancelcheck_file').updateValueAndValidity();
      } else {
        this.bankdetailform.get('cancelcheck_file').clearValidators();
        this.bankdetailform.get('cancelcheck_file').updateValueAndValidity();
      }

      if (GST_typeCHk == 1) {
        this.bankdetailform.get('GST').setValidators([Validators.required, Validators.minLength(1)]);
        this.bankdetailform.get('GST').updateValueAndValidity();
        this.bankdetailform.get('GST_address').setValidators([Validators.required, Validators.minLength(5), this.noWhitespaceValidator]);
        this.bankdetailform.get('GST_address').updateValueAndValidity();
        this.bankdetailform.get('GST_city').setValidators([Validators.required, Validators.minLength(3), this.noWhitespaceValidator, Validators.pattern("^[a-zA-Z ]+")]);
        this.bankdetailform.get('GST_city').updateValueAndValidity();
        this.bankdetailform.get('GST_state').setValidators([Validators.required, Validators.minLength(3), this.noWhitespaceValidator, Validators.pattern("^[a-zA-Z ]+")]);
        this.bankdetailform.get('GST_state').updateValueAndValidity();
        this.bankdetailform.get('GST_postalcode').setValidators([Validators.required, Validators.minLength(3), Validators.maxLength(12), this.noWhitespaceValidator, Validators.pattern("^[a-zA-Z0-9- ]*$")]);
        this.bankdetailform.get('GST_postalcode').updateValueAndValidity();
        this.bankdetailform.get('GST_num').setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(15), this.noWhitespaceValidator, Validators.pattern("^[a-zA-Z0-9]+")]);
        this.bankdetailform.get('GST_num').updateValueAndValidity();
        if (this.pub_gst_certificate == '' || this.pub_gst_certificate == null) {
          this.bankdetailform.get('GST_file').setValidators([Validators.required]);
          this.bankdetailform.get('GST_file').updateValueAndValidity();
        } else {
          this.bankdetailform.get('GST_file').clearValidators();
          this.bankdetailform.get('GST_file').updateValueAndValidity();
        }
      } else {
        this.bankdetailform.get('GST').clearValidators();
        this.bankdetailform.get('GST').updateValueAndValidity();
        this.bankdetailform.get('GST_address').clearValidators();
        this.bankdetailform.get('GST_address').updateValueAndValidity();
        this.bankdetailform.get('GST_city').clearValidators();
        this.bankdetailform.get('GST_city').updateValueAndValidity();
        this.bankdetailform.get('GST_state').clearValidators();
        this.bankdetailform.get('GST_state').updateValueAndValidity();
        this.bankdetailform.get('GST_postalcode').clearValidators();
        this.bankdetailform.get('GST_postalcode').updateValueAndValidity();
        this.bankdetailform.get('GST_num').clearValidators();
        this.bankdetailform.get('GST_num').updateValueAndValidity();
        this.bankdetailform.get('GST_file').clearValidators();
        this.bankdetailform.get('GST_file').updateValueAndValidity();
      }


    } else if (org_country == 192) {
      /** for singapore conditions */
      this.countrySingapore = true;
      this.countryInd = false;
      this.countryOther = false;
      this.gstregistredouter = true;
      this.aadharshowhide = false;
      this.incorpshowhide = false;

      this.bankdetailform.get('PAN_num').clearValidators();
      this.bankdetailform.get('PAN_num').updateValueAndValidity();
      this.bankdetailform.get('pan_file').clearValidators();
      this.bankdetailform.get('pan_file').updateValueAndValidity();
      this.bankdetailform.get('aadhaar_file').clearValidators();
      this.bankdetailform.get('aadhaar_file').updateValueAndValidity();
      this.bankdetailform.get('cancelcheck_file').clearValidators();
      this.bankdetailform.get('cancelcheck_file').updateValueAndValidity();
      this.bankdetailform.get('incorp_file').clearValidators();
      this.bankdetailform.get('incorp_file').updateValueAndValidity();
      if (GST_typeCHk == 1) {
        this.bankdetailform.get('GST').setValidators([Validators.required, Validators.minLength(1)]);
        this.bankdetailform.get('GST').updateValueAndValidity();
        this.bankdetailform.get('GST_address').setValidators([Validators.required, Validators.minLength(5), this.noWhitespaceValidator]);
        this.bankdetailform.get('GST_address').updateValueAndValidity();
        this.bankdetailform.get('GST_city').setValidators([Validators.required, Validators.minLength(3), this.noWhitespaceValidator, Validators.pattern("^[a-zA-Z ]+")]);
        this.bankdetailform.get('GST_city').updateValueAndValidity();
        this.bankdetailform.get('GST_state').setValidators([Validators.required, Validators.minLength(3), this.noWhitespaceValidator, Validators.pattern("^[a-zA-Z ]+")]);
        this.bankdetailform.get('GST_state').updateValueAndValidity();
        this.bankdetailform.get('GST_postalcode').setValidators([Validators.required, Validators.minLength(3), Validators.maxLength(12), this.noWhitespaceValidator, Validators.pattern("^[a-zA-Z0-9- ]*$")]);
        this.bankdetailform.get('GST_postalcode').updateValueAndValidity();
        this.bankdetailform.get('GST_num').setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(15), this.noWhitespaceValidator, Validators.pattern("^[a-zA-Z0-9]+")]);
        this.bankdetailform.get('GST_num').updateValueAndValidity();
        if (this.pub_gst_certificate == '' || this.pub_gst_certificate == null) {
          this.bankdetailform.get('GST_file').setValidators([Validators.required]);
          this.bankdetailform.get('GST_file').updateValueAndValidity();
        } else {
          this.bankdetailform.get('GST_file').clearValidators();
          this.bankdetailform.get('GST_file').updateValueAndValidity();
        }
      } else {
        this.bankdetailform.get('GST').clearValidators();
        this.bankdetailform.get('GST').updateValueAndValidity();
        this.bankdetailform.get('GST_address').clearValidators();
        this.bankdetailform.get('GST_address').updateValueAndValidity();
        this.bankdetailform.get('GST_city').clearValidators();
        this.bankdetailform.get('GST_city').updateValueAndValidity();
        this.bankdetailform.get('GST_state').clearValidators();
        this.bankdetailform.get('GST_state').updateValueAndValidity();
        this.bankdetailform.get('GST_postalcode').clearValidators();
        this.bankdetailform.get('GST_postalcode').updateValueAndValidity();
        this.bankdetailform.get('GST_num').clearValidators();
        this.bankdetailform.get('GST_num').updateValueAndValidity();
        this.bankdetailform.get('GST_file').clearValidators();
        this.bankdetailform.get('GST_file').updateValueAndValidity();
      }
    } else {
      /** for other conditions */
      this.countryOther = true;
      this.countryInd = false;
      this.countrySingapore = false;
      this.gstregistredouter = false;
      this.aadharshowhide = false;
      this.incorpshowhide = false;

      this.bankdetailform.get('GST').clearValidators();
      this.bankdetailform.get('GST').updateValueAndValidity();
      this.bankdetailform.get('GST_address').clearValidators();
      this.bankdetailform.get('GST_address').updateValueAndValidity();
      this.bankdetailform.get('GST_city').clearValidators();
      this.bankdetailform.get('GST_city').updateValueAndValidity();
      this.bankdetailform.get('GST_state').clearValidators();
      this.bankdetailform.get('GST_state').updateValueAndValidity();
      this.bankdetailform.get('GST_postalcode').clearValidators();
      this.bankdetailform.get('GST_postalcode').updateValueAndValidity();
      this.bankdetailform.get('GST_num').clearValidators();
      this.bankdetailform.get('GST_num').updateValueAndValidity();
      this.bankdetailform.get('GST_file').clearValidators();
      this.bankdetailform.get('GST_file').updateValueAndValidity();
      this.bankdetailform.get('PAN_num').clearValidators();
      this.bankdetailform.get('PAN_num').updateValueAndValidity();
      this.bankdetailform.get('pan_file').clearValidators();
      this.bankdetailform.get('pan_file').updateValueAndValidity();
      this.bankdetailform.get('aadhaar_file').clearValidators();
      this.bankdetailform.get('aadhaar_file').updateValueAndValidity();
      this.bankdetailform.get('cancelcheck_file').clearValidators();
      this.bankdetailform.get('cancelcheck_file').updateValueAndValidity();
      this.bankdetailform.get('incorp_file').clearValidators();
      this.bankdetailform.get('incorp_file').updateValueAndValidity();
    }

  }
  onRadioChange(event:any) {
    const valueGST = event.value;

    if (valueGST == 1) {
      this.gstregistredinner = true;
      this.bankdetailform.get('GST_address').setValidators([Validators.required,Validators.minLength(5),this.noWhitespaceValidator]);
      this.bankdetailform.get('GST_address').updateValueAndValidity();
      this.bankdetailform.get('GST_city').setValidators([Validators.required,Validators.minLength(3),this.noWhitespaceValidator,Validators.pattern("^[a-zA-Z ]+")]);
      this.bankdetailform.get('GST_city').updateValueAndValidity();
      this.bankdetailform.get('GST_state').setValidators([Validators.required,Validators.minLength(3),this.noWhitespaceValidator,Validators.pattern("^[a-zA-Z ]+")]);
      this.bankdetailform.get('GST_state').updateValueAndValidity();
      this.bankdetailform.get('GST_postalcode').setValidators([Validators.required,Validators.minLength(3),Validators.maxLength(12),this.noWhitespaceValidator, Validators.pattern("^[a-zA-Z0-9- ]*$")]);
      this.bankdetailform.get('GST_postalcode').updateValueAndValidity();
      this.bankdetailform.get('GST_num').setValidators([Validators.required,Validators.minLength(10),Validators.maxLength(15),this.noWhitespaceValidator, Validators.pattern("^[a-zA-Z0-9]+")]);
      this.bankdetailform.get('GST_num').updateValueAndValidity();
      this.bankdetailform.get('GST_file').setValidators([Validators.required]);
      this.bankdetailform.get('GST_file').updateValueAndValidity();
    } else {
      this.gstregistredinner = false;
      this.bankdetailform.get('GST_address').clearValidators();
      this.bankdetailform.get('GST_address').updateValueAndValidity();
      this.bankdetailform.get('GST_city').clearValidators();
      this.bankdetailform.get('GST_city').updateValueAndValidity();
      this.bankdetailform.get('GST_state').clearValidators();
      this.bankdetailform.get('GST_state').updateValueAndValidity();
      this.bankdetailform.get('GST_postalcode').clearValidators();
      this.bankdetailform.get('GST_postalcode').updateValueAndValidity();
      this.bankdetailform.get('GST_num').clearValidators();
      this.bankdetailform.get('GST_num').updateValueAndValidity();
      this.bankdetailform.get('GST_file').clearValidators();
      this.bankdetailform.get('GST_file').updateValueAndValidity();
    }
  }

  bankSubmit() {
    
    let currentUrl = this.router.url;
    if (this.bankdetailform.invalid) {
      console.log("invalid");
      console.log(this.bankdetailform);
     
      return;
    }
    if (this.bankdetailform.valid) {
      this.isSpinnerVisible = true;
      const fData: any = new FormData;

      const valueorg_country = this.bankdetailform.value.org_country;

      fData.append("uniq_id", localStorage.getItem('uniq_id'));
      fData.append("org_type", this.bankdetailform.value.org_type);
      fData.append("org_country", this.bankdetailform.value.org_country);
      fData.append("org_address", this.bankdetailform.value.org_address);
      fData.append("org_city", this.bankdetailform.value.org_city);
      fData.append("org_state", this.bankdetailform.value.org_state);
      fData.append("org_postelcode", this.bankdetailform.value.org_postelcode);
      fData.append("acc_holder_name", this.bankdetailform.value.acc_holder_name);
      fData.append("bank_name", this.bankdetailform.value.bank_name);
      fData.append("account_number", this.bankdetailform.value.account_number);
      // fData.append("bank_ifsc", this.bankdetailform.value.bank_ifsc);
      fData.append("bank_address", this.bankdetailform.value.bank_address);
      fData.append("bank_city", this.bankdetailform.value.bank_city);
      fData.append("bank_state", this.bankdetailform.value.bank_state);
      fData.append("bank_postalcode", this.bankdetailform.value.bank_postalcode);
      fData.append("bank_acctype", this.bankdetailform.value.bank_acctype);
      fData.append("PAN_num", this.bankdetailform.value.PAN_num);
      if (valueorg_country == 99 || valueorg_country == 192) {
        const valueGST = this.bankdetailform.value.GST;
        if (valueGST == 1) {
          fData.append("GST", this.bankdetailform.value.GST);
          fData.append("GST_address", this.bankdetailform.value.GST_address);
          fData.append("GST_city", this.bankdetailform.value.GST_city);
          fData.append("GST_state", this.bankdetailform.value.GST_state);
          fData.append("GST_postalcode", this.bankdetailform.value.GST_postalcode);
          // fData.append("GST_file", this.bankdetailform.value.GST_file);
          fData.append("GST_file", this.gstimages_up);
          fData.append("GST_num", this.bankdetailform.value.GST_num);
          fData.append("GST_status", "yes");
        } else {
          fData.append("GST", this.bankdetailform.value.GST);
          fData.append("GST_status", "no");
        }
      }

      if (valueorg_country == 99) {
        // fData.append("bank_ifsc", this.bankdetailform.value.bank_ifsc);
        // fData.append("pan_file", this.bankdetailform.value.pan_file);
        fData.append("pan_file", this.panimages_up);
        
        fData.append("cancelcheck_file", this.chequeimages_up);
        if(this.bankdetailform.value.org_type=='individual'){
          fData.append("aadhaar_file", this.aadharimages_up);
        }
        if(this.bankdetailform.value.org_type=='company' || this.bankdetailform.value.org_type=='firm'){
          fData.append("incorp_file", this.corpimages_up);
        }
      } else if (valueorg_country == 192) {
        // fData.append("bank_swift_code", this.bankdetailform.value.bank_swift_code);
      } else {
        // fData.append("bank_swift_code", this.bankdetailform.value.bank_swift_code);
        fData.append("GST_status", "no");
      }

      fData.append("bank_swift_code", this.bankdetailform.value.bank_swift_code);
      
      var t = localStorage.getItem('access_token');
      var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
      const httpOptions = {
        headers: headers_object
      };
      this.http.post(AppSettings.API_STARTPOINT+'/assets/api/admin/user/bank/create_bankdetail.php', fData, httpOptions).subscribe(data => {
        if (data['status_code'] == '200') {
          this.isSpinnerVisible = false;
          this.message = data['message'];
          this.dialog.open(DialogDynamicComponent,
            {
              width: '450px',
              data: { message: this.message }
            });
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([currentUrl]);
          });
        } else {
          this.message = data['message'];
          this.dialog.open(DialogDynamicComponent,
            {
              width: '450px',
              data: { message: this.message }
            });
        }
      })

    }
  }

  openDialog(filename): void {
    const abcd = filename;
    const path = AppSettings.API_STARTPOINT+"/assets/api/admin/uploads/";
    
    if(filename==='gstfile'){
      this.pubfilenameset = this.pub_gst_certificate;
      this.pubfiletitleset = "GST certificate";
      this.file_extenstion = this.gst_extn;
    }
    if(filename==='pancard'){
      this.pubfilenameset = this.pub_pan_card_file;
      this.pubfiletitleset = "PAN certificate";
      this.file_extenstion = this.pan_extn;
    }
    if(filename==='incorp'){
      this.pubfilenameset = this.pub_incorp_certificate_fille;
      this.pubfiletitleset = "Incorporation certificate";
      this.file_extenstion = this.incorp_extn;
    }
    if(filename==='aadhar'){
      this.pubfilenameset = this.pub_aadhaar_card_file;
      this.pubfiletitleset = "Aadhar certificate";
      this.file_extenstion = this.aadhar_extn;
    }
    if(filename==='cheque'){
      this.pubfilenameset = this.pub_cancel_check_file;
      this.pubfiletitleset = "Cancelled Cheque";
      this.file_extenstion = this.cheque_extn;
    }
    
    const dialogRef = this.dialog.open(DialogOverviewExampleBankDetailsComponent, {
      width: '900px',
      data: { message: this.pubfiletitleset, message1: path+this.pubfilenameset,message2:this.file_extenstion }
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }






  onFileChange_pan(event:any) {
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();
                reader.onload = (event:any) => {
                  // Push Base64 string
                  this.panimages_up.push(event.target.result); 
                  // this.patchValues();
                }
                reader.readAsDataURL(event.target.files[i]);
        }
    }
  }
  onFileChange_corp(event:any) {
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();
                reader.onload = (event:any) => {
                  // Push Base64 string
                  this.corpimages_up.push(event.target.result); 
                  // this.patchValues();
                }
                reader.readAsDataURL(event.target.files[i]);
        }
    }
  }
  onFileChange_aadhar(event:any) {
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();
                reader.onload = (event:any) => {
                  // Push Base64 string
                  this.aadharimages_up.push(event.target.result); 
                  // this.patchValues();
                }
                reader.readAsDataURL(event.target.files[i]);
        }
    }
  }
  onFileChange_cheque(event:any) {
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();
                reader.onload = (event:any) => {
                  // Push Base64 string
                  this.chequeimages_up.push(event.target.result); 
                  // this.patchValues();
                }
                reader.readAsDataURL(event.target.files[i]);
        }
    }
  }
  onFileChange_gst(event:any) {
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();
                reader.onload = (event:any) => {
                  // Push Base64 string
                  this.gstimages_up.push(event.target.result); 
                  // this.patchValues();
                }
                reader.readAsDataURL(event.target.files[i]);
        }
    }
  }
  // patchValues(){
  //   this.bankdetailform.patchValue({
  //      incorp_file_up: this.panimages
  //   });
  // }
  updateBankForm(){
    let currentUrl = this.router.url;
    console.log("update click");
    if (this.bankdetailform.invalid) {
      console.log("invalid update from");
      console.log(this.bankdetailform);
      return;
    }else{
      this.isSpinnerVisible = true;
      const fData: any = new FormData;
      const valueorg_country = this.bankdetailform.value.org_country;
      fData.append("uniq_id", localStorage.getItem('uniq_id'));
      fData.append("org_type", this.bankdetailform.value.org_type);
      fData.append("org_country", this.bankdetailform.value.org_country);
      fData.append("org_address", this.bankdetailform.value.org_address);
      fData.append("org_city", this.bankdetailform.value.org_city);
      fData.append("org_state", this.bankdetailform.value.org_state);
      fData.append("org_postelcode", this.bankdetailform.value.org_postelcode);
      fData.append("acc_holder_name", this.bankdetailform.value.acc_holder_name);
      fData.append("bank_name", this.bankdetailform.value.bank_name);
      fData.append("account_number", this.bankdetailform.value.account_number);
      fData.append("bank_address", this.bankdetailform.value.bank_address);
      fData.append("bank_city", this.bankdetailform.value.bank_city);
      fData.append("bank_state", this.bankdetailform.value.bank_state);
      fData.append("bank_postalcode", this.bankdetailform.value.bank_postalcode);
      fData.append("bank_acctype", this.bankdetailform.value.bank_acctype);
      fData.append("PAN_num", this.bankdetailform.value.PAN_num);
      fData.append("bank_swift_code", this.bankdetailform.value.bank_swift_code);
      if (valueorg_country == 99 || valueorg_country == 192) {
        const valueGST = this.bankdetailform.value.GST;
        if (valueGST == 1) {
          fData.append("GST", this.bankdetailform.value.GST);
          fData.append("GST_address", this.bankdetailform.value.GST_address);
          fData.append("GST_city", this.bankdetailform.value.GST_city);
          fData.append("GST_state", this.bankdetailform.value.GST_state);
          fData.append("GST_postalcode", this.bankdetailform.value.GST_postalcode);
          fData.append("GST_file", this.gstimages_up);
          fData.append("GST_num", this.bankdetailform.value.GST_num);
          fData.append("GST_status", "yes");
        } else {
          fData.append("GST", this.bankdetailform.value.GST);
          fData.append("GST_status", "no");
        }
      }

      if (valueorg_country == 99) {
        fData.append("pan_file", this.panimages_up);
        fData.append("aadhaar_file", this.aadharimages_up);
        fData.append("cancelcheck_file", this.chequeimages_up);
      } else if (valueorg_country == 192) {
        // fData.append("bank_swift_code", this.bankdetailform.value.bank_swift_code);
      } else {
        fData.append("GST_status", "no");
      }
      fData.append("incorp_file", this.corpimages_up);
      var t = localStorage.getItem('access_token');
      var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
      const httpOptions = {
        headers: headers_object
      };

      this.http.post(AppSettings.API_STARTPOINT+'/assets/api/admin/user/bank/update_bankdetail.php', fData, httpOptions).subscribe(data => {
        if (data['status_code'] == '200') {
          this.isSpinnerVisible = false;
          this.message = data['message'];
          this.dialog.open(DialogDynamicComponent,
            {
              width: '450px',
              data: { message: this.message }
            });
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([currentUrl]);
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
}
