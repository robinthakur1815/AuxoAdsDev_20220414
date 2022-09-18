import { Component, ViewChild, AfterViewInit, OnInit} from '@angular/core';
import { DatePipe } from '@angular/common'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {HttpClient} from '@angular/common/http';

import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SalesDialogDynamicComponent } from '../sales-dialog-dynamic/sales-dialog-dynamic.component';
import { ObmadmanagerService } from './obmadmanager.service';

@Component({
      selector: 'app-obm-admanager-invite',
      templateUrl: './obm-admanager-invite.component.html',
      styleUrls: ['./obm-admanager-invite.component.scss']
    })

export class OBMAdmanagerComponent implements OnInit {

    public message: string;
    public isSpinnerVisible: boolean = false;

    displayedColumns: string[] = ['name',  'pub_email', 'onboarddate', 'company_id', 'child_net_code', 'mcm_status','tag_status'];

    dataSource: MatTableDataSource<any>;
    publisherData:any;

    constructor(private restAPI:ObmadmanagerService, public dialog: MatDialog, private router: Router, private http : HttpClient, public datepipe: DatePipe) {}

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
    @ViewChild(MatSort, { static: true }) sort: MatSort = Object.create(null);

    ngOnInit() {
        this.loadObmAdManager();
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
    //     let formatLink = '<a href="/obm-admanager-invite-publisherdetails?publisherid='+this.publisherData[keyid].pub_id+'" target="_blank" class="link login-weight colorblackky">'+this.publisherData[keyid].name+'</a>';
    //     return formatLink;
    // }

    loadObmAdManager() {
        this.isSpinnerVisible = true;
        return this.restAPI.getObmManagerData(localStorage.getItem('uniq_id'),localStorage.getItem('useremail')).subscribe((response)=>{

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

    publisherSplitService(serviceValue: string){
        let serviceArr = serviceValue.split(',');
        let formatData = "";
        if(serviceArr.length>0){
            for(var i=0; i<serviceArr.length; i++){
                formatData += '<p>'+serviceArr[i]+'</p>';
            }
        }else{
            formatData += '<p>--</p>';
        }
        return formatData;
    }

}
