import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { AppSettings } from '../../global/app-url';

interface invoceListsData {
    data: any,
    status_code: string
}

@Injectable({
    providedIn: 'root'
})

export class AdminHeaderService {
    constructor(private http: HttpClient) {}

}