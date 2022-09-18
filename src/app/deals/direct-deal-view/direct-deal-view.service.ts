import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { AppSettings } from '../../global/app-url';

interface myData {
    success: boolean,
    pub_name: string
    
  }
@Injectable({
    providedIn: 'root'
})
export class DirectDealViewService {
    constructor(private http: HttpClient) {}

    getDirectDealOrderList(order_id){
        var t = localStorage.getItem('access_token');
        var uniq_id = localStorage.getItem('uniq_id');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post(AppSettings.API_STARTPOINT+'/assets/api/admin/deals/getddorder.php', {
            uniq_id,
            order_id
         },httpOptions)
    }
    eCPMUpdate(ecpm:any,order_id:any,adunit_id:any,campaign_date:any){
        var t = localStorage.getItem('access_token');
        var uniq_id = localStorage.getItem('uniq_id');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post(AppSettings.API_STARTPOINT+'/assets/api/admin/deals/ecpm_update.php', {
            uniq_id,
            ecpm,
            order_id,
            adunit_id,
            campaign_date
         },httpOptions)
    }
    eCPMAllUpdate(ecpm:any,order_id:any){
        var t = localStorage.getItem('access_token');
        var uniq_id = localStorage.getItem('uniq_id');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post(AppSettings.API_STARTPOINT+'/assets/api/admin/deals/ecpm_all_update.php', {
            uniq_id,
            ecpm,
            order_id,
         },httpOptions)
    }
    downloadReport(order_id:any){
        var t = localStorage.getItem('access_token');
        var uniq_id = localStorage.getItem('uniq_id');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post(AppSettings.API_STARTPOINT+'/assets/api/admin/deals/download_report.php', {
            uniq_id,
            order_id,
         },httpOptions)
    }
}