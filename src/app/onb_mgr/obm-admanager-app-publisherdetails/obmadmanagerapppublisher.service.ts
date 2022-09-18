import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { AppSettings } from '../../global/app-url';

interface myData {
  data: any,
  status_code: string
}

interface myAppData {
  data: any,
  verticals: any,
  status_code: string
}

@Injectable({
  providedIn: 'root'
})

export class ObmadmanagerapppublisherService {

  constructor(private http: HttpClient) { }

  getObmAdManagerAppPublisherData(uniq_id:any, email:any, pub_id:any, app_id:any) {
    var t = localStorage.getItem('access_token');
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
    const httpOptions = {
      headers: headers_object
    };

    return this.http.post<myAppData>(AppSettings.API_STARTPOINT+'/assets/api/admin/obm/app_form_get.php', {
      uniq_id,
      email,
      pub_id,
      app_id
    }, httpOptions).pipe(retry(1), catchError(this.handleError))
  }

  getObmAdManagerAppFormData(uniq_id:any, email:any, publisher_data:any) {
    var t = localStorage.getItem('access_token');
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
    const httpOptions = {
      headers: headers_object
    };

    return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/obm/app_form_post.php', publisher_data, httpOptions).pipe(retry(1), catchError(this.handleError))
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
