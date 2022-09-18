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
export class PaymentHistoryStatusService {
    constructor(private http: HttpClient) {}

    getPubPayHisList(pub_uniq_id:any){
        var t = localStorage.getItem('access_token'); 
        var uniq_id = localStorage.getItem('uniq_id');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post(AppSettings.API_STARTPOINT+'/assets/api/admin/backend-admin/view_history.php', {
            uniq_id,
            pub_uniq_id
         },httpOptions)
    }
    
}