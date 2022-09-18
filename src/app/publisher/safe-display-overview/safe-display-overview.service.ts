import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { SafeDisplayOverviewComponent } from './safe-display-overview.component';
import { AppSettings } from '../../global/app-url';
interface myData {
    data: any,
    status_code: string
}


@Injectable({
    providedIn: 'root'
})
export class mcmDisplayOverviewService {
    public usertype: any;
    private _url: string = "";

    constructor(private http: HttpClient) {

    }

    getAdxcontentoverview(strtdate: any, enddate: any, uniq_id: any, child_net_code: any, range: any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/user/cyberads/display/overview.php', {
            strtdate,
            enddate,
            uniq_id,
            child_net_code,
            range
        }, httpOptions)

    } 

    downSafeOverview(strtdate: any, enddate: any, uniq_id: any, child_net_code: any,range:any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/user/cyberads/display/download-display-overview.php', {
            strtdate,
            enddate,
            uniq_id,
            child_net_code,
            range
        }, httpOptions)

    }
}