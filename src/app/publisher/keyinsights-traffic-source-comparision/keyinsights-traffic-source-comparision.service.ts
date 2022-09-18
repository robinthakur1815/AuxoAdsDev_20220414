import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { keyinsightsTrafficSourceComparisionComponent } from './keyinsights-traffic-source-comparision.component';
import { AppSettings } from '../../global/app-url';
interface myData {
    data: any,
    status_code: string
}


@Injectable({
    providedIn: 'root'
})
export class KeyinsightsTrafficService {
    public usertype: any;
    private _url: string = "";

    constructor(private http: HttpClient) {

    }

   getMapOver( uniq_id: any,account_id: any, child_net_code: any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/user/key-insights/fusionchartapi.php', {
            uniq_id,
            account_id,
            child_net_code
        }, httpOptions)

    }
    getTrafficOver( uniq_id: any,account_id: any, child_net_code: any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/user/key-insights/traffic_insights.php', {
            uniq_id,
            account_id,
            child_net_code
        }, httpOptions)

    }  
}