import { Component, ViewChild, AfterViewInit, OnInit} from '@angular/core';
import { DatePipe } from '@angular/common'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {HttpClient} from '@angular/common/http';

import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDynamicComponent } from 'src/app/publisher/dialog-dynamic/dialog-dynamic.component';
import { ObmadmanagerappService } from './obmadmanagerapp.service';

@Component({
      selector: 'app-obm-admanager-app',
      templateUrl: './obm-admanager-app.component.html',
      styleUrls: ['./obm-admanager-app.component.scss']
    })

export class OBMAdmanagerAppComponent implements OnInit {

    public message: string;
    public isSpinnerVisible: boolean = false;
    //public publisherAppStatus: string;

    displayedColumns: string[] = ['name', 'onboarddate', 'child_net_code', 'app_name', 'status', 'tag_status'];

    dataSource: MatTableDataSource<any>;
    publisherData:any;

    pubAppStatus: any = ['Approved', 'Disapproved', 'Pending'];

    constructor(private restAPI:ObmadmanagerappService, public dialog: MatDialog, private router: Router, private http : HttpClient, public datepipe: DatePipe) {}

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
    @ViewChild(MatSort, { static: true }) sort: MatSort = Object.create(null);


    ngOnInit() {
        this.loadObmAdManagerAppList();
    }

    loadObmAdManagerAppList() {
        this.isSpinnerVisible = true;
        return this.restAPI.getObmManagerAppData(localStorage.getItem('uniq_id'),localStorage.getItem('useremail')).subscribe((response)=>{

            if(response['status_code']=='200'){

                this.publisherData = response.data;
                this.dataSource = new MatTableDataSource(this.publisherData);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;

                this.isSpinnerVisible = false;

            }else{

                this.message = "Token is expired, Please login again!!";
                this.dialog.open(DialogDynamicComponent,
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
    //     let formatLink = '<a href="/obm-admanager-app-publisherdetails?publisherid='+this.publisherData[keyid].pub_id+'&appid='+this.publisherData[keyid].app_id+'" target="_blank" class="link login-weight colorblackky">'+this.publisherData[keyid].name+'</a>';
    //     return formatLink;
    // }

    getPublisherAppStatus(event: any, rowid: any){

        this.isSpinnerVisible = true;

        let app_id = this.publisherData[rowid].app_id;
        let status = event.value;

        const publisher_data: any = 
        {
            "obm_uniq_id":localStorage.getItem('uniq_id'),
            "app_id": app_id,
            "app_status": status
        };

        return this.restAPI.setObmManagerAppStatus(publisher_data).subscribe((response)=>{

            if(response['status_code']=='200'){

                this.message = response['message'];
                this.dialog.open(DialogDynamicComponent,
                {
                    width: '450px',
                    data: {message:this.message}
                });
                this.isSpinnerVisible = false;

            }else{

                this.message = "Token is expired, Please login again!!";
                this.dialog.open(DialogDynamicComponent,
                {
                    width: '450px',
                    data: {message:this.message}
                });

                this.isSpinnerVisible = false;
            }
        });

        
    }
}
