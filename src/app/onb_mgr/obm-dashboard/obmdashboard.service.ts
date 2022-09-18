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

export class ObmdashboardService {

  constructor(private http: HttpClient) { }

  getObmDashboardData(uniq_id:any,email:any) {
    var t = localStorage.getItem('access_token');
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
    const httpOptions = {
      headers: headers_object
    };

    return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/obm/dashboard.php', {
      uniq_id,
      email
    }, httpOptions).pipe(retry(1), catchError(this.handleError))
  }

  getObmServiceDashboardData(uniq_id:any, email:any, service_id:any) {
    var t = localStorage.getItem('access_token');
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
    const httpOptions = {
      headers: headers_object
    };

    return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/obm/dashboard.php', {
      uniq_id,
      email,
      service_id
    }, httpOptions).pipe(retry(1), catchError(this.handleError))
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
