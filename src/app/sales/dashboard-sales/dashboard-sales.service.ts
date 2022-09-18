import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { DashboardSalesComponent } from './dashboard-sales.component';
import { AppSettings } from '../../global/app-url';
interface myData {
    data: any,
    status_code: string
}


@Injectable({
    providedIn: 'root'
})
export class SalesDashboardservice {
   
constructor(private http: HttpClient) {

    }
  
  getQtdPerformance(uniq_id:any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/sales/get_qtddashboard.php', {
            uniq_id
        }, httpOptions)

    }
  getOverallEarnData(uniq_id:any,strtdate:any,enddate:any) {
        var t = localStorage.getItem('access_token');
        var a = localStorage.getItem('role_id');
        
        if(a.trim() != "8"){
        
          var sales_id = "";
       
          }else{
           var sales_id = localStorage.getItem('sales_id');
            
          }
          
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/sales/get_salesrevenue.php', {
            uniq_id,
            strtdate,
            enddate,
            sales_id
        }, httpOptions)

    }
getOverallDownloadData(uniq_id:any,strtdate:any,enddate:any) {
        var t = localStorage.getItem('access_token');
        var a = localStorage.getItem('role_id');
        
        if(a.trim() != "8"){
        
          var sales_id = "";
       
          }else{
           var sales_id = localStorage.getItem('sales_id');
            
          }
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/sales/get_salesrevenue_download.php', {
            uniq_id,
            strtdate,
            enddate,
            sales_id
        }, httpOptions)

    }
    getSalesDownloadData(uniq_id:any,strtdate:any,enddate:any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/sales/salesrep_overview_download.php', {
            uniq_id,
            strtdate,
            enddate
        }, httpOptions)

    }
    getOverallPubEarnData(uniq_id:any,strtdate:any,enddate:any) {
        var t = localStorage.getItem('access_token');
        var a = localStorage.getItem('role_id');
        
        if(a.trim() != "8"){
        
          var sales_id = "";
       
          }else{
           var sales_id = localStorage.getItem('sales_id');
            
          }
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/sales/top15_adx_revenue_contributors.php', {
            uniq_id,
            strtdate,
            enddate,
            sales_id
        }, httpOptions)

    }
   getPubDownloadData(uniq_id:any,strtdate:any,enddate:any) {
        var t = localStorage.getItem('access_token');
        var a = localStorage.getItem('role_id');
        
        if(a.trim() != "8"){
        
          var sales_id = "";
       
          }else{
           var sales_id = localStorage.getItem('sales_id');
            
          }
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/sales/pub_revenue_download.php', {
            uniq_id,
            strtdate,
            enddate,
            sales_id
        }, httpOptions)

    }
    getSalesTeamOverviewData(uniq_id:any,strtdate:any,enddate:any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/sales/salesrep_overview.php', {
            uniq_id,
            strtdate,
            enddate
        }, httpOptions)

    }

    getSalesNetRevData(uniq_id:any,strtdate:any,enddate:any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/sales/sales_repnetrev.php', {
            uniq_id,
            strtdate,
            enddate
        }, httpOptions)

    }
    getSalesChanRevData(uniq_id:any,strtdate:any,enddate:any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/sales/breakupofchannelroi.php', {
            uniq_id,
            strtdate,
            enddate
        }, httpOptions)

    }
    getAdxAccountWiseData(uniq_id:any,strtdate:any,enddate:any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/sales/adx_accountwise.php', {
            uniq_id,
            strtdate,
            enddate
        }, httpOptions)

    }
    
}
