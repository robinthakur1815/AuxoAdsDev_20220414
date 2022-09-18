import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { SafeAppOverviewComponent } from './safe-app-overview.component';
import { AppSettings } from '../../global/app-url';
interface myData {
    data: any,
    status_code: string
}


@Injectable({
    providedIn: 'root'
})
export class SafeAppOverviewService {
    public usertype: any;
    private _url: string = "";

    constructor(private http: HttpClient) {

    }

    getAdxcontentoverview(strtdate: any, enddate: any, uniq_id: any, child_net_code: any,range:any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/user/cyberads/app/overview.php', {
            strtdate,
            enddate,
            uniq_id,
            child_net_code,
            range
        }, httpOptions)

    }
    downSafeAppOverview(strtdate: any, enddate: any, uniq_id: any, child_net_code: any,range:any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/user/cyberads/app/download-app-overview.php', {
            strtdate,
            enddate,
            uniq_id,
            child_net_code,
            range
        }, httpOptions)

    }

}