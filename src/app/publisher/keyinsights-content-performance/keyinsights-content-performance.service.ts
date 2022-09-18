import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { KeyinsightsContentPerformanceComponent } from './keyinsights-content-performance.component';
import { AppSettings } from '../../global/app-url';
interface myData {
    data: any,
    status_code: string
}


@Injectable({
    providedIn: 'root'
})
export class KeyinsightsContentPerformanceService {
   
constructor(private http: HttpClient) {

    }

    getcontentPerformanceService(account_id: any, child_net_code: any, uniq_id: any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/user/key-insights/content_insights.php', {
            account_id,
            child_net_code,
            uniq_id
        }, httpOptions)

    }
    getheatmapdatawithurl(account_id: any, child_net_code: any, uniq_id: any){
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/user/key-insights/heatmap.php', {
            account_id,
            child_net_code,
            uniq_id
        }, httpOptions)
    }
    getheatmapdata(account_id: any, path: any, uniq_id: any){
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/user/key-insights/heatmapdata.php', {
            account_id,
            path,
            uniq_id
        }, httpOptions)
    }
}
