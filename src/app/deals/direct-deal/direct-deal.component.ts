import { Component, Inject, OnInit, ViewChild, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BreakpointObserver } from '@angular/cdk/layout';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { DirectDealService } from './direct-deal.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DealsDialogDynamicComponent } from '../deals-dialog-dynamic/deals-dialog-dynamic.component';


// Popup Update direct expense start
@Component({
  selector: 'app-dialog-update-direct-dialog',
  templateUrl: 'dialog-update-direct.html'
})

export class DialogUpdateDirectDirectDealComponent {
  public directdeal_orderid:any;
  public directdeal_direct_exp_val:any;
  public directexpForm: FormGroup = Object.create(null);
  isSpinnerVisible: boolean = false;
  public message:any;

  constructor(
    public dialogRef: MatDialogRef<DialogUpdateDirectDirectDealComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog,private fb: FormBuilder,private _Service: DirectDealService
  ) {
    this.directdeal_orderid = data.order_id;
    this.directdeal_direct_exp_val = data.direct_exp_val;
    this.directexpForm = this.fb.group({
      direct_expense: [null, Validators.compose([Validators.required,Validators.pattern("^-?[0-9]\\d*(\\.\\d{1,3})?$")])],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  updateDirectExp(){
    if (this.directexpForm.invalid) {
      return;
    }
    if (this.directexpForm.valid) {
      this.isSpinnerVisible = true;
      this._Service.directExpUpdate(this.directexpForm.value.direct_expense,this.directdeal_orderid).subscribe((response) => {
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
  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
}
// Popup Update direct expense end


@Component({
  selector: 'app-direct-deal',
  templateUrl: './direct-deal.component.html',
  styleUrls: ['./direct-deal.component.scss'],

})

export class DirectDealComponent implements AfterViewInit {
  displayedColumns = ['order_date', 'order_id', 'order_name', 'set_cpm', 'direct_expense', 'global_impression', 'ecpm', 'action'];
  dataSource: MatTableDataSource<UserData>;
  public message;
  public isSpinnerVisible: boolean = true;
  public filterform: FormGroup = Object.create(null);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort, { static: true }) sort: MatSort = Object.create(null);

  // Popup start
  animal = '';
  name = '';
  // popup end

  constructor(breakpointObserver: BreakpointObserver, private fb: FormBuilder, private location: Location, public dialog: MatDialog,private _Service: DirectDealService) {

    breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns = result.matches ?
        ['order_date', 'order_id', 'order_name', 'set_cpm', 'direct_expense', 'global_impression', 'ecpm', 'action'] :
        ['order_date', 'order_id', 'order_name', 'set_cpm', 'direct_expense', 'global_impression', 'ecpm', 'action'];
    });

  }

  ngOnInit(): void {
    this.callbackfuntion();
  }
  callbackfuntion() {
    this._Service.getDirectDealList().subscribe(dataResult => {
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
  // Popup Update direct expense start
  addDialog(orderId:any,directExp:any): void {
    // console.log(orderId); 
    const dialogRef = this.dialog.open(DialogUpdateDirectDirectDealComponent, {
      width: '450px',
      data: { order_id: orderId,direct_exp_val: directExp}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
  // Popup Update direct expense end


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

}

export interface UserData {
  order_date: any;
  order_id: any;
  order_name: any;
  set_cpm: any;
  direct_expense: any;
  global_impression: any,
  ecpm: any,
  action: any;
}
