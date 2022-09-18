import { Component, Inject, OnInit } from '@angular/core';
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
import { Observable } from 'rxjs';
import { GenerateTagService } from './generate-tag.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
declare var $: any;
import { AppSettings } from '../../global/app-url';





// Popup start
@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example.html'
})

export class DialogOverviewExampleGenerateTagComponent implements OnInit {
  quick_partner_id: any;
  quick_pub_id: any;
  quick_domainList:any;
  quick_catList:any;
  quick_tag_1:any;
  quick_tag_2:any;
  quick_tag_3:any;
  quick_tag_4:any;
  quick_tag_5:any;

  quick_app_tag_1:any;
  quick_app_tag_2:any;
  quick_app_tag_3:any;
  quick_app_tag_4:any;
  quick_app_tag_5:any;
  quick_message:any;
  public isSpinnerVisible_quick: boolean = true;
  public quickTagsform: FormGroup = Object.create(null);
  public quickTagsAppform: FormGroup = Object.create(null);

  public quickAppstatus: boolean = false;
  quickAppList:any;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleGenerateTagComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog,private _gererateTagquick: GenerateTagService,activatedRouter: ActivatedRoute,private router: Router,private quickfb: FormBuilder
  ) {
    this.quick_domainList = data.popupDomian;
    this.quick_catList = data.popupCate;
    this.quickAppstatus = data.popupAppstatus;
    this.quickAppList = data.popupApp;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    this.isSpinnerVisible_quick = false;
    this.quickTagsform = this.quickfb.group({
      quick_domain: [null, Validators.compose([Validators.required])],
      quick_cate: [null, Validators.compose([Validators.required])],
    });
    this.quickTagsAppform = this.quickfb.group({
      quick_app_list: [null, Validators.compose([Validators.required])],
      quick_app_cate: [null, Validators.compose([Validators.required])],
    });
  }
  quickTags(){
    if (this.quickTagsform.invalid) {
      return;
    }
    if (this.quickTagsform.valid) {
      let domain_name = this.quickTagsform.value.quick_domain;
      let category = this.quickTagsform.value.quick_cate;
      category = category.replace(/ /g,"_");
      category = category.replace("&","and");
      let quickfinalcode: string;
      quickfinalcode =domain_name;
      quickfinalcode +="_"+category;
      quickfinalcode = quickfinalcode.replace(/[&\/\\#, +()$~%'":*?<>{}]/g,"");
      this.quick_tag_1 = "CM_"+quickfinalcode+"_TOP_responsive_WC1";
			this.quick_tag_2 = "CM_"+quickfinalcode+"_ATF_responsive_WC2";
			this.quick_tag_3 = "CM_"+quickfinalcode+"_BTF_responsive_WC3";
			this.quick_tag_4 = "CM_"+quickfinalcode+"_EOP_responsive_WC4";
			this.quick_tag_5 = "CM_"+quickfinalcode+"_TOP_responsive_BRSR";
    }
    
  }
  quickAppTags(){
    if (this.quickTagsAppform.invalid) {
      return;
    }
    if (this.quickTagsAppform.valid) {
      let app_name = this.quickTagsAppform.value.quick_app_list;
      app_name = app_name.replace(/ /g,"_");
      app_name = app_name.replace("&","and");
      let category = this.quickTagsAppform.value.quick_app_cate;
      category = category.replace(/ /g,"_");
      category = category.replace("&","and");
      let quickfinalcode: string;
      quickfinalcode =app_name;
      quickfinalcode +="_InApp_"+category;
      quickfinalcode = quickfinalcode.replace(/[&\/\\#, +()$~%'":*?<>{}]/g,"");
      this.quick_app_tag_1 = "CM_"+quickfinalcode+"_Interstitial";
			this.quick_app_tag_2 = "CM_"+quickfinalcode+"_Banner";
			this.quick_app_tag_3 = "CM_"+quickfinalcode+"_Anchor";
			this.quick_app_tag_4 = "CM_"+quickfinalcode+"_Native";
			this.quick_app_tag_5 = "CM_"+quickfinalcode+"_AppOpen";
    }
  }
  copyTextQuick(inputElement:any){
    inputElement.focus();
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }
}
// popup end

// tab start
export interface ExampleTab {
  label: string;
  content: string;
}

@Component({
  selector: 'app-generate-tag',
  templateUrl: './generate-tag.component.html',
  styleUrls: ['./generate-tag.component.scss']
})

export class GenerateTagComponent implements OnInit {

  // tabs start
  tabs = ['First', 'Second', 'Third'];
  selected = new FormControl(0);

  tabLoadTimes: Date[] = [];

  asyncTabs: Observable<ExampleTab[]>;

  links = ['First', 'Second', 'Third'];
  activeLink = this.links[0];
  background = '';







  addTab(selectAfterAdding: boolean) {
    this.tabs.push('New');

    if (selectAfterAdding) {
      this.selected.setValue(this.tabs.length - 1);
    }
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }

  getTimeLoaded(index: number) {
    if (!this.tabLoadTimes[index]) {
      this.tabLoadTimes[index] = new Date();
    }

    return this.tabLoadTimes[index];
  }
  // tabs end

  // Popup start
  animal = '';
  name = '';
  // popup end

  public tagform: FormGroup = Object.create(null);
  public tagformApp: FormGroup = Object.create(null);
  public tagformVideo: FormGroup = Object.create(null);
  partner_id: any;
  pub_id: any;
  pub_network_status: any;
  network_flag: any;
  public message;
  public isSpinnerVisible: boolean = true;
  public domainList:any;
  public appList:any;
  public categoryList:any;
  public categoryList2:any;
  public categoryList3:any;
  public appStatus: boolean = false;

  public prefix :any;
  public finalcodeDisplay:any;
  public finalcodeApp:any;
  public finalcodeVideo:any;


  constructor(activatedRouter: ActivatedRoute, private _gererateTag: GenerateTagService, private fb: FormBuilder, private location: Location, private router: Router, public dialog: MatDialog, private http: HttpClient) {
    this.partner_id = activatedRouter.snapshot.paramMap.get('uniq_id');
    this.pub_id = activatedRouter.snapshot.paramMap.get('pub_id');
    
  }
  // Popup start
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleGenerateTagComponent, {
      width: '900px',
      data: { popupDomian: this.domainList,popupCate:this.categoryList,popupAppstatus:this.appStatus,popupApp:this.appList }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
    });
  }
  // popup end

  ngOnInit() {
    this.tagform = this.fb.group({
      tag_type: [null, Validators.compose([Validators.required])],
      tag_domain: [null, Validators.compose([Validators.required])],
      tag_cat: [null, Validators.compose([Validators.required])],
      tag_cat2: [null],
      tag_cat3: [null],
      tag_pos_type: [null],
      tag_sec_pos: [null],
      tag_size: [null],
      tag_position: [null, Validators.compose([Validators.required])],
      tag_prefix: [null, Validators.compose([Validators.required])],
      pub_network_flag: [null, Validators.compose([Validators.required])],
    });
    this.tagformApp = this.fb.group({
      tag_type: [null, Validators.compose([Validators.required])],
      tag_prefix: [null, Validators.compose([Validators.required])],
      tag_app: [null, Validators.compose([Validators.required])],
      tag_inApp: [null, Validators.compose([Validators.required])],
      tag_cat: [null, Validators.compose([Validators.required])],
      tag_cat2: [null],
      tag_cat3: [null],
      tag_position: [null, Validators.compose([Validators.required])],
      pub_network_flag: [null, Validators.compose([Validators.required])],
    });
    this.tagformVideo = this.fb.group({
      tag_type: [null, Validators.compose([Validators.required])],
      tag_prefix: [null, Validators.compose([Validators.required])],
      tag_domain: [null, Validators.compose([Validators.required])],
      tag_invdo: [null, Validators.compose([Validators.required])],
      tag_cat: [null, Validators.compose([Validators.required])],
      tag_cat2: [null],
      tag_cat3: [null],
      pub_network_flag: [null, Validators.compose([Validators.required])],
      stream_type_id: [null],
      stream_type2_id: [null],
      stream_type3_id: [null],
    });
    this._gererateTag.getTagsCode(this.partner_id,this.pub_id).subscribe(dataResult => {
      if (dataResult['status_code'] == '200') {
        this.domainList = dataResult['data']['domainData'];
        this.appList = dataResult['data']['appData'];
        this.categoryList = dataResult['data']['categoryData'];
        this.prefix =  dataResult['data']['profileData']['prefix'];
        this.network_flag =  dataResult['data']['profileData']['network_flag'];
        if(this.appList.length > 0){
          this.appStatus = true;
        }else{
          this.appStatus = false;
        }
        if(this.network_flag==0){
          this.pub_network_status = false;
          this.tagform.get('tag_prefix').clearValidators();
          this.tagform.get('tag_prefix').updateValueAndValidity();
          this.tagformApp.get('tag_prefix').clearValidators();
          this.tagformApp.get('tag_prefix').updateValueAndValidity();
          this.tagformVideo.get('tag_prefix').clearValidators();
          this.tagformVideo.get('tag_prefix').updateValueAndValidity();
        }
        if(this.network_flag==1){
          this.pub_network_status = true;
          this.tagform.get('tag_prefix').setValidators([Validators.required]);
          this.tagform.get('tag_prefix').updateValueAndValidity();
          this.tagformApp.get('tag_prefix').setValidators([Validators.required]);
          this.tagformApp.get('tag_prefix').updateValueAndValidity();
          this.tagformVideo.get('tag_prefix').setValidators([Validators.required]);
          this.tagformVideo.get('tag_prefix').updateValueAndValidity();
        }
        
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
  getCategory2(event:any) {
    this.isSpinnerVisible = true;
    const cat1 = event.value;
    this._gererateTag.getCategory2(cat1).subscribe(dataResult => {
      if (dataResult['status_code'] == '200') {
        this.categoryList2 = dataResult['data'];
        this.isSpinnerVisible = false;
      } else {
        
        this.isSpinnerVisible = false;
      }
    });
  }
  getCategory3(event:any) {
    this.isSpinnerVisible = true;
    const cat2 = event.value;
    this._gererateTag.getCategory3(cat2).subscribe(dataResult => {
      if (dataResult['status_code'] == '200') {
        this.categoryList3 = dataResult['data'];
        this.isSpinnerVisible = false;
      } else {
        
        this.isSpinnerVisible = false;
      }
    });
  }
  displaySubmit(){
    this.isSpinnerVisible = false;
    if (this.tagform.invalid) {
      this.message = "Please fill out all required fields";
        this.dialog.open(DialogDynamicAccComponent,
          {
            width: '450px',
            data: { message: this.message }
          });
        this.isSpinnerVisible = false;
      return;
    }
    if (this.tagform.valid) {
      const type = this.tagform.value.tag_type;
      const website = this.tagform.value.tag_domain;
      
      let  ver_one = this.tagform.value.tag_cat;
      ver_one = ver_one.replace(/ /g,"_");
      ver_one = ver_one.replace("&","and");
      let ver_two = this.tagform.value.tag_cat2;
      let ver_three = this.tagform.value.tag_cat3;
      
      const pri_pos = this.tagform.value.tag_position;
      const tag_type = this.tagform.value.tag_pos_type;
      const sec_pos = this.tagform.value.tag_sec_pos;
      const size = this.tagform.value.tag_size;
      const prefix = this.tagform.value.tag_prefix;
      const checkedValue = this.tagform.value.pub_network_flag;
      let finalcode: string;
      if(checkedValue == 0){
        finalcode = type+"_"+website+"_"+ver_one;
      }else{
        finalcode = type+"_"+prefix+"_"+website+"_"+ver_one;
      }
      if(ver_two == null || ver_two ==''){
      }else{
        ver_two = ver_two.replace(/ /g, "_");
        ver_two = ver_two.replace("&", "and");
        finalcode +="_"+ver_two;
      }
      if(ver_three == null || ver_three ==''){
      }else{
        ver_three = ver_three.replace(/ /g, "_");
        ver_three = ver_three.replace("&", "and");
        finalcode +="_"+ver_three;
      }
      if(pri_pos == null || pri_pos ==''){
      }else{
        finalcode +="_"+pri_pos;
      }
      if(tag_type == null || tag_type ==''){
      }else{
        finalcode +="_"+tag_type;
      }
      if(sec_pos == null || sec_pos ==''){
      }else{
        finalcode +="_"+sec_pos;
      }
      if(size == null || size ==''){
      }else{
        finalcode +="_"+size;
      }
      finalcode = finalcode.replace(/[&\/\\#, +()$~%'":*?<>{}]/g,"");
      this.finalcodeDisplay = finalcode;
    }
  }
  
  appSubmit(){
    this.isSpinnerVisible = false;
    if (this.tagformApp.invalid) {
      this.message = "Please fill out all required fields";
        this.dialog.open(DialogDynamicAccComponent,
          {
            width: '450px',
            data: { message: this.message }
          });
        this.isSpinnerVisible = false;
      return;
    }
    if (this.tagformApp.valid) {
      const type = this.tagformApp.value.tag_type;
      let app = this.tagformApp.value.tag_app;
      app = app.replace(/ /g,"_");
      let tag_inApp = this.tagformApp.value.tag_inApp;
      
      let  ver_one = this.tagformApp.value.tag_cat;
      ver_one = ver_one.replace(/ /g,"_");
      ver_one = ver_one.replace("&","and");
      let ver_two = this.tagformApp.value.tag_cat2;
      let ver_three = this.tagformApp.value.tag_cat3;
      
      const pri_pos = this.tagformApp.value.tag_position;
      
      const prefix = this.tagformApp.value.tag_prefix;
      const checkedValue = this.tagformApp.value.pub_network_flag;
      let appfinalcode: string;
      if(checkedValue == 0){
        appfinalcode = type+"_"+app+"_"+tag_inApp+"_"+ver_one;
      }else{
        appfinalcode = type+"_"+prefix+"_"+app+"_"+tag_inApp+"_"+ver_one;
      }
      if(ver_two == null || ver_two ==''){
        
      }else{
        ver_two = ver_two.replace(/ /g, "_");
        ver_two = ver_two.replace("&", "and");
        appfinalcode +="_"+ver_two;
      }
      if(ver_three == null || ver_three ==''){
        
      }else{
        ver_three = ver_three.replace(/ /g, "_");
        ver_three = ver_three.replace("&", "and");
        appfinalcode +="_"+ver_three;
      }
      if(pri_pos == null || pri_pos ==''){
        
      }else{
        appfinalcode +="_"+pri_pos;
      }
      
      appfinalcode = appfinalcode.replace(/[&\/\\#, +()$~%'":*?<>{}]/g,"");
      this.finalcodeApp = appfinalcode;
    }
  }
  
  videoSubmit(){
    this.isSpinnerVisible = false;
    if (this.tagformVideo.invalid) {
      this.message = "Please fill out all required fields";
        this.dialog.open(DialogDynamicAccComponent,
          {
            width: '450px',
            data: { message: this.message }
          });
        this.isSpinnerVisible = false;
      return;
    }
    if (this.tagformVideo.valid) {
      const type = this.tagformVideo.value.tag_type;
      let domain = this.tagformVideo.value.tag_domain;
      
      let tag_invdo = this.tagformVideo.value.tag_invdo;
      
      let  ver_one = this.tagformVideo.value.tag_cat;
      ver_one = ver_one.replace(/ /g,"_");
      ver_one = ver_one.replace("&","and");
      let ver_two = this.tagformVideo.value.tag_cat2;
      let ver_three = this.tagformVideo.value.tag_cat3;
      
      const pri_pos = this.tagformVideo.value.tag_position;
      
      const prefix = this.tagformVideo.value.tag_prefix;
      const checkedValue = this.tagformVideo.value.pub_network_flag;
      const stream_type_id = this.tagformVideo.value.stream_type_id;
      const stream_type2_id = this.tagformVideo.value.stream_type2_id;
      const stream_type3_id = this.tagformVideo.value.stream_type3_id;
      let videofinalcode: string;
      if(checkedValue == 0){
        videofinalcode = type+"_"+domain+"_"+tag_invdo+"_"+ver_one;
      }else{
        videofinalcode = type+"_"+prefix+"_"+domain+"_"+tag_invdo+"_"+ver_one;
      }
      if(ver_two == null || ver_two ==''){
        
      }else{
        ver_two = ver_two.replace(/ /g, "_");
        ver_two = ver_two.replace("&", "and");
        videofinalcode +="_"+ver_two;
      }
      if(ver_three == null || ver_three ==''){
        
      }else{
        ver_three = ver_three.replace(/ /g, "_");
        ver_three = ver_three.replace("&", "and");
        videofinalcode +="_"+ver_three;
      }
      if(pri_pos == null || pri_pos ==''){
        
      }else{
        videofinalcode +="_"+pri_pos;
      }

      if(stream_type_id == null || stream_type_id ==''){
        
      }else{
        videofinalcode +="_"+stream_type_id;
      }
      if(stream_type2_id == null || stream_type2_id ==''){
        
      }else{
        videofinalcode +="_"+stream_type2_id;
      }
      if(stream_type3_id == null || stream_type3_id ==''){
        
      }else{
        videofinalcode +="_"+stream_type3_id;
      }
      
      videofinalcode = videofinalcode.replace(/[&\/\\#, +()$~%'":*?<>{}]/g,"");
      this.finalcodeVideo = videofinalcode;
    }
  }
  copyTagsText(inputElement:any){
    inputElement.focus();
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }
}

