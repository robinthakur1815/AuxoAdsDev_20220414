import { Component, Inject, OnInit, ViewChild, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BreakpointObserver } from '@angular/cdk/layout';
import { FormBuilder,FormGroup,Validators,FormControl} from '@angular/forms';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DirectDealViewService } from './direct-deal-view.service';
import { DealsDialogDynamicComponent } from '../deals-dialog-dynamic/deals-dialog-dynamic.component';
import { ActivatedRoute } from '@angular/router';
import { saveAs } from 'file-saver';
import { AppSettings } from '../../global/app-url';

// Popup Select all start
@Component({
  selector: 'app-dialog-select-all-dialog',
  templateUrl: 'dialog-select-all.html'
})

export class DialogSelectAllDirectDealViewComponent {
  public allOrderId:any;

  public ecpmallForm: FormGroup = Object.create(null);
  isSpinnerVisible: boolean = false;
  public message:any;

  constructor(
    public dialogRef: MatDialogRef<DialogSelectAllDirectDealViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog,private fb: FormBuilder,private _Service: DirectDealViewService
  ) {
    this.allOrderId = data.editAll_orderId;
    this.ecpmallForm = this.fb.group({
      set_all_ecpm: [null, Validators.compose([Validators.required,Validators.pattern("^-?[0-9]\\d*(\\.\\d{1,3})?$")])],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
  updateallCPM(){
    if (this.ecpmallForm.invalid) {
      return;
    }
    if (this.ecpmallForm.valid) {
      this.isSpinnerVisible = true;
      this._Service.eCPMAllUpdate(this.ecpmallForm.value.set_all_ecpm,this.allOrderId).subscribe((response) => {
        if (response['status_code'] == '200') {
          this.isSpinnerVisible = false;
          this.message = response['message'];
          this.dialogRef.close();
          this.dialog.open(DealsDialogDynamicComponent,
            {
              width: '450px',
              data: { message: this.message }
            });
        }else{
          this.message = response['message'];
          this.dialog.open(DealsDialogDynamicComponent,
            {
              width: '450px',
              data: { message: this.message }
            });
          this.isSpinnerVisible = false;
          console.log("No data found");
        }
      });
    }
  }
}
// Popup Select all end

// Popup Edit all start
@Component({
  selector: 'app-dialog-edit-all-dialog',
  templateUrl: 'dialog-edit-all.html'
})

export class DialogEditAllDirectDealViewComponent {
  public deal_orderid:any;
  public deal_adunitId:any;
  public deal_campDate:any;
  public deal_eCPM_val:any;

  public ecpmForm: FormGroup = Object.create(null);
  isSpinnerVisible: boolean = false;
  public message:any;

  constructor(
    public dialogRef: MatDialogRef<DialogEditAllDirectDealViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog,private fb: FormBuilder,private _Service: DirectDealViewService
  ) {
    this.deal_orderid = data.edit_orderID;
    this.deal_adunitId = data.edit_adunitId;
    this.deal_campDate = data.edit_cam_date;
    this.deal_eCPM_val = data.edit_set_cpm;

    this.ecpmForm = this.fb.group({
      set_ecpm: [null, Validators.compose([Validators.required,Validators.pattern("^-?[0-9]\\d*(\\.\\d{1,3})?$")])],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
  updateCPM(){
    if (this.ecpmForm.invalid) {
      return;
    }
    if (this.ecpmForm.valid) {
      this.isSpinnerVisible = true;
      this._Service.eCPMUpdate(this.ecpmForm.value.set_ecpm,this.deal_orderid,this.deal_adunitId,this.deal_campDate).subscribe((response) => {
        if (response['status_code'] == '200') {
          this.isSpinnerVisible = false;
          this.message = response['message'];
          this.dialogRef.close();
          this.dialog.open(DealsDialogDynamicComponent,
            {
              width: '450px',
              data: { message: this.message }
            });
        }else{
          this.message = response['message'];
          this.dialog.open(DealsDialogDynamicComponent,
            {
              width: '450px',
              data: { message: this.message }
            });
          this.isSpinnerVisible = false;
          console.log("No data found");
        }
      });
    }
  }
}


@Component({
  selector: 'app-direct-deal-view',
  templateUrl: './direct-deal-view.component.html',
  styleUrls: ['./direct-deal-view.component.scss'],
})

export class DirectDealViewComponent implements AfterViewInit {
  displayedColumns = ['order_date', 'order_id','campaign_date', 'order_name','ad_unit_id', 'ad_unit_name', 'set_cpm', 'global_impression', 'actual_ecpm', 'action'];
  dataSource: MatTableDataSource<UserData>;
  public orderId:any;
  public message;
  public isSpinnerVisible: boolean = true;
  public filterform: FormGroup = Object.create(null);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort, { static: true }) sort: MatSort = Object.create(null);

  // Popup start
  animal = '';
  name = '';
  // popup end

  constructor(breakpointObserver: BreakpointObserver, private fb: FormBuilder, private location: Location, public dialog: MatDialog,private _Service: DirectDealViewService,activatedRouter: ActivatedRoute) {
    this.orderId = activatedRouter.snapshot.paramMap.get('orderId');
    breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns = result.matches ?
      ['order_date', 'order_id','campaign_date', 'order_name','ad_unit_id', 'ad_unit_name', 'set_cpm', 'global_impression', 'actual_ecpm', 'action'] :
      ['order_date', 'order_id','campaign_date', 'order_name','ad_unit_id', 'ad_unit_name', 'set_cpm', 'global_impression', 'actual_ecpm', 'action'];
    });
  }
  ngOnInit(): void {
    this.callbackfuntion();
  }
  callbackfuntion() {
    this._Service.getDirectDealOrderList(this.orderId).subscribe(dataResult => {
      if (dataResult['status_code'] == '200') {
        this.dataSource = new MatTableDataSource(dataResult['data']);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isSpinnerVisible = false;
      } else {
        this.message = dataResult['message'];
        this.dialog.open(DealsDialogDynamicComponent,
          {
            width: '450px',
            data: { message: this.message }
          });
        this.isSpinnerVisible = false;
      }
    });
  }
  // Popup Popup Select all start
  selectAllDialog(): void {
    const dialogRef = this.dialog.open(DialogSelectAllDirectDealViewComponent, {
      width: '450px',
      data: { editAll_orderId: this.orderId}
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      this.animal = result;
    });
  }
  // Popup Select all end

  // Popup Popup Edit all start
  editDialog(edit_orderID:any,edit_adunitId:any,edit_cam_date:any,edit_set_cpm:any): void {
    const dialogRef = this.dialog.open(DialogEditAllDirectDealViewComponent, {
      width: '450px',
      data: { edit_orderID: edit_orderID, edit_adunitId: edit_adunitId,edit_cam_date:edit_cam_date,edit_set_cpm:edit_set_cpm }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
  // Popup Edit all end


  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  backPage() {
    this.location.back();
  }
  
  downloadExlOrder(){
    this.isSpinnerVisible = true;
    this._Service.downloadReport(this.orderId).subscribe((response) => {
      if (response['status_code'] == '200') {
        this.isSpinnerVisible = false;
        const fileName = response['data'];
        const fileUrl = AppSettings.API_STARTPOINT+'/assets/api/admin/deals/upload/'+fileName;
        saveAs(fileUrl, fileName);
      }else{
        this.message = response['message'];
        this.dialog.open(DealsDialogDynamicComponent,
          {
            width: '450px',
            data: { message: this.message }
          });
        this.isSpinnerVisible = false;
      }
    });
  }


}

export interface UserData {
  order_date: any;
  order_id: any;
  campaign_date: any;
  order_name: any;
  ad_unit_id: any;
  ad_unit_name: any;
  set_cpm: any;
  global_impression: any,
  actual_ecpm: any,
  action: any;
  cam_date: any;
}
