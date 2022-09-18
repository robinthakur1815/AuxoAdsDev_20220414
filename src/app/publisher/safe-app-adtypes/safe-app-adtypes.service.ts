import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { SafeRevenueAppAdtypesComponent } from './safe-app-adtypes.component';
import { AppSettings } from '../../global/app-url';
interface myData {
    data: any,
    status_code: string
}


@Injectable({
    providedIn: 'root'
})
export class SafeRevenueAppAdtypesService {
   
constructor(private http: HttpClient) {

    }

    getSafeAppAdtypes(strtdate: any, enddate: any, uniq_id: any, child_net_code: any,range:any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/user/cyberads/app/ad_type.php', {
            strtdate,
            enddate,
            uniq_id,
            child_net_code,
            range
        }, httpOptions)

    }
    downSafeAppAdtypes(strtdate: any, enddate: any, uniq_id: any, child_net_code: any,range:any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/user/cyberads/app/download-app-adtypes.php', {
            strtdate,
            enddate,
            uniq_id,
            child_net_code,
            range
        }, httpOptions)

    }
}
