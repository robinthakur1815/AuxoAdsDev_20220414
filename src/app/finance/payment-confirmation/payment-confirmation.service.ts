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
export class PaymentConfrmService {
    constructor(private http: HttpClient) {}

    getInvoiceList(month_year:any){
        var t = localStorage.getItem('access_token'); 
        var uniq_id = localStorage.getItem('uniq_id');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };

        return this.http.post(AppSettings.API_STARTPOINT+'/assets/api/admin/backend-admin/payments.php', {
            uniq_id,
            month_year
         },httpOptions)
    }
    updateInvStatus(pub_uniq_id:any,invoice_id:any,month:any){
        var t = localStorage.getItem('access_token'); 
        var uniq_id = localStorage.getItem('uniq_id');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };

        return this.http.post(AppSettings.API_STARTPOINT+'/assets/api/admin/backend-admin/payment_status.php', {
            uniq_id,
            pub_uniq_id,
            invoice_id,
            month
         },httpOptions)
    }
    exportInvoiceList(month_year:any){
        var t = localStorage.getItem('access_token'); 
        var uniq_id = localStorage.getItem('uniq_id');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post(AppSettings.API_STARTPOINT+'/assets/api/admin/backend-admin/payment_download.php', {
            uniq_id,
            month_year
         },httpOptions)
    }
}