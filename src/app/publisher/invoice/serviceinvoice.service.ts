import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { InvoiceList } from './invoice';
import { invoceLists } from './invoice-data';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { AppSettings } from '../../global/app-url';

interface invoceListsData {
    data: any,
    status_code: string
}

@Injectable({
    providedIn: 'root'
})
export class ServiceinvoiceService {

    private invoiceList: InvoiceList[] = [];

    private getInvoice() {
        return from(invoceLists);
    }

    constructor(private http: HttpClient) {
        this.getInvoice().subscribe((data) =>
            this.invoiceList.push(data)
        );
    }



    public getInvoiceList(uniq_id: any, child_net_code: any) {
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<invoceListsData>(AppSettings.API_STARTPOINT+'/assets/api/admin/user/invoice/invoice_list.php', {
            uniq_id,
            child_net_code
        }, httpOptions)
        // return this.invoiceList;
    }
    public viewInvoiceList(month_year:any,uniq_id: any, child_net_code: any){
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<invoceListsData>(AppSettings.API_STARTPOINT+'/assets/api/admin/user/invoice/invoice_view.php', {
            month_year,
            uniq_id,
            child_net_code
        }, httpOptions)
    }

    public approveInvoice(manager_id:any,pub_uniq_id: any, month: any,invoice_date:any,invoice_number: any, child_net_code: any){
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<invoceListsData>(AppSettings.API_STARTPOINT+'/assets/api/admin/user/invoice/invoice_approve.php', {
            manager_id,
            pub_uniq_id,
            month,
            invoice_date,
            invoice_number,
            child_net_code
        }, httpOptions)
    }
    public downloadInvoiceName(manager_id:any,pub_uniq_id: any, month: any,invoice_date:any,invoice_number: any, child_net_code: any){
        var t = localStorage.getItem('access_token');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
        const httpOptions = {
            headers: headers_object
        };
        return this.http.post<invoceListsData>(AppSettings.API_STARTPOINT+'/assets/api/admin/user/invoice/invoice_download.php', {
            manager_id,
            pub_uniq_id,
            month,
            invoice_date,
            invoice_number,
            child_net_code
        }, httpOptions)
    }

    public getInvoiceList1() {
        return this.invoiceList;
    }
    public deleteInvoice(id: number) {
        this.invoiceList = this.invoiceList.filter(CId => CId.id !== id);
    }
    public addInvoice(invoice: InvoiceList) {
        this.invoiceList.splice(0,0,invoice);
    }
    public updateInvoice(id: number, invoice: InvoiceList) {
        let element = this.invoiceList.filter(x => x.id === id);
        let index:number = this.invoiceList.indexOf(element[0]);
        this.invoiceList[index] = invoice;
    }
}
