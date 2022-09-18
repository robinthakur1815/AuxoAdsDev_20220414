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

export class ObmadmanagerappService {

  constructor(private http: HttpClient) { }

  getObmManagerAppData(uniq_id:any,email:any) {
    var t = localStorage.getItem('access_token');
    var role_id = localStorage.getItem('role_id');
    var sales_id = localStorage.getItem('sales_id');
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
    const httpOptions = {
      headers: headers_object
    };

    return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/obm/manager_app_listing.php', {
      uniq_id,
      email,
      role_id,
      sales_id
    }, httpOptions).pipe(retry(1), catchError(this.handleError));
  }

  setObmManagerAppStatus(publisher_data:any) {
    var t = localStorage.getItem('access_token');
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
    const httpOptions = {
      headers: headers_object
    };

    return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/obm/app_status_update.php', publisher_data, httpOptions).pipe(retry(1), catchError(this.handleError));
  }

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
