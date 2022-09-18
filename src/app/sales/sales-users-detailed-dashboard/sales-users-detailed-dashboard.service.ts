import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { SalesUsersDetailedDashboardComponent } from './sales-users-detailed-dashboard.component';
import { AppSettings } from '../../global/app-url';
interface myData {
    data: any,
    status_code: string
}


@Injectable({
    providedIn: 'root'
})
export class SalesUserservice {
   
constructor(private http: HttpClient) {

    }

    
    getSaleDetailedData(uniq_id:any,sales_id:any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/sales/get_salesusertop.php', {
            uniq_id,
            sales_id
        }, httpOptions)

    }
  
  getOverallEarnData(uniq_id:any,strtdate:any,enddate:any,sales_id:any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/sales/get_salesuserrevenue.php', {
            uniq_id,
            strtdate,
            enddate,
            sales_id
        }, httpOptions)

    }

    getOverallPubEarnData(uniq_id:any,strtdate:any,enddate:any,sales_id:any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/sales/top15_adx_revenue_salesuser.php', {
            uniq_id,
            strtdate,
            enddate,
            sales_id
        }, httpOptions)

    }
    
}
