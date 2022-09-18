import { Component, ViewChild, ViewEncapsulation, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BreakpointObserver } from '@angular/cdk/layout';

import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions, TooltipPosition } from '@angular/material/tooltip';
import { PartnerService } from './network-partner.service';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
declare var $: any;
import { AdminDialogDynamicComponent } from '../dialog-dynamic/admin-dialog-dynamic.component';
// Tooltip start
export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
    showDelay: 1000,
    hideDelay: 1000,
    touchendHideDelay: 1000,
};
// tool tip end

const COLORS = [
    '#27cb71e3',
    '#e94265',
    '#a9a9a9'
];

const NAMES = [
    'Disapproved_Duplicate_Account',
    'Approved',
    'Expired',
    'InActive'
];

const services = [

]

@Component({
    selector: 'app-network-partner',
    templateUrl: './network-partner.component.html',
    styleUrls: ['./network-partner.component.scss'],
    // Tooltip start
    encapsulation: ViewEncapsulation.None,
    providers: [
        { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults }
    ],
    // tool tip end 
})

export class NetworkPartnerComponent implements OnInit {
    displayedColumns = ['name', 'progress','manager_name', 'color', 'services', 'docstatus', 'action'];
    dataSource: MatTableDataSource<UserData>;
    partnerList: MatTableDataSource<UserData>;
    allPartnerList: MatTableDataSource<UserData>;
    public message;
    public isSpinnerVisible: boolean = true;
    acc_mgr_list = [];
    accFilter = new FormControl('');
    statusFilter = new FormControl('');
    roleFilter = new FormControl('');
    docFilter = new FormControl('');
    public filterform: FormGroup = Object.create(null);



    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
    @ViewChild(MatSort, { static: true }) sort: MatSort = Object.create(null);

    constructor(breakpointObserver: BreakpointObserver, private _partnerService: PartnerService, public dialog: MatDialog, private http: HttpClient, private router: Router, private fb: FormBuilder) {

        breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
            this.displayedColumns = result.matches ?
                ['name', 'progress', 'manager_name', 'color', 'services', 'docstatus', 'action'] :
                ['name', 'progress', 'manager_name', 'color', 'services', 'docstatus', 'action'];
        });

    }

    ngOnInit() {
        this.filterform = this.fb.group({
            pub_type: [null],
            acc_manager: [null],
            pub_status: [null],
            doc_status: [null],
        });
        this.callbackfuntion();
        
    }
    callbackfuntion(){
        this._partnerService.getpubList().subscribe(dataResult => {
            if (dataResult['status_code'] == '200') {
                this.allPartnerList = new MatTableDataSource(dataResult['data']);
                this.partnerList = new MatTableDataSource(dataResult['data']);
                this.acc_mgr_list = dataResult['manager_list'];
                // use for active publisher only
                this.partnerList.paginator = this.paginator;
                this.partnerList.sort = this.sort;
                this.isSpinnerVisible = false;
            } else {
                this.message = dataResult['message'];
                this.acc_mgr_list = dataResult['manager_list'];
                this.dialog.open(AdminDialogDynamicComponent,
                    {
                        width: '450px',
                        data: { message: this.message }
                    });
                this.isSpinnerVisible = false;
            }
        });
    }
    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.partnerList.filter = filterValue;
    }
    resetFormfilter() {
        this.isSpinnerVisible = true;
        this.filterform.reset();
        this.callbackfuntion();
    }
    customFilter() {
        let pub_type_form = this.filterform.value.pub_type;
        let pub_status_form = this.filterform.value.pub_status;
        let pub_acc_manager = this.filterform.value.acc_manager;
        let doc_status_form = this.filterform.value.doc_status;

        if (pub_type_form == 'Adx') {
            this.partnerList.data = this.allPartnerList.data.filter((value) => {
                //this is for adx
                return value.pub_adx_status == 0;
            });
            this.partnerList.data = this.partnerList.data.filter((value) => {
                //this is for publisher
                return value.network_flag == 0;
            });
        }
        if (pub_type_form == 'Adsense') {
            this.partnerList.data = this.allPartnerList.data.filter((value) => {
                return value.pub_adsense_status == 0;
            });
            this.partnerList.data = this.partnerList.data.filter((value) => {
                return value.network_flag == 0;
            });

        }
        if (pub_type_form == 'Networks') {
            this.partnerList.data = this.allPartnerList.data.filter((value) => {
                return value.network_flag == 1;
            });
        }
        let secondStage_0: any;
        if (pub_type_form == null) {
            secondStage_0 = this.allPartnerList;
        } else {
            secondStage_0 = this.partnerList;
        }
        
        if (pub_acc_manager == null) {
        } else {
            this.partnerList.data = secondStage_0.data.filter((value) => {
                return value.manager_id == pub_acc_manager;
            });
        }

        if (pub_type_form == null && pub_acc_manager == null) {
            secondStage_0 = this.allPartnerList;
        } else {
            secondStage_0 = this.partnerList;
        }

        if (pub_status_form == 'Active') {
            this.partnerList.data = secondStage_0.data.filter((value) => {
                return value.user_flag == 0;
            });
        }
        if (pub_status_form == 'InActive') {
            this.partnerList.data = secondStage_0.data.filter((value) => {
                return value.user_flag == 1;
            });
        }
        if (pub_status_form == null && pub_type_form == null && pub_acc_manager == null) {
            secondStage_0 = this.allPartnerList;
        } else {
            secondStage_0 = this.partnerList;
        }
        if (doc_status_form == null) {

        } else {
            this.partnerList.data = secondStage_0.data.filter((value) => {
                return value.status_bank == doc_status_form;
            });
        }

    }
}



export interface UserData {
    name: string;
    progress: string;
    manager_name: string;
    manager_id: string;
    color: string;
    services: string;
    status: string;
    action: string;
    status_bank: any;
    user_flag: any;
    pub_adx_status: any;
    pub_adsense_status: any;
    network_flag: any;
}
