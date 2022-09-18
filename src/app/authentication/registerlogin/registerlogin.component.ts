import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';


@Component({
  selector: 'app-registerlogin',
  templateUrl: './registerlogin.component.html',
  styleUrls: ['./registerlogin.component.scss']
})
export class RegisterLoginComponent implements OnInit {
  public form: FormGroup = Object.create(null);
  public errorMsg;
  public logerror;
  public rolesData = [];
  submitted: boolean = false;
  public isSpinnerVisibleLogin: boolean = false;
  constructor(private fb: FormBuilder, private router: Router, private Auth: AuthService, private http: HttpClient) { }

  ngOnInit() {
    this.form = this.fb.group({
      uname: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])],
      recaptcha: [null, Validators.compose([Validators.required])]
    });
  }
  getdaterange() {
    var asiaTime = new Date().toLocaleString("en-US", { timeZone: "Pacific/Honolulu" });
    var today = new Date(asiaTime);
    var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 9);
    var strtmnth = ("0" + (lastWeek.getMonth() + 1)).slice(-2);
    var strtday = ("0" + lastWeek.getDate()).slice(-2);
    var endmnth = ("0" + (today.getMonth() + 1)).slice(-2);
    var endday = ("0" + today.getDate()).slice(-2);
    var finalstrtdate = [lastWeek.getFullYear(), strtmnth, strtday].join("-");
    var finalenddate = [today.getFullYear(), endmnth, endday].join("-");
    let strtdate = "startdate=" + finalstrtdate + "&enddate=" + finalenddate;
    localStorage.setItem('startdate', finalstrtdate);
    localStorage.setItem('enddate', finalenddate);
    localStorage.setItem('range', "10days");
  }
  //ReCaptcha
  handleSuccess(e) {
    
  }
  onSubmit() {
    this.isSpinnerVisibleLogin = true;
    this.submitted = true;
    this.logerror = false;
    const username = this.form.value.uname;
    const password = this.form.value.password;
    if (this.form.invalid) {
      this.isSpinnerVisibleLogin = false;
      return;
    }
    if (this.form.valid) {

      this.Auth.getUserDetails(username, password).subscribe(data => {
        if (data.success) {
          localStorage.clear();
          localStorage.setItem('acc_name', data.pub_name);
          localStorage.setItem('child_net_code', data.childNetworkCode);
          localStorage.setItem('ads_id', data.ads_id);
          if(data.anlytics_id==null || data.anlytics_id==""){
            localStorage.setItem('anlytic_id', "NULL");
          }else{
            localStorage.setItem('anlytic_id', data.anlytics_id);
          }
          
          localStorage.setItem('uniq_id', data.uniq_id);
          localStorage.setItem('website_name', 'all');
          localStorage.setItem('acc_mgr_id', data.acc_mgr_id);
          localStorage.setItem('useremail', data.email);
          localStorage.setItem('usertype', data.user_id);
          localStorage.setItem('role_id', data.role_id);
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('mcm_status', data.mcm_status);
          localStorage.setItem('display_status', data.display_status);
          localStorage.setItem('app_status', data.app_status);
          localStorage.setItem('video_status', data.video_status);
          localStorage.setItem('pro_status', data.pro_status);
          localStorage.setItem('tour_status', data.tour_status);
          localStorage.setItem('pub_acc_name', data.pub_acc_name);
          localStorage.setItem('pub_acc_new_name', data.pub_acc_new_name);
          this.Auth.setLoggedIn(true);
          this.getdaterange();
          this.logerror = false;
          
          if (data.role_id == '1') {
            /***** For Admin Role */
            localStorage.clear();
            localStorage.setItem('pub_name', data.pub_name);
            localStorage.setItem('uniq_id', data.uniq_id);
            localStorage.setItem('role_id', data.role_id);
            localStorage.setItem('useremail', data.email);
            localStorage.setItem('usertype', data.user_id);
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('role', "Admin");
            this.router.navigate(['/admin-dashboard']); 
          } else if (data.role_id == '3') {
            /***** For Publisher Role */
            localStorage.setItem('role', "Publisher");
            if ((data.childNetworkCode == null || data.childNetworkCode == "null") && (data.mcm_status == null || data.mcm_status == "null")) {
              this.router.navigate(['/gam_invite']);
            } else {
              this.router.navigate(['/dashboard']);
            }
          } else if (data.role_id == '6') {
            /***** For Network Role */
            localStorage.setItem('role', "Network");
            this.router.navigate(['/dashboard']);
          }else if (data.role_id == '9') {
            /***** For Onboarding Manager Role */
            localStorage.clear();
            localStorage.setItem('obm_name', data.pub_name);
            localStorage.setItem('uniq_id', data.uniq_id);
            localStorage.setItem('role_id', data.role_id);
            localStorage.setItem('useremail', data.email);
            localStorage.setItem('usertype', data.user_id);
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('role', "ONB Manager");
            this.router.navigate(['/obm-dashboard']);
          }else if (data.role_id == '2') {
            /***** For Account Manager Role */
            localStorage.clear();
            localStorage.setItem('acc_name', data.pub_name);
            localStorage.setItem('uniq_id', data.uniq_id);
            localStorage.setItem('role_id', data.role_id);
            localStorage.setItem('useremail', data.email);
            localStorage.setItem('manager_id', data.user_id);
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('role', "Acc Manager");
            this.router.navigate(['/acc-dashboard']);
          }else if (data.role_id == '12') {
            /***** For Adops Manager (Sub User Of Publisher) Role */
            localStorage.setItem('role', "Adops Manager");
            this.router.navigate(['/auxo']);
          }
          else if (data.role_id == '13') {
            /***** For Adops Executive(Sub User Of Publisher) Role */
            localStorage.setItem('role', "Adops Executive");
            this.router.navigate(['/auxo']);
          }
          else if (data.role_id == '14') {
            /***** For Editor (Sub User Of Publisher) Role */
            localStorage.setItem('role', "Editor");
            this.router.navigate(['/keyinsights/content-performance']);
          }else if (data.role_id == '7') {
            /***** For Sales Admin Role */
            localStorage.clear();
            this.getdaterange();
            localStorage.setItem('acc_name', data.pub_name);
            localStorage.setItem('uniq_id', data.uniq_id);
            localStorage.setItem('role_id', data.role_id);
            localStorage.setItem('useremail', data.email);
            localStorage.setItem('sales_id', data.user_id);
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('role', "Sales Admin");
            this.router.navigate(['/sales-dashboard']);
          }else if (data.role_id == '8') {
            /***** For Sales Admin Role */
            localStorage.clear();
            this.getdaterange();
            localStorage.setItem('acc_name', data.pub_name);
            localStorage.setItem('uniq_id', data.uniq_id);
            localStorage.setItem('role_id', data.role_id);
            localStorage.setItem('useremail', data.email);
            localStorage.setItem('sales_id', data.user_id);
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('role', "Sales Users");
            this.router.navigate(['/sales-dashboard']); 
          }else if (data.role_id == '4') {
            /***** For Finance Role */
            localStorage.clear();
            localStorage.setItem('acc_name', data.pub_name);
            localStorage.setItem('uniq_id', data.uniq_id);
            localStorage.setItem('role_id', data.role_id);
            localStorage.setItem('useremail', data.email);
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('role', "Finance");
            this.router.navigate(['/finance-dashboard']);
          }else if (data.role_id == '15') {
            /***** For Deals Manager  Role */
            localStorage.clear();
            localStorage.setItem('acc_name', data.pub_name);
            localStorage.setItem('uniq_id', data.uniq_id);
            localStorage.setItem('role_id', data.role_id);
            localStorage.setItem('useremail', data.email);
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('role', "Deals Manager");
            this.router.navigate(['/deals-direct-deal']);
          }
          
        } else {
          this.isSpinnerVisibleLogin =false;
          this.logerror = data.message;
        }
      })

    }
  }
}
