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
export class DirectDealService {
    constructor(private http: HttpClient) {}

    getDirectDealList(){
        var t = localStorage.getItem('access_token');
        var uniq_id = localStorage.getItem('uniq_id');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post(AppSettings.API_STARTPOINT+'/assets/api/admin/deals/getdirectdeals.php', {
            uniq_id,
         },httpOptions)
    }
    directExpUpdate(direct_expense:any,order_id:any){
        var t = localStorage.getItem('access_token');
        var uniq_id = localStorage.getItem('uniq_id');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post(AppSettings.API_STARTPOINT+'/assets/api/admin/deals/direct_exp_update.php', {
            uniq_id,
            direct_expense,
            order_id
         },httpOptions)
    }
}