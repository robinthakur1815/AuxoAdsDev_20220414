import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { ProDashboardDisplayDeviceComponent } from './prodashboard-display-device.component';
import { AppSettings } from '../../global/app-url';
interface myData {
    data: any,
    status_code: string
}


@Injectable({
    providedIn: 'root'
})
export class ProDashDeviceService {
    public usertype: any;
    private _url: string = "";

    constructor(private http: HttpClient) {

    }

    getProDevice( uniq_id: any,strtdate: any, enddate: any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/user/pro-revenue/hb_device.php', {
            uniq_id,
            strtdate,
            enddate
        }, httpOptions)

    }
    downProDevice(strtdate: any, enddate: any, uniq_id: any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/user/pro-revenue/download-pro-device.php', {
            uniq_id,
            strtdate,
            enddate
        }, httpOptions)

    }
}