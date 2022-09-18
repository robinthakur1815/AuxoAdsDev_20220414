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
import { PexelTrackingService } from './pexel-tracking-tag.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
declare var $: any;
import { AppSettings } from '../../global/app-url';

@Component({
  selector: 'app-pexel-tracking-tag',
  templateUrl: './pexel-tracking-tag.component.html',
  styleUrls: ['./pexel-tracking-tag.component.scss']
})

  export class PixelTrackingTagComponent implements OnInit {
    partner_id: any;
    pub_id: any;
    public isSpinnerVisible: boolean = true;
    public message: any;
    public domianList: any;
    public pixelform: FormGroup = Object.create(null);

    constructor(activatedRouter: ActivatedRoute, private _pixelTracking: PexelTrackingService, private fb: FormBuilder, private location: Location, private router: Router, public dialog: MatDialog,private http: HttpClient) {
      this.partner_id = activatedRouter.snapshot.paramMap.get('uniq_id');
      // this.pub_id = activatedRouter.snapshot.paramMap.get('pub_id');
    }

    ngOnInit() {
      this.pixelform = this.fb.group({
        web_name: [null, Validators.compose([Validators.required])],
        
      });
      this._pixelTracking.getPexelCode(this.partner_id).subscribe(dataResult => {
        if (dataResult['status_code'] == '200') {
          this.domianList = dataResult['data'];
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
    backPage(){
      this.location.back();
    }
    getCode(){
      if (this.pixelform.invalid) {
        
        return;
      }
      if (this.pixelform.valid) {
        const domain = this.pixelform.value.web_name;
        $(".pixelCode").hide();
        $("#pixel"+domain).show();
      }
      
    }
    ondomainChange() {
      $(".pixelCode").hide();
    }
  }

