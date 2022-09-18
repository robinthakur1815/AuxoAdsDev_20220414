import { Component, Inject, ViewChild, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions, TooltipPosition } from '@angular/material/tooltip';
import { FormBuilder,FormGroup,Validators,FormControl, NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { UserRoleService } from './users-role.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SalesDialogDynamicComponent } from '../sales-dialog-dynamic/sales-dialog-dynamic.component';
declare var $: any;
// Tooltip start
export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
    showDelay: 1000,
    hideDelay: 1000,
    touchendHideDelay: 1000,
};
// tool tip end

// Popup start
@Component({
    selector: 'app-dialog-overview-example-dialog',
    templateUrl: 'dialog-edit-sales.html'
})

export class DialogOverviewExampleSalesUsersComponent {

  public editUserForm: FormGroup = Object.create(null);
  public saleId:any;
  public saleEmail:any;
  public message:any;
  isSpinnerVisible: boolean = false;

  editUser_f_name:any;
  editUser_l_name:any;
  editUser_contact:any;
  editUser_role_id:any;
  editUser_email:any;
  editUser_user_status:any;
    constructor(
        public dialogRef: MatDialogRef<DialogOverviewExampleSalesUsersComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, private _roleUserService: UserRoleService,private fb: FormBuilder
    ) {

      this.editUserForm = this.fb.group({

      fname: [null, Validators.compose([Validators.required, Validators.minLength(3), this.noWhitespaceValidator,Validators.pattern("^[a-zA-Z ]+")])],
      lname: [null, Validators.compose([Validators.pattern("^[a-zA-Z ]+")])],
      email: new FormControl({value: null, disabled: true}),
      contact: [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.pattern(/^[1-9][0-9]*$/)])],
      roleId: [null, Validators.compose([Validators.required])],
      user_status: [null, Validators.compose([Validators.required])],
    });
      
      this.saleId = data.sale_id;
      this.saleEmail = data.saleEmail;
      this.fetchSalesData();

     }

    editUserFormSubmit(){
    if (this.editUserForm.invalid) {
      console.log("form invalid");
      return;
    }
    if (this.editUserForm.valid) {
      this.isSpinnerVisible = true;
      
      this.editUserForm.value.user_status == "1" ?'Y':'N';

      this._roleUserService.updateuserData(this.editUserForm.value.fname,this.editUserForm.value.lname,this.saleEmail,this.editUserForm.value.contact,this.editUserForm.value.roleId,this.editUserForm.value.user_status,this.saleId).subscribe((response) => {
        if (response['status_code'] == '200') {
          this.isSpinnerVisible = false;
          this.fetchSalesData();
        }else{
          this.message = response['message'];
          this.dialog.open(SalesDialogDynamicComponent,
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

    fetchSalesData(){
        this.isSpinnerVisible = true;
        this._roleUserService.fetchSalesData(localStorage.getItem('uniq_id'),this.saleId).subscribe((response) => {
          if (response['status_code'] == '200') {
            this.editUser_f_name = response['data']['first_name'];
            this.editUser_l_name = response['data']['last_name'];
            this.editUser_contact = response['data']['user_phone'];
            this.editUser_role_id = response['data']['user_role_id'];
            this.editUser_email = response['data']['user_email'];
            this.editUser_user_status = response['data']['user_status']=='Y' ? 1 :0 ;
            this.isSpinnerVisible = false;
          }else{
            this.isSpinnerVisible = false;
            console.log("No data found");
          }
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
}
// popup end

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
    selector: 'app-users-role',
    templateUrl: './users-role.component.html',
    styleUrls: ['./users-role.component.scss'],
    // Tooltip start
    encapsulation: ViewEncapsulation.None,
    providers: [
        { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults }
    ],
    // tool tip end
})

export class SalesUsersComponent implements AfterViewInit {
    displayedColumns = [];
    roleUserList: MatTableDataSource<UserData>;
    isSpinnerVisible: boolean = false;
    allAccUserList: MatTableDataSource<UserData>;
    message:any;
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
    //displayedColumns = ['name', 'progress', 'color', 'services', 'status', 'board'];
    //dataSource: MatTableDataSource<UserData>;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
    @ViewChild(MatSort, { static: true }) sort: MatSort = Object.create(null);

    // Popup start
    animal = '';
    name = '';
    // popup end

    constructor(breakpointObserver: BreakpointObserver, public dialog: MatDialog, private _roleUserService: UserRoleService, private fb: FormBuilder) {

        breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
            this.displayedColumns = result.matches ?
                ['name', 'progress', 'color', 'services', 'status', 'board'] :
                ['name', 'progress', 'color', 'services', 'status', 'board'];
        });

      

    }

    // Popup start
    editDialog(saleId:any,saleEmail:any): void {
        const dialogRef = this.dialog.open(DialogOverviewExampleSalesUsersComponent, {
            width: '900px',
            data: { sale_id: saleId,saleEmail:saleEmail }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.animal = result;
        });
    }
    // popup end

    ngOnInit() {
       this.filterform = this.fb.group({
        user_role: [null],
        user_status: [null],
      });  

      this.userrolefuntion();
    }

resetFormfilter() {
    this.isSpinnerVisible = true;
    this.filterform.reset();
    this.userrolefuntion();
  }

userrolefuntion(){
    this.isSpinnerVisible = true;
      //Api for user-role listing
        this._roleUserService.getUserInfoData(localStorage.getItem('uniq_id')).subscribe(dataResult => {

      if (dataResult['status_code'] == '200') {
          this.allAccUserList = new MatTableDataSource(dataResult['data']);
          this.roleUserList = new MatTableDataSource(dataResult['data']);
          this.roleUserList.paginator = this.paginator;
          this.roleUserList.sort = this.sort;
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
    let user_role_form = this.filterform.value.user_role;
    let user_status_form = this.filterform.value.user_status;
    let addNewdata :any;
    if(user_role_form!=null){
      
      this.roleUserList.data = this.allAccUserList.data.filter((value) => {
        return value.role_id == user_role_form;
      });
      addNewdata = this.roleUserList;
    }else{
      addNewdata = this.allAccUserList;
    }
    if(user_status_form!=null){
      this.roleUserList.data = addNewdata.data.filter((value) => {
        return value.status == user_status_form;
      });
    }
  } 
    ngAfterViewInit() {
        //this.dataSource.paginator = this.paginator;
        //this.dataSource.sort = this.sort;
    }

    
}


export interface UserData {
    userName: string;
    emailId: string;
    userRole: string;
    onboardedDate: string;
    status: string;
    board: string;
    role_id: any;
    id:any;
}
