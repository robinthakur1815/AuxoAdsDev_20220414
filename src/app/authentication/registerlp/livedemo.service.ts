import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from '../../global/app-url';

interface myData {
    success: boolean,
    pub_name: string
    
  }
@Injectable({
    providedIn: 'root'
  })
  export class Livedemo {
    public errorMsg;
    private loggedInStatus = false
  
    constructor(private http: HttpClient) { }

    liveDemoDetails(name: any, email: any,message:any) {
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/auth/livedemo.php', {
          name,
          email,
          message
        })
    }
    newsletterDetails(name: any, email: any) {
        return this.http.post<myData>(AppSettings.API_STARTPOINT+'/assets/api/admin/common/newsletter.php', {
          name,
          email
        })
    }
  }