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
export class AccmgrOverviewService {
   
constructor(private http: HttpClient) {

    }

    
    getAdxReportsData(uniq_id:any,manager_id:any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/acc_mgr/accmgr_top_data.php', {
           uniq_id,
           manager_id
        }, httpOptions)

    }
  getAdxMovData(uniq_id:any,manager_id:any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/acc_mgr/overview_adx_pub.php', {
           uniq_id,
           manager_id
        }, httpOptions)

    }
    getAdsMovData(uniq_id:any,manager_id:any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/acc_mgr/overview_adsense_pub.php', {
           uniq_id,
           manager_id
        }, httpOptions)

    }
    getPerfData(uniq_id:any,accounts:any,pub_id:any,manager_id:any,filter:any,child_net_code:any,web_name:any,days:any,strtdate:any,enddate:any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };

        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/acc_mgr/overview_performance.php', {
           uniq_id,
           accounts,
           pub_id,
           manager_id,
           filter,
           child_net_code,
           web_name,
           days,
           strtdate,
           enddate,
        }, httpOptions)

    }
    
}
