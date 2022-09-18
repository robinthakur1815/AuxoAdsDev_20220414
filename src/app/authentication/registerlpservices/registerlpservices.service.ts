import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { RegisterLpServicesComponent } from './registerlpservices.component';
import { AppSettings } from '../../global/app-url';
interface myData {
    data: any,
    status_code: string
}


@Injectable({
    providedIn: 'root'
})
export class RegisterLpPubService {
   
constructor(private http: HttpClient) {

    }

    
    getPubServices() {
        
        return this.http.get(AppSettings.API_STARTPOINT+'/assets/api/admin/common/services.php')

    }
    postSerData(service_id:any,uniq_id:any,comment:any) {
     
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/auth/publisher_services.php', {
           service_id,
           uniq_id,
           comment
         
        })

    }
}