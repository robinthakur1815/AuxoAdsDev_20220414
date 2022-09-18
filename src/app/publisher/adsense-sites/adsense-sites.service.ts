import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { AdsenseSitesComponent } from './adsense-sites.component';
import { AppSettings } from '../../global/app-url';
interface myData {
    data: any,
    status_code: string
}


@Injectable({
    providedIn: 'root'
})
export class AdsenseSitesService {
    public usertype: any;
    private _url: string = "";

    constructor(private http: HttpClient) {

    }

    getAdsSites( uniq_id: any,strtdate: any, enddate: any, adsense_id: any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/user/adsense/sites.php', {
            uniq_id,
            strtdate,
            enddate,
            adsense_id
        }, httpOptions)

    }
    downAdsSites(strtdate: any, enddate: any, uniq_id: any, adsense_id: any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/user/adsense/download-ads-sites.php', {
            uniq_id,
            strtdate,
            enddate,
            adsense_id
        }, httpOptions)

    }
}