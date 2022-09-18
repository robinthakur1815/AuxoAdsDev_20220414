import { Component, ViewChild, AfterViewInit, OnInit} from '@angular/core';
import { DatePipe } from '@angular/common'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BreakpointObserver } from '@angular/cdk/layout';
import {HttpClient} from '@angular/common/http';
import { ObmdashboardService } from './obmdashboard.service';

import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDynamicComponent } from 'src/app/publisher/dialog-dynamic/dialog-dynamic.component';

@Component({
    selector: 'app-obm-dashboard',
    templateUrl: './obm-dashboard.component.html',
    styleUrls: ['./obm-dashboard.component.scss']
})

export class OBMDashboardComponent implements OnInit {

    public message: string;
    public isSpinnerVisible: boolean = false;

    displayedColumns: string[] = ['name',  'pub_email', 'onboarddate', 'services', 'pub_display_share', 'mcm_status'];

    dataSource: MatTableDataSource<any>;
    publisherAccountList:any;

    constructor(private restAPI:ObmdashboardService, public dialog: MatDialog, private router: Router, private http : HttpClient, public datepipe: DatePipe) {}

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
    @ViewChild(MatSort, { static: true }) sort: MatSort = Object.create(null);

    ngOnInit() {
        this.loadObmDashboard();
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

    totalAdxCount: number;
    totalAdsenseCount : number;
    totalCyberadsCount: number;
    totalKeyinsightsCount: number;
    totalTrafficCount: number;
    totalActiveCount: number;
    totalInactiveCount: number;

    loadObmDashboard() {
        this.isSpinnerVisible = true;
        return this.restAPI.getObmDashboardData(localStorage.getItem('uniq_id'),localStorage.getItem('useremail')).subscribe((response)=>{

            if(response['status_code']=='200'){
                this.totalAdxCount = response.data.dataTop.adx;
                this.totalAdsenseCount = response.data.dataTop.adsense;
                this.totalCyberadsCount = response.data.dataTop.cyberads;
                this.totalKeyinsightsCount = response.data.dataTop.keyinsights;
                this.totalTrafficCount = response.data.dataTop.traffic;

                this.totalActiveCount = response.data.dataActive.active;
                this.totalInactiveCount = response.data.dataActive.inactive;

                this.publisherAccountList = response.data.dataTabular;

                this.dataSource = new MatTableDataSource(this.publisherAccountList);
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

                this.totalAdxCount = 0;
                this.totalAdsenseCount = 0;
                this.totalCyberadsCount = 0;
                this.totalKeyinsightsCount = 0;
                this.totalTrafficCount = 0;

                this.totalActiveCount = 0;
                this.totalInactiveCount = 0;

                this.publisherAccountList = [];
                this.dataSource = new MatTableDataSource(this.publisherAccountList);
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

    loadPublisherServiceData(serviceType: string){
        this.isSpinnerVisible = true;
        let serviceItem: any = { 'AdxData':2, 'AdSenseData':3, 'AuxoProData':5, 'KeyInSightData':7, 'TrafficData':8};
        let selectedServiceType = serviceItem[serviceType];

        return this.restAPI.getObmServiceDashboardData(localStorage.getItem('uniq_id'),localStorage.getItem('useremail'), selectedServiceType).subscribe((response)=>{

            if(response['status_code']=='200'){

                this.publisherAccountList = response.data.dataTabular;

                this.displayedColumns = ['name',  'pub_email', 'onboarddate', 'services', 'pub_display_share'];

                this.dataSource = new MatTableDataSource(this.publisherAccountList);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;

                this.isSpinnerVisible = false;

            }else{

                this.message = response['message'];
                this.dialog.open(DialogDynamicComponent,
                {
                    width: '450px',
                    data: {message:this.message}
                });

                //this.router.navigate(['/logout']);

                this.publisherAccountList = [];
                this.dataSource = new MatTableDataSource(this.publisherAccountList);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;

                this.isSpinnerVisible = false;
            }
        });


    }

}
