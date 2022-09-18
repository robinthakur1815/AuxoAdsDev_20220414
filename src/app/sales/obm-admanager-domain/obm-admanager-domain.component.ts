import { Component, ViewChild, AfterViewInit, OnInit} from '@angular/core';
import { DatePipe } from '@angular/common'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {HttpClient} from '@angular/common/http';

import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SalesDialogDynamicComponent } from '../sales-dialog-dynamic/sales-dialog-dynamic.component';
import { ObmadmanagerdomainService } from './obmadmanagerdomain.service';

@Component({
    selector: 'app-obm-admanager-domain',
    templateUrl: './obm-admanager-domain.component.html',
    styleUrls: ['./obm-admanager-domain.component.scss']
})

export class OBMAdmanagerDomainComponent implements OnInit {

    public message: string;
    public isSpinnerVisible: boolean = false;

    displayedColumns: string[] = ['name',  'onboarddate', 'company_id', 'child_net_code', 'site_id', 'web_name', 'web_status', 'tag_status'];

    dataSource: MatTableDataSource<any>;
    publisherData:any;

    constructor(private restAPI:ObmadmanagerdomainService, public dialog: MatDialog, private router: Router, private http : HttpClient, public datepipe: DatePipe) {}

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
    @ViewChild(MatSort, { static: true }) sort: MatSort = Object.create(null);


    ngOnInit() {
        this.loadObmAdManagerDomainList();
    }

    loadObmAdManagerDomainList() {
        this.isSpinnerVisible = true;
        return this.restAPI.getObmManagerDomainData(localStorage.getItem('uniq_id'),localStorage.getItem('useremail')).subscribe((response)=>{

            if(response['status_code']=='200'){

                this.publisherData = response.data;
                this.dataSource = new MatTableDataSource(this.publisherData);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;

                this.isSpinnerVisible = false;

            }else{

                this.message = "Token is expired, Please login again!!";
                this.dialog.open(SalesDialogDynamicComponent,
                {
                    width: '450px',
                    data: {message:this.message}
                });

                //this.router.navigate(['/logout']);

                this.publisherData = [];
                this.dataSource = new MatTableDataSource(this.publisherData);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;

                this.isSpinnerVisible = false;
            }
        });
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
    }

    formatOnBoardDate(boardDate: string){
        let formatDate = "--";
        if(boardDate != "0000-00-00"){
            formatDate =this.datepipe.transform(boardDate, 'd MMM, y');
        }
        return formatDate;
    }

    // getPublisherDetailsLink(keyid: number){
    //     let formatLink = '<a href="/obm-admanager-domain-publisherdetails?publisherid='+this.publisherData[keyid].pub_id+'&domainid='+this.publisherData[keyid].domain_id+'" target="_blank" class="link login-weight colorblackky">'+this.publisherData[keyid].name+'</a>';
    //     return formatLink;
    // }

}

