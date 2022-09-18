import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { DashboardOverviewComponent } from './dashboard-overview.component';
import { AppSettings } from '../../global/app-url';
interface myData {
    data: any,
    status_code: string
}


@Injectable({
    providedIn: 'root'
})
export class AdminOverviewService {
   
constructor(private http: HttpClient) {

    }

    
    getAccountsHandlingData(uniq_id:any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/backend-admin/Total_Handling_Accounts.php', {
           uniq_id
        }, httpOptions)

    }
  getAdxMovData(uniq_id:any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/backend-admin/overview_adx_pub.php', {
           uniq_id
        }, httpOptions)

    }
    getAdsMovData(uniq_id:any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/backend-admin/overview_adsense_pub.php', {
           uniq_id
        }, httpOptions)

    }

    getAccManagerData(uniq_id:any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/backend-admin/account_manager_dash.php', {
           uniq_id
        }, httpOptions)

    }
    //getOverviewData(uniq_id:any,accounts:any,pub_id:any,manager_id:any,filter:any,child_net_code:any,web_name:any,days:any,strtdate:any,enddate:any) {
    getOverviewData(uniq_id:any,manager_id:any,filter:any,child_net_code:any,accounts:any,days:any,strtdate:any,enddate:any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };

        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/backend-admin/overview_dash.php', {
           uniq_id,
           manager_id,
           filter,
           child_net_code,
           accounts,
           days,
           strtdate,
           enddate
        }, httpOptions)

    }
    
}
