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
export class BankdetailService {
    constructor(private http: HttpClient) {}

    getCountry() {
        return this.http.get(AppSettings.API_STARTPOINT+'/assets/api/admin/common/get_country.php')
    }
    getState() {
        return this.http.get(AppSettings.API_STARTPOINT+'/assets/api/admin/common/get_state.php')
    }
    getbankDetail(){
        var t = localStorage.getItem('access_token');
        var uniq_id = localStorage.getItem('uniq_id');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };

        return this.http.post(AppSettings.API_STARTPOINT+'/assets/api/admin/user/bank/get_bankdetail.php', {
            uniq_id
         },httpOptions)
    }
   
}