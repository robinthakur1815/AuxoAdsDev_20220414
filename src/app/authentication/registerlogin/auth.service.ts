import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { AppSettings } from '../../global/app-url';
interface myData {
  success: boolean,
  pub_name: string
  childNetworkCode: string
  ads_id: string
  anlytics_id: string
  uniq_id: string
  startdate: string
  enddate: string
  acc_mgr_id: string
  email: string
  user_id: string
  role_id: string
  access_token: string
  message:string
  mcm_status:string
  display_status:string
  app_status:string
  video_status:string
  tour_status:string
  pro_status:string
  pub_acc_name:string
  pub_acc_new_name:string
  // strtdate: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public errorMsg;
  private loggedInStatus = false

  constructor(private http: HttpClient) { }

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value
  }

  get isLoggedIn() {
    return this.loggedInStatus
  }

  getUserDetails(email: any, password: any) {
    return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/auth/signin.php', {
      email,
      password
    })
}


}
