import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { AppSettings } from '../../global/app-url';

interface myData {
  data: any,
  status_code: string
}

@Injectable({
  providedIn: 'root'
})

export class ObmadmanagerdomainService {

  constructor(private http: HttpClient) { }

  getObmManagerDomainData(uniq_id:any,email:any) {
    var t = localStorage.getItem('access_token');
    var role_id = localStorage.getItem('role_id');
    var sales_id = localStorage.getItem('sales_id');
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
    const httpOptions = {
      headers: headers_object
    };

    return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/obm/manager_domain_listing.php', {
      uniq_id,
      email,
      role_id,
      sales_id
    }, httpOptions).pipe(retry(1), catchError(this.handleError));
  }

  // Error handling 
  handleError(error:any) {
    var errorMessage = "";
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }

}
