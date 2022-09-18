import { Injectable } from '@angular/core';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { PublisherToolsApiDocComponent } from './publisher-tools-api-doc.component';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { AppSettings } from '../../global/app-url';

interface myData {
  data: any,
  status_code: string
}

@Injectable({
  providedIn: 'root'
})
export class PublisherToolsApiDocService {

  constructor(private http: HttpClient) { }
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

getApivideoDataPdf(uniq_id:any) {
  var t = localStorage.getItem('access_token');
  var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
  headers_object.set("Accept", "application/octet-stream");
  const httpOptions = {
      headers: headers_object
  };
  return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/user/tools/api-docvedio.php', {
     uniq_id
  }, httpOptions)

}

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


