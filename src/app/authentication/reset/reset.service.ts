import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { ResetComponent } from './reset.component';
import { AppSettings } from '../../global/app-url';
interface myData {
    data: any,
    status_code: string
}


@Injectable({
    providedIn: 'root'
})
export class ForgotService {
   
constructor(private http: HttpClient) {

    }

    
    getGamData(uniq_id:any,newpassword:any,verifycode:any) {
        // var t = localStorage.getItem('access_token');
        // var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        // const httpOptions = {
        //     headers: headers_object
        // };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/auth/reset_password.php', {
           uniq_id, 
           newpassword,
           verifycode
        })

    }
}