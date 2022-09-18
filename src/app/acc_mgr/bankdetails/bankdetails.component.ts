import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { BankdetailService } from './bankdetails.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDynamicAccComponent } from '../dialog-dynamic/dialog-dynamic.component';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AppSettings } from '../../global/app-url';
import { ActivatedRoute } from '@angular/router';
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
  statedata =[];
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
  public isSpinnerVisible: boolean = true;


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
  public pub_bank_ifsc;
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
  public pub_status_bank;
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
  partner_id: any;

  message: string;
  hide = true;
  gstimages_up : string[] = [];
  panimages_up : string[] = [];
  corpimages_up : string[] = [];
  aadharimages_up : string[] = [];
  chequeimages_up : string[] = [];

  constructor(private fb: FormBuilder, private location: Location, private _bankdetailService: BankdetailService, public dialog: MatDialog, private http: HttpClient, private router: Router,activatedRouter: ActivatedRoute) {
    this.partner_id = activatedRouter.snapshot.paramMap.get('id');
    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
      color: 'primary',
      fontSize: [16, Validators.min(10)]
    });
  }
  
  ngOnInit() {
    this.bankdetailform = this.fb.group({

      org_type: [null, Validators.compose([Validators.required])],
      org_country: [null, Validators.compose([Validators.required])],
      org_address: [null, Validators.compose([Validators.required])],
      org_city: [null, Validators.compose([Validators.required])],
      org_state: [null, Validators.compose([Validators.required])],
      org_postelcode: [null, Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z0-9- ]*$")])],
      acc_holder_name: [null, Validators.compose([Validators.required])],
      bank_name: [null, Validators.compose([Validators.required])],
      account_number: [null, Validators.compose([Validators.required])],
      bank_ifsc: [null, Validators.compose([Validators.required])],
      bank_swift_code: [null, Validators.compose([Validators.required])],
      bank_address: [null, Validators.compose([Validators.required])],
      bank_city: [null, Validators.compose([Validators.required])],
      bank_state: [null, Validators.compose([Validators.required])],
      bank_postalcode: [null, Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z0-9- ]*$")])],
      bank_acctype: [null, Validators.compose([Validators.required])],
      GST: [null, Validators.compose([Validators.required])],
      GST_address: [null, Validators.compose([Validators.required])],
      GST_city: [null, Validators.compose([Validators.required])],
      GST_state: [null, Validators.compose([Validators.required])],
      GST_postalcode: [null, Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z0-9- ]*$")])],
      GST_num: [null, Validators.compose([Validators.required])],
      PAN_num: [null, Validators.compose([Validators.required])],
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
    this._bankdetailService.getbankDetail(this.partner_id).subscribe((response) => {
      if (response['status_code'] == '200') {
        this.bankdataresult = true;
        this.pub_company_type = response['resultdata'][0]['company_type'];
        this.pub_country = response['resultdata'][0]['country'].trim();
        if (this.pub_country == 99) {
          this.countryInd = true;
          this.countryOther = false;
          this.countrySingapore = false;
          this.gstregistredouter = true;
          if(this.pub_company_type == 'individual'){
            this.incorpshowhide = false;
            this.aadharshowhide = true;
          }else{
            this.incorpshowhide = true;
            this.aadharshowhide = false;
            
          }
        } else if (this.pub_country == 192) {
          this.countrySingapore = true;
          this.countryInd = false;
          this.countryOther = false;
          this.gstregistredouter = true;
          this.aadharshowhide = false;
          this.incorpshowhide = false;
        } else {
          this.countryOther = true;
          this.countryInd = false;
          this.countrySingapore = false;
          this.gstregistredouter = false;
          this.aadharshowhide = false;
          this.incorpshowhide = false;
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
        this.pub_bank_postal = response['resultdata'][0]['bank_postal'].trim();

        this.pub_bank_acc_type = response['resultdata'][0]['bank_acc_type'];
        this.pub_pan_number = response['resultdata'][0]['pan_number'];
        this.pub_gst_address = response['resultdata'][0]['gst_address'];
        this.pub_gst_city = response['resultdata'][0]['gst_city'];
        this.pub_gst_state = response['resultdata'][0]['gst_state'];
        this.pub_gst_postal = response['resultdata'][0]['gst_postal'];
        this.pub_gst_num = response['resultdata'][0]['gst_num'];
        this.pub_gst_certificate = response['resultdata'][0]['gst_certificate'];
        this.pub_pan_card_file = response['resultdata'][0]['pan_card_file'];
        this.pub_incorp_certificate_fille = response['resultdata'][0]['incorp_certificate_fille'];
        this.pub_aadhaar_card_file = response['resultdata'][0]['aadhaar_card_file'];
        this.pub_cancel_check_file = response['resultdata'][0]['cancel_check_file'];

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



        if (this.pub_gst_num != '' && this.pub_gst_num != 'no' && this.pub_gst_num != null) {
          this.gstregistred = 1;
          this.gstregistredinner = true;
        } else {
          this.gstregistred = 0;
          this.gstregistredinner = false;
        }
        this.isSpinnerVisible = false;
      } else {
        this.bankdataresult = false;
        this.message = response['message'];
          this.dialog.open(DialogDynamicAccComponent,
            {
              width: '450px',
              data: { message: this.message }
            });
          this.isSpinnerVisible = false;
      }
    });



  }

  // email = new FormControl('', [Validators.required, Validators.email]);

  // getErrorMessage() {
  //   return this.email.hasError('required')
  //     ? 'You must enter a value'
  //     : this.email.hasError('email')
  //       ? 'Not a valid email'
  //       : '';
  // }

  getFontSize() {
    return Math.max(10, this.options.value.fontSize);
  }

  backPage() {
    this.location.back();
  }
  onaadharChange(event) {
    const org_type = event.value;
    if (org_type == 'individual') {
      this.aadharshowhide = true;
      this.incorpshowhide = false;
    }else{
      this.aadharshowhide = false;
      this.incorpshowhide = true;
    }
  }
  onPercentChange(event) {
    // alert("hello");
    const org_comapny_typeCHk = this.bankdetailform.value.org_type;
    const org_country = event.value;
    if (org_country == 99) {
      /** for india conditions */
      this.countryInd = true;
      this.countryOther = false;
      this.countrySingapore = false;
      this.gstregistredouter = true;
      if(org_comapny_typeCHk=='individual'){
        this.aadharshowhide = true;
        this.incorpshowhide = false;
      }else{
        this.aadharshowhide = false;
        this.incorpshowhide = true;
      }

      this.bankdetailform.get('GST').setValidators([Validators.required]);
      this.bankdetailform.get('GST').updateValueAndValidity();
      this.bankdetailform.get('GST_address').setValidators([Validators.required]);
      this.bankdetailform.get('GST_address').updateValueAndValidity();
      this.bankdetailform.get('GST_city').setValidators([Validators.required]);
      this.bankdetailform.get('GST_city').updateValueAndValidity();
      this.bankdetailform.get('GST_state').setValidators([Validators.required]);
      this.bankdetailform.get('GST_state').updateValueAndValidity();
      this.bankdetailform.get('GST_postalcode').setValidators([Validators.required, Validators.pattern("^[a-zA-Z0-9- ]*$")]);
      this.bankdetailform.get('GST_postalcode').updateValueAndValidity();
      this.bankdetailform.get('GST_num').setValidators([Validators.required]);
      this.bankdetailform.get('GST_num').updateValueAndValidity();
      this.bankdetailform.get('bank_ifsc').setValidators([Validators.required]);
      this.bankdetailform.get('bank_ifsc').updateValueAndValidity();
      this.bankdetailform.get('bank_swift_code').clearValidators();
      this.bankdetailform.get('bank_swift_code').updateValueAndValidity();
      this.bankdetailform.get('PAN_num').setValidators([Validators.required]);
      this.bankdetailform.get('PAN_num').updateValueAndValidity();
      this.bankdetailform.get('pan_file').setValidators([Validators.required]);
      this.bankdetailform.get('pan_file').updateValueAndValidity();
      this.bankdetailform.get('aadhaar_file').setValidators([Validators.required]);
      this.bankdetailform.get('aadhaar_file').updateValueAndValidity();
      this.bankdetailform.get('cancelcheck_file').setValidators([Validators.required]);
      this.bankdetailform.get('cancelcheck_file').updateValueAndValidity();
      this.bankdetailform.get('GST_file').setValidators([Validators.required]);
      this.bankdetailform.get('GST_file').updateValueAndValidity();
      this.bankdetailform.get('incorp_file').setValidators([Validators.required]);
      this.bankdetailform.get('incorp_file').updateValueAndValidity();

    } else if (org_country == 192) {
      /** for singapore conditions */
      this.countrySingapore = true;
      this.countryInd = false;
      this.countryOther = false;
      this.gstregistredouter = true;
      this.aadharshowhide = false;
      this.incorpshowhide = false;
      this.bankdetailform.get('GST').setValidators([Validators.required]);
      this.bankdetailform.get('GST').updateValueAndValidity();
      this.bankdetailform.get('GST_address').setValidators([Validators.required]);
      this.bankdetailform.get('GST_address').updateValueAndValidity();
      this.bankdetailform.get('GST_city').setValidators([Validators.required]);
      this.bankdetailform.get('GST_city').updateValueAndValidity();
      this.bankdetailform.get('GST_state').setValidators([Validators.required]);
      this.bankdetailform.get('GST_state').updateValueAndValidity();
      this.bankdetailform.get('GST_postalcode').setValidators([Validators.required, Validators.pattern("^[a-zA-Z0-9- ]*$")]);
      this.bankdetailform.get('GST_postalcode').updateValueAndValidity();
      this.bankdetailform.get('GST_num').setValidators([Validators.required]);
      this.bankdetailform.get('GST_num').updateValueAndValidity();
      this.bankdetailform.get('bank_swift_code').setValidators([Validators.required]);
      this.bankdetailform.get('bank_swift_code').updateValueAndValidity();
      this.bankdetailform.get('bank_ifsc').clearValidators();
      this.bankdetailform.get('bank_ifsc').updateValueAndValidity();
      this.bankdetailform.get('PAN_num').clearValidators();
      this.bankdetailform.get('PAN_num').updateValueAndValidity();
      this.bankdetailform.get('pan_file').clearValidators();
      this.bankdetailform.get('pan_file').updateValueAndValidity();
      this.bankdetailform.get('aadhaar_file').clearValidators();
      this.bankdetailform.get('aadhaar_file').updateValueAndValidity();
      this.bankdetailform.get('cancelcheck_file').clearValidators();
      this.bankdetailform.get('cancelcheck_file').updateValueAndValidity();
      this.bankdetailform.get('GST_file').setValidators([Validators.required]);
      this.bankdetailform.get('GST_file').updateValueAndValidity();
      this.bankdetailform.get('incorp_file').setValidators([Validators.required]);
      this.bankdetailform.get('incorp_file').updateValueAndValidity();
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
      this.bankdetailform.get('bank_swift_code').setValidators([Validators.required]);
      this.bankdetailform.get('bank_swift_code').updateValueAndValidity();
      this.bankdetailform.get('bank_ifsc').clearValidators();
      this.bankdetailform.get('bank_ifsc').updateValueAndValidity();
      this.bankdetailform.get('PAN_num').clearValidators();
      this.bankdetailform.get('PAN_num').updateValueAndValidity();
      this.bankdetailform.get('pan_file').clearValidators();
      this.bankdetailform.get('pan_file').updateValueAndValidity();
      this.bankdetailform.get('aadhaar_file').clearValidators();
      this.bankdetailform.get('aadhaar_file').updateValueAndValidity();
      this.bankdetailform.get('cancelcheck_file').clearValidators();
      this.bankdetailform.get('cancelcheck_file').updateValueAndValidity();
      this.bankdetailform.get('GST_file').clearValidators();
      this.bankdetailform.get('GST_file').updateValueAndValidity();
      this.bankdetailform.get('incorp_file').clearValidators();
      this.bankdetailform.get('incorp_file').updateValueAndValidity();
    }
  }
  onRadioChange(event) {
    const valueGST = event.value;

    if (valueGST == 1) {
      this.gstregistredinner = true;
      this.bankdetailform.get('GST_address').setValidators([Validators.required]);
      this.bankdetailform.get('GST_address').updateValueAndValidity();
      this.bankdetailform.get('GST_city').setValidators([Validators.required]);
      this.bankdetailform.get('GST_city').updateValueAndValidity();
      this.bankdetailform.get('GST_state').setValidators([Validators.required]);
      this.bankdetailform.get('GST_state').updateValueAndValidity();
      this.bankdetailform.get('GST_postalcode').setValidators([Validators.required, Validators.pattern("^[a-zA-Z0-9- ]*$")]);
      this.bankdetailform.get('GST_postalcode').updateValueAndValidity();
      this.bankdetailform.get('GST_num').setValidators([Validators.required]);
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

}
