import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { KeyinsightsAudienceOverviewComponent } from './keyinsights-audience-overview.component';
import { AppSettings } from '../../global/app-url';
interface myData {
    data: any,
    status_code: string
}


@Injectable({
    providedIn: 'root'
})
export class KeyinsightsAudienceOverService {
    public usertype: any;
    private _url: string = "";

    constructor(private http: HttpClient) {

    }

    getAudienceOver( uniq_id: any,account_id: any, child_net_code: any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/user/key-insights/audience_insights.php', {
            uniq_id,
            account_id,
            child_net_code
        }, httpOptions)

    }
     getBounceOver( uniq_id: any,account_id: any, child_net_code: any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/user/key-insights/summary.php', {
            uniq_id,
            account_id,
            child_net_code
        }, httpOptions)

    }
    // downAdsAdType(strtdate: any, enddate: any, uniq_id: any, adsense_id: any) {
    //     var t = localStorage.getItem('access_token');
    //     var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
    //     const httpOptions = {
    //         headers: headers_object
    //     };
    //     return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/user/adsense/download-ads-adtype.php', {
    //         uniq_id,
    //         strtdate,
    //         enddate,
    //         adsense_id
    //     }, httpOptions)

    // }
}