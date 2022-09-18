import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { ProDashboardDisplayGeoComponent } from './prodashboard-display-geo.component';
import { AppSettings } from '../../global/app-url';
interface myData {
    data: any,
    status_code: string
}


@Injectable({
    providedIn: 'root'
})
export class ProDashboardDisplayGeoService {
   
constructor(private http: HttpClient) {

    }

    getProDisplayGeo(strtdate: any, enddate: any, uniq_id: any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/user/pro-revenue/hb_geo.php', {
            strtdate,
            enddate,
            uniq_id
        }, httpOptions)

    }
    downCyberAdsGeo(strtdate: any, enddate: any, uniq_id: any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/user/pro-revenue/download-pro-geo.php', {
            strtdate,
            enddate,
            uniq_id
        }, httpOptions)

    }
}
