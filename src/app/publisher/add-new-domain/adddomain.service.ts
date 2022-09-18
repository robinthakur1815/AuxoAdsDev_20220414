import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { AddNewDomainComponent } from './add-new-domain.component';
import { AppSettings } from '../../global/app-url';
interface myData {
    data: any,
    status_code: string
}


@Injectable({
    providedIn: 'root'
})
export class AddDomainService {
   
constructor(private http: HttpClient) {

    }

    
    getGamData(uniq_id:any,email:any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/user/gam-invite/fetch_gem_publisher.php', {
           uniq_id,
           email
        }, httpOptions)

    }
   postInvite(uniq_id:any,domainName:any,email:any,gamAcc:any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/user/gam-invite/gamPubInvite.php', {
           uniq_id,
           domainName,
           email,
           gamAcc
        }, httpOptions)

    }
    postDomain(uniq_id:any,domainName:any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/user/gam-invite/gamPubInvite.php', {
           uniq_id,
           domainName
        }, httpOptions)

    }
      postApp(uniq_id:any,memberType:any,appName:any,appID:any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/user/gam-invite/appPubInvite.php', {
           uniq_id,
           memberType,
           appName,
           appID
        }, httpOptions)

    }
    getApiDocData(uniq_id:any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/user/tools/api-docs.php', {
           uniq_id
        }, httpOptions)

    }
    getApiDocDataPdf(uniq_id:any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        headers_object.set("Accept", "application/octet-stream");
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/user/tools/apidocpdf.php', {
           uniq_id

        }, httpOptions)

    }
    // downloadPdfName(){

    // }

    public downloadPdfName(uniq_id: any){
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/user/tools/apidocpdf.php', {
            uniq_id
        }, httpOptions)
    }
    
}
