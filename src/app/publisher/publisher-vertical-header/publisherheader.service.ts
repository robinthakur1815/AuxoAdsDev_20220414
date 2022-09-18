import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { AppSettings } from '../../global/app-url';

interface invoceListsData {
    data: any,
    status_code: string
}

@Injectable({
    providedIn: 'root'
})

export class HeaderService {
    constructor(private http: HttpClient) {}

    public getInvoicenotify(uniq_id: any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<invoceListsData>(AppSettings.API_STARTPOINT+'/assets/api/admin/user/invoice/header_notify.php', {
            uniq_id,
        }, httpOptions)
        // return this.invoiceList;
    }
    getHeaderRev(uniq_id: any,child_net_code:any,old_acc_name:any,new_acc_name:any,ads_id:any,) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<invoceListsData>(AppSettings.API_STARTPOINT+'/assets/api/admin/user/header_revenue.php', {
            uniq_id,
            child_net_code,
            old_acc_name,
            new_acc_name,
            ads_id
        }, httpOptions)
        
    }
    getPubService(uniq_id:any,email:any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<invoceListsData>(AppSettings.API_STARTPOINT+'/assets/api/admin/user/inventory_settings.php', {
           uniq_id,
           email
        }, httpOptions)

    }
  postInvenSerData(uniq_id:any,service_id:any,email:any,newsletter:any,name:any,old_service:any,servFalseArr:any) {
      var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<invoceListsData>(AppSettings.API_STARTPOINT+'/assets/api/admin/user/publisher_services_inventory.php', {
           uniq_id,
           service_id,
           email,
           newsletter,
           name,
           old_service,
           servFalseArr
         
        },httpOptions)

    }
}