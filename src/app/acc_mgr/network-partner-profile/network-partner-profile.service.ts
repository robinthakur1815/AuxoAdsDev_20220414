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
export class PartnerProfileService {
    constructor(private http: HttpClient) {}

    getpubProfile(pub_id:any){
        var t = localStorage.getItem('access_token');
        var uniq_id = localStorage.getItem('uniq_id');
        var manager_id = localStorage.getItem('manager_id');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };

        return this.http.post(AppSettings.API_STARTPOINT+'/assets/api/admin/acc_mgr/pub_profile.php', {
            uniq_id,
            manager_id,
            pub_id
         },httpOptions)
    }
   
}