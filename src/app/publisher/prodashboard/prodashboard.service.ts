import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { ProDashboardComponent } from './prodashboard.component';
import { AppSettings } from '../../global/app-url';
interface myData {
    data: any,
    status_code: string
}


@Injectable({
    providedIn: 'root'
})
export class ProDashboardService {
    public usertype: any;
    private _url: string = "";

    constructor(private http: HttpClient) {

    }

    getProDashoverview(strtdate: any, enddate: any, uniq_id: any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/user/pro-revenue/dashboard_prooverview.php', {
            uniq_id,
            strtdate,
            enddate,
        
        }, httpOptions)

    }
    getProDashDevice(strtdate: any, enddate: any, uniq_id: any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/user/pro-revenue/dashboard_prodevice.php', {
            uniq_id,
            strtdate,
            enddate,
        
        }, httpOptions)

    }
   getProDashGeo(strtdate: any, enddate: any, uniq_id: any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/user/pro-revenue/dashboard_progeo.php', {
            uniq_id,
            strtdate,
            enddate,
        
        }, httpOptions)

    }
    getProDashHBwithDD(strtdate: any, enddate: any, uniq_id: any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/user/pro-revenue/dashboard_hb_with_dd.php', {
            uniq_id,
            strtdate,
            enddate,
        
        }, httpOptions)

    }
    getProDashAdunits(strtdate: any, enddate: any, uniq_id: any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/user/pro-revenue/dashboard_proAdunits.php', {
            uniq_id,
            strtdate,
            enddate,
        
        }, httpOptions)

    }

}