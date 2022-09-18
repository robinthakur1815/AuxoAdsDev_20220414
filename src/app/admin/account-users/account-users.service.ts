import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { AppSettings } from '../../global/app-url';

interface myData {
    success: boolean,
    pub_name: string
    
  }
@Injectable({
    providedIn: 'root'
})
export class AccountUserService {
    constructor(private http: HttpClient) {}

    getAccUserList(){
        var t = localStorage.getItem('access_token'); 
        var uniq_id = localStorage.getItem('uniq_id');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };

        return this.http.post(AppSettings.API_STARTPOINT+'/assets/api/admin/backend-admin/account_users.php', {
            uniq_id,
         },httpOptions)
    }
    fetchuserData(account_user_id:any,userEmail:any){
        var t = localStorage.getItem('access_token'); 
        var uniq_id = localStorage.getItem('uniq_id');
        var getflag =0;
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };

        return this.http.post(AppSettings.API_STARTPOINT+'/assets/api/admin/backend-admin/update_account_users.php', {
            uniq_id,
            getflag,
            account_user_id

         },httpOptions)
    }
    adduserData(first_name:any,last_name:any,email:any,password:any,contact:any,role_id:any){
        var t = localStorage.getItem('access_token'); 
        var uniq_id = localStorage.getItem('uniq_id');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };

        return this.http.post(AppSettings.API_STARTPOINT+'/assets/api/admin/backend-admin/add_account_users.php', {
            uniq_id,
            first_name,
            last_name,
            password,
            contact,
            role_id,
            email

         },httpOptions)
    }
    updateuserData(first_name:any,last_name:any,password:any,contact:any,role_id:any,user_status:any,account_user_id:any,email:any){
        var t = localStorage.getItem('access_token'); 
        var uniq_id = localStorage.getItem('uniq_id');
        var getflag =1;
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };

        return this.http.post(AppSettings.API_STARTPOINT+'/assets/api/admin/backend-admin/update_account_users.php', {
            uniq_id,
            getflag,
            first_name,
            last_name,
            password,
            contact,
            role_id,
            user_status,
            account_user_id,
            email

         },httpOptions)
    }
}