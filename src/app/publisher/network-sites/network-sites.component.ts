import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { MatTableDataSource } from '@angular/material/table';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NetworkSitesService } from './network-sites.service';
import { DatePipe } from '@angular/common';
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions, TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';
import { DialogDynamicComponent } from '../dialog-dynamic/dialog-dynamic.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { saveAs } from 'file-saver';
import { AppSettings } from '../../global/app-url';
// Tooltip start
export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
    showDelay: 1000,
    hideDelay: 1000,
    touchendHideDelay: 1000,
};
// tool tip end 

@Component({
    selector: 'app-networksitesview',
    templateUrl: './network-sites.component.html',
    styleUrls: ['./network-sites.component.scss'],
    // Tooltip start
    encapsulation: ViewEncapsulation.None,
    providers: [
        { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults }
    ],
    // tool tip end 
})

export class NetworkSitesComponent implements OnInit {
    // Tooltip start
    positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
    position = new FormControl(this.positionOptions[0]);

    showDelay = new FormControl(1000);
    hideDelay = new FormControl(2000);
    
    public errorMsg;
    public tabledata = [];

    
    public isSpinnerVisible: boolean = true;
    messageDialog: string;
    date: string;
    // table start 

    
    
    constructor(breakpointObserver: BreakpointObserver, private _networksitesService: NetworkSitesService, private datePipe: DatePipe, public dialog: MatDialog) {


        // Table start
        breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
            this.displayedColumns = result.matches ?
            ['sites', 'adreq', 'adimpr', 'fillrate', 'covg', 'ctr', 'ecpm', 'revenue_cmsShare'] :
            ['sites', 'adreq', 'adimpr', 'fillrate', 'covg', 'ctr', 'ecpm', 'revenue_cmsShare'];
        });
        // Table End

    }

    displayedColumns = ['sites', 'adreq', 'adimpr', 'fillrate', 'covg', 'ctr', 'ecpm', 'revenue_cmsShare'];
    dataSource: MatTableDataSource<Element[]>;

    
    ngOnInit(): void {
        this.date = this.datePipe.transform(localStorage.getItem('startdate'), 'd MMM') + ' - ' + this.datePipe.transform(localStorage.getItem('enddate'), 'd MMM, Y');

        this._networksitesService.getnetworkSites(localStorage.getItem('startdate'), localStorage.getItem('enddate'), localStorage.getItem('uniq_id'), localStorage.getItem('child_net_code'), localStorage.getItem('range'))
            .subscribe(dataResult => {
                if (dataResult['status_code'] == '200') {
                    this.tabledata = dataResult['data']["sites_table_data"];
                    this.dataSource = new MatTableDataSource(dataResult['data']["sites_table_data"]);
                    this.isSpinnerVisible = false;
                } else if (dataResult['status_code'] == '422') {
                    
                    this.messageDialog = dataResult['message'];
                    this.dialog.open(DialogDynamicComponent,

                        {
                            width: '450px',
                            data: { message: this.messageDialog }
                        });

                    this.isSpinnerVisible = false;
                } else {
                    this.messageDialog = "Something went wrong";
                    this.dialog.open(DialogDynamicComponent,

                        {
                            width: '450px',
                            data: { message: this.messageDialog }
                        });
                    this.isSpinnerVisible = false;
                }

            },
                error => this.errorMsg = error);

        

    }


}

// Table start
export interface Element {
    adimpr: any;
    adreq: any;
    clicks: any;
    covg: any;
    ctr: any;
    ecpm: any;
    fillrate: any;
    madreq: any;
    revenue_cmsShare: any;
    sites: any;
}
