import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { ManageUsersDialogContent } from './manageusers.component';
import { AppSettings } from '../../global/app-url';
interface myData {
    data: any,
    status_code: string
}


@Injectable({
    providedIn: 'root'
})
export class SaveSubUserService {
   
constructor(private http: HttpClient) {

    }

    postSubuser(parent_email: any,parent_id: any, first_name: any, last_name: any, email: any,contact:any,role_id:any,uniq_id:any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/user/subuser/create_subuser.php', {
            parent_email,
            parent_id,
            first_name,
            last_name,
            email,
            contact,
            role_id,
            uniq_id
        }, httpOptions)

    }
    getSubuser(uniq_id:any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/user/subuser/listing.php', {
           uniq_id
        }, httpOptions)

    }
    updateSubuser(subuser_id: any, first_name: any, last_name: any, email: any,contact:any,role_id:any,uniq_id:any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/user/subuser/update_subuser.php', {
            subuser_id,
            first_name,
            last_name,
            email,
            contact,
            role_id,
            uniq_id
        }, httpOptions)

    }
     deleteSubuser(subuser_id:any,first_name: any, last_name: any,uniq_id:any,email:any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/user/subuser/delete_subuser.php', {
           subuser_id,
           first_name,
           last_name,
           uniq_id,
           email
        }, httpOptions)

    }
}
