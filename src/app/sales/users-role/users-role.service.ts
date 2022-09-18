import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { SalesUsersComponent } from './users-role.component';
import { AppSettings } from '../../global/app-url';
interface myData {
    data: any,
    status_code: string
}


@Injectable({
    providedIn: 'root'
})
export class UserRoleService {
   
constructor(private http: HttpClient) {

    }

    
    getUserInfoData(uniq_id:any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/sales/fetchsalesuser_details.php', {
            uniq_id
        }, httpOptions)

    }
  fetchSalesData(uniq_id:any,salesuser_id:any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/sales/fetchsalesuser_details_edit.php', {
           uniq_id,
           salesuser_id
        }, httpOptions)

    }
  updateuserData(first_name:any,last_name:any,user_email:any,user_phone:any,user_role_id:any,user_status:any,salesuser_id:any){
        var t = localStorage.getItem('access_token'); 
        var uniq_id = localStorage.getItem('uniq_id');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };

        return this.http.post(AppSettings.API_STARTPOINT+'/assets/api/admin/sales/updatesalesuser.php', {
            uniq_id,
            first_name,
            last_name,
            user_email,
            user_phone,
            user_role_id,
            user_status,
            salesuser_id,

         },httpOptions)
    }
    
}
