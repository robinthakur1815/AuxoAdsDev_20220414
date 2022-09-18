import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { RegisterLpComponent } from './registerlp.component';
import { AppSettings } from '../../global/app-url';
interface myData {
    data: any,
    status_code: string
}


@Injectable({
    providedIn: 'root'
})
export class RegisterLpService {
   
constructor(private http: HttpClient) {

    }

    
    getCountry() {
        
        return this.http.get(AppSettings.API_STARTPOINT+'/assets/api/admin/common/get_country.php')

    }
    postSignup(email:any,password:any,f_name:any,l_name:any,domain:any,country_code:any,contact:any,business_type:any) {
     
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/auth/signup.php', {
           email,
           password,
           f_name,
           l_name,
           domain,
           country_code,
           contact,
           business_type
        })

    }
}