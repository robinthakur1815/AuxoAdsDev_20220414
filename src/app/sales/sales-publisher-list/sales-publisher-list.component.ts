import { Component, ViewChild, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions, TooltipPosition } from '@angular/material/tooltip';
import { FormBuilder,FormGroup,Validators,FormControl, NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { SalesPubListservice } from './sales-publisher-list.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SalesDialogDynamicComponent } from '../sales-dialog-dynamic/sales-dialog-dynamic.component';
import { saveAs } from 'file-saver';
import { AppSettings } from '../../global/app-url';
declare var $: any;
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
    selector: 'app-sales-publisher-list',
    templateUrl: './sales-publisher-list.component.html',
    styleUrls: ['./sales-publisher-list.component.scss'],
    // Tooltip start
    encapsulation: ViewEncapsulation.None,
    providers: [
        { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults }
    ],
    // tool tip end
})

export class SalesNetworkPartnerComponent implements AfterViewInit {

    displayedColumns = [];
    pubUserList: MatTableDataSource<UserData>;
    isSpinnerVisible: boolean = false;
    allPubUserList: MatTableDataSource<UserData>;
    message:any;
    salesChannelList:[];
    salesTeamlList:[];
    role_id = localStorage.getItem('role_id');
    adminMenu:boolean=true;
    public filterform: FormGroup = Object.create(null);
    // Tooltip start
    positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
    position = new FormControl(this.positionOptions[0]);

    showDelay = new FormControl(1000);
    hideDelay = new FormControl(2000);

    disabled = new FormControl(true);

    message1 = new FormControl('Info about the action');

    position1 = new FormControl(this.positionOptions[0]);
    // Tooltip end
    

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
    @ViewChild(MatSort, { static: true }) sort: MatSort = Object.create(null);

    constructor(breakpointObserver: BreakpointObserver, public dialog: MatDialog, private _salePubService: SalesPubListservice, private fb: FormBuilder) {

        breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
            this.displayedColumns = result.matches ?
                ['id', 'name', 'progress', 'color', 'services', 'siteid', 'cpm', 'status', 'board'] :
                ['id', 'name', 'progress', 'color', 'services', 'siteid', 'cpm', 'status', 'board'];
        });
    }
downloadoverall(){
  //api
      
        let pub_type_form = this.filterform.value.pub_type == null ? 'NULL':this.filterform.value.pub_type;
        let pub_sales_per = this.filterform.value.sales_person == null ? 'NULL':this.filterform.value.sales_person;
        let pub_sal_chanel = this.filterform.value.sales_channel == null ? 'NULL':this.filterform.value.sales_channel;
        let pub_status_form = this.filterform.value.pub_status == null ? 'NULL':this.filterform.value.pub_status;
         
        this._salePubService.getPubListDownData(localStorage.getItem('uniq_id'),localStorage.getItem('startdate'),localStorage.getItem('enddate'),pub_type_form,localStorage.getItem('range'),pub_sal_chanel,pub_status_form,pub_sales_per).subscribe(dataResult => {
            
             if (dataResult['status_code'] == '200') {
                    const fileName = dataResult['data'];
                    const fileUrl = AppSettings.API_STARTPOINT + '/assets/api/admin/sales/upload/' + fileName;

                    saveAs(fileUrl, fileName);
                } else if (dataResult['status_code'] == '422') {

                    this.message = dataResult['message'];
                    this.dialog.open(SalesDialogDynamicComponent,

                        {
                            width: '450px',
                            data: { message: this.message }
                        });


                } else {
                    this.message = "Something went wrong";
                    this.dialog.open(SalesDialogDynamicComponent,

                        {
                            width: '450px',
                            data: { message: this.message }
                        });

                }

            })
}
    ngOnInit() {

      this.filterform = this.fb.group({
            pub_type: [null],
            sales_person: [null],
            sales_channel: [null],
            pub_status: [null],
        }); 
      
       if(this.role_id == "8"){ 

           this.adminMenu = false;
        }

        this.pubList();
    }

    ngAfterViewInit() {
        //this.dataSource.paginator = this.paginator;
        //this.dataSource.sort = this.sort;
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.pubUserList.filter = filterValue;
    }
   resetFormfilter() {
        this.isSpinnerVisible = true;
        this.filterform.reset();
        this.pubList();
    }
    pubList(){
        this.isSpinnerVisible = true;
      //Api for pub listing
        this._salePubService.getPubListData(localStorage.getItem('uniq_id'),localStorage.getItem('startdate'),localStorage.getItem('enddate'),"adx",localStorage.getItem('range'),"NULL","NULL","NULL").subscribe(dataResult => {
          
      if (dataResult['status_code'] == '200') {
        this.salesChannelList =  dataResult['sales_channel'];
        this.salesTeamlList = dataResult['sales_team'];
          this.allPubUserList = new MatTableDataSource(dataResult['data']);
          this.pubUserList = new MatTableDataSource(dataResult['data']);
          this.pubUserList.paginator = this.paginator;
          this.pubUserList.sort = this.sort;
          this.isSpinnerVisible = false;
      } else {
          this.message = "No Data Found";
          this.dialog.open(SalesDialogDynamicComponent,
              {
                  width: '450px',
                  data: { message: this.message }
              });
          this.isSpinnerVisible = false;
          }
       });
    }
    customFilter() {
        this.isSpinnerVisible = true;
        let pub_type_form = this.filterform.value.pub_type == null ? 'NULL':this.filterform.value.pub_type;
        let pub_sales_per = this.filterform.value.sales_person == null ? 'NULL':this.filterform.value.sales_person;
        let pub_sal_chanel = this.filterform.value.sales_channel == null ? 'NULL':this.filterform.value.sales_channel;
        let pub_status_form = this.filterform.value.pub_status == null ? 'NULL':this.filterform.value.pub_status;
         
        this._salePubService.getPubListData(localStorage.getItem('uniq_id'),localStorage.getItem('startdate'),localStorage.getItem('enddate'),pub_type_form,localStorage.getItem('range'),pub_sal_chanel,pub_status_form,pub_sales_per).subscribe(dataResult => {
          
      if (dataResult['status_code'] == '200') {
          this.pubUserList = new MatTableDataSource(dataResult['data']);
          this.pubUserList.paginator = this.paginator;
          this.pubUserList.sort = this.sort;
          this.isSpinnerVisible = false;
      } else {
          this.message = "No Data Found";
          this.dialog.open(SalesDialogDynamicComponent,
              {
                  width: '450px',
                  data: { message: this.message }
              });
          this.isSpinnerVisible = false;
          }
       });

    }
}

// function createNewUser(id: number): UserData {
//     const name =
//         NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
//         ' ' +
//         NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
//         '.';

//     return {
//         id: id.toString(),
//         name: name,
//         progress: Math.round(Math.random() * 100).toString(),
//         color: COLORS[Math.round(Math.random() * (COLORS.length - 1))],
//         services: name,
//         siteid: name,
//         cpm: name,
//         status: name,
//         board: name
//     };
// }

export interface UserData {
    site_name: any;
    name: string;
    sal_name: string;
    chan_name: string;
    pub_email: string;
    revenue: any;
    ecpm: any;
    user_status: string;
    onboarddate: string
}
