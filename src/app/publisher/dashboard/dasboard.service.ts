import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AppSettings } from '../../global/app-url';
interface myData {
    data: any,
    status_code: string
}


@Injectable({
    providedIn: 'root'
})
export class dashboardService {
    public usertype: any;
    private _url: string = "";

    constructor(private http: HttpClient) {

    }
    dashboardTopBox(uniq_id: any, child_net_code: any,range:any,strtdate:any,enddate:any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/user/dashboard/dash_top_box.php', {
            uniq_id,
            child_net_code,
            range,
            strtdate,
            enddate
        }, httpOptions)

    }
    dashboardEarnCPMTrend(uniq_id: any, child_net_code: any,range:any,strtdate:any,enddate:any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/user/dashboard/dash_cpmtrend.php', {
            uniq_id,
            child_net_code,
            range,
            strtdate,
            enddate
        }, httpOptions)

    }
    dashboardPageViews(uniq_id: any, child_net_code: any,range:any,strtdate:any,enddate:any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/user/dashboard/dash_pageviews.php', {
            uniq_id,
            child_net_code,
            range,
            strtdate,
            enddate
        }, httpOptions)

    }
    dashboardUnfilledTrend(uniq_id: any, child_net_code: any,range:any,strtdate:any,enddate:any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/user/dashboard/dash_unfilledtrend.php', {
            uniq_id,
            child_net_code,
            range,
            strtdate,
            enddate
        }, httpOptions)

    } 
    dashboardAdTypes(uniq_id: any, child_net_code: any,range:any,strtdate:any,enddate:any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/user/dashboard/dash_adtype.php', {
            uniq_id,
            child_net_code,
            range,
            strtdate,
            enddate
        }, httpOptions)

    } 
    dashboardBanchmark(uniq_id: any, analytics_id: any,range:any,strtdate:any,enddate:any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/user/dashboard/dash_benchmark.php', {
            uniq_id,
            analytics_id,
            range,
            strtdate,
            enddate
        }, httpOptions)

    } 
    dashboardAdvertiserTrend(uniq_id: any, analytics_id: any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/user/dashboard/trend.php', {
            uniq_id,
            analytics_id
        }, httpOptions)

    } 
    bankDetailStripfn() {
        var uniq_id = localStorage.getItem('uniq_id');
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/user/bank/get_bankdetail.php', {
            uniq_id
        }, httpOptions)

    } 
}