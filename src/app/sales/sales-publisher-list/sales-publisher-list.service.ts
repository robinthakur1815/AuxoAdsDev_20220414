import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { SalesNetworkPartnerComponent } from './sales-publisher-list.component';
import { AppSettings } from '../../global/app-url';
interface myData {
    data: any,
    status_code: string
}


@Injectable({
    providedIn: 'root'
})
export class SalesPubListservice {
   
constructor(private http: HttpClient) {

    }

    getPubListData(uniq_id:any,strtdate:any,enddate:any,pub_type:any,days:any,saleschannel:any,status:any,sales_id_team:any) {
        var t = localStorage.getItem('access_token');
        var a = localStorage.getItem('role_id');
        
        if(a.trim() != "8"){
        
          var sales_id:any = sales_id_team;
       
          }else{
           var sales_id:any = localStorage.getItem('sales_id');
            
          }
         
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/sales/partners.php', {
            uniq_id,
            strtdate,
            enddate,
            pub_type,
            days,
            sales_id,
            saleschannel,
            status
        }, httpOptions)

    }
    getPubListDownData(uniq_id:any,strtdate:any,enddate:any,pub_type:any,days:any,saleschannel:any,status:any,sales_id_team:any) {
        var t = localStorage.getItem('access_token');
        var a = localStorage.getItem('role_id');
        
        if(a.trim() != "8"){
        
          var sales_id:any = sales_id_team;
       
          }else{
           var sales_id:any = localStorage.getItem('sales_id');
            
          }
         
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/sales/partners_download.php', {
            uniq_id,
            strtdate,
            enddate,
            pub_type,
            days,
            sales_id,
            saleschannel,
            status
        }, httpOptions)

    }
    
}
