import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { LogoutComponents } from './logout.component';
import { AppSettings } from '../../global/app-url';
interface myData {
    data: any,
    status_code: string,
}
@Injectable({
    providedIn: 'root'
})
export class LogoutService {
    public usertype: any;
    private _url: string = "";

    constructor(private http: HttpClient) {

    }

    getlogoutdevice(uniq_id: any, child_net_code: any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/auth/logout.php', {
            uniq_id,
            child_net_code
        }, httpOptions)

    }
    
    

}