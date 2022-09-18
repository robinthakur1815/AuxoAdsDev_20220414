import { Component, Inject, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AccountUserService } from './account-users.service';
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions, TooltipPosition } from '@angular/material/tooltip';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminDialogDynamicComponent } from '../dialog-dynamic/admin-dialog-dynamic.component';
declare var $: any;
// Popup Add User start
@Component({
  selector: 'app-dialog-add-users-dialog',
  templateUrl: 'dialog-add-users.html'
})

export class DialogAddUsersAccountUsersAdminComponent {
  public addUserForm: FormGroup = Object.create(null);
  emailCheck: boolean = false;
  isSpinnerVisible: boolean = false;
  public message:any;
  // local_data: any;
  public rolelist:any;
  constructor(
    public dialogRef: MatDialogRef<DialogAddUsersAccountUsersAdminComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog,private fb: FormBuilder,private _accUserServiceForAdd: AccountUserService
  ) {
    // this.local_data = { ...data };
    this.addUserForm = this.fb.group({

      fname: [null, Validators.compose([Validators.required, Validators.minLength(3), this.noWhitespaceValidator,Validators.pattern("^[a-zA-Z ]+")])],
      lname: [null, Validators.compose([Validators.pattern("^[a-zA-Z ]+")])],
      email: [null, Validators.compose([Validators.email,Validators.required,Validators.pattern("^([a-zA-Z0-9]+\.)+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$")])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(8),this.noWhitespaceValidator])],
      contact: [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.pattern(/^[1-9][0-9]*$/)])],
      roleId: [null, Validators.compose([Validators.required])],
    });
    this.rolelist = data.rolelist;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  addUserFormSubmit(){
    if (this.addUserForm.invalid) {
      return;
    }
    if (this.addUserForm.valid) {
      this.isSpinnerVisible = true;
      this._accUserServiceForAdd.adduserData(this.addUserForm.value.fname,this.addUserForm.value.lname,this.addUserForm.value.email,this.addUserForm.value.password,this.addUserForm.value.contact,this.addUserForm.value.roleId).subscribe((response) => {
        if (response['status_code'] == '200') {
          this.isSpinnerVisible = false;
          this.message = response['message'];
          this.dialogRef.close();
          this.dialog.open(AdminDialogDynamicComponent,
            {
              width: '450px',
              data: { message: this.message }
            });
        }else{
          this.message = response['message'];
          this.dialog.open(AdminDialogDynamicComponent,
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
// popup Add User end

// Popup Edit User
@Component({
  selector: 'app-dialog-edit-users-dialog',
  templateUrl: 'dialog-edit-users.html'
})

export class DialogEditUsersAccountUsersAdminComponent {
  public editUserForm: FormGroup = Object.create(null);
  public rolelist:any;
  public userId:any;
  public userEmail:any;
  public message:any;
  isSpinnerVisible: boolean = true;

  editUser_f_name:any;
  editUser_l_name:any;
  editUser_password:any;
  editUser_contact:any;
  editUser_role_id:any;
  editUser_email:any;
  editUser_user_status:any;

  constructor(
    public dialogRef: MatDialogRef<DialogEditUsersAccountUsersAdminComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog,private fb: FormBuilder,private _accUserServiceForEdit: AccountUserService
  ) {
    this.editUserForm = this.fb.group({

      fname: [null, Validators.compose([Validators.required, Validators.minLength(3), this.noWhitespaceValidator,Validators.pattern("^[a-zA-Z ]+")])],
      lname: [null, Validators.compose([Validators.pattern("^[a-zA-Z ]+")])],
      email: new FormControl({value: null, disabled: true}),
      password: [null, Validators.compose([Validators.required, Validators.minLength(8),this.noWhitespaceValidator])],
      contact: [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.pattern(/^[1-9][0-9]*$/)])],
      roleId: [null, Validators.compose([Validators.required])],
      user_status: [null, Validators.compose([Validators.required])],
    });
    this.rolelist = data.rolelist;
    this.userId = data.user_id;
    this.userEmail = data.user_email;
    this.fetchUserData();
  }
  editUserFormSubmit(){
    if (this.editUserForm.invalid) {
      console.log("form invalid");
      return;
    }
    if (this.editUserForm.valid) {
      this.isSpinnerVisible = true;
      this._accUserServiceForEdit.updateuserData(this.editUserForm.value.fname,this.editUserForm.value.lname,this.editUserForm.value.password,this.editUserForm.value.contact,this.editUserForm.value.roleId,this.editUserForm.value.user_status,this.userId,this.userEmail).subscribe((response) => {
        if (response['status_code'] == '200') {
          this.isSpinnerVisible = false;
          this.message = response['message'];
          this.dialog.open(AdminDialogDynamicComponent,
            {
              width: '450px',
              data: { message: this.message }
            });
          this.fetchUserData();
        }else{
          this.message = response['message'];
          this.dialog.open(AdminDialogDynamicComponent,
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
  fetchUserData(){
    this.isSpinnerVisible = true;
    this._accUserServiceForEdit.fetchuserData(this.userId,this.userEmail).subscribe((response) => {
      if (response['status_code'] == '200') {
        this.editUser_f_name = response['data']['f_name'];
        this.editUser_l_name = response['data']['l_name'];
        this.editUser_password = response['data']['password'];
        this.editUser_contact = response['data']['contact'];
        this.editUser_role_id = response['data']['role_id'];
        this.editUser_email = response['data']['email'];
        this.editUser_user_status = response['data']['user_status'];
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
// popup Edit User end

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
  selector: 'app-account-users',
  templateUrl: './account-users.component.html',
  styleUrls: ['./account-users.component.scss'],
  // Tooltip start
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults }
  ],
  // tool tip end 
})

export class AccountUsersComponent implements OnInit {
    displayedColumns = [];
    accUserList: MatTableDataSource<UserData>;
    allAccUserList: MatTableDataSource<UserData>;
    public message;
    public isSpinnerVisible: boolean = true;
    accUserRolelist = [];
    accFilter = new FormControl('');
    statusFilter = new FormControl('');
    roleFilter = new FormControl('');
    docFilter = new FormControl('');
    public filterform: FormGroup = Object.create(null);



    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
    @ViewChild(MatSort, { static: true }) sort: MatSort = Object.create(null);

  // Popup start
  animal = '';
  name = '';
  // popup end

  

  constructor(breakpointObserver: BreakpointObserver, private _accUserService: AccountUserService, public dialog: MatDialog, private router: Router, private fb: FormBuilder) {

    breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns = result.matches ?
        ['name', 'progress', 'accountm', 'color', 'status', 'action'] :
        ['name', 'progress', 'accountm', 'color', 'status', 'action'];
    });
  }

  // Popup Add User start
  addDialog(): void {
    const dialogRef = this.dialog.open(DialogAddUsersAccountUsersAdminComponent, {
      width: '900px',
      data: { rolelist: this.accUserRolelist, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
  // popup Add User end

  // Popup Edit User start
  editDialog(userId:any,userEmail:any): void {
    console.log("sandy"+userId);
    console.log("sandy email"+userEmail);
    const dialogRef = this.dialog.open(DialogEditUsersAccountUsersAdminComponent, {
      width: '900px',
      data: { rolelist: this.accUserRolelist, user_id: userId,user_email:userEmail }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      this.animal = result;
    });
  }
  // popup EditUser end

  ngOnInit() {
      this.filterform = this.fb.group({
        user_role: [null],
        user_status: [null],
      });
      this.callbackfuntion();
  }
  callbackfuntion(){
    this._accUserService.getAccUserList().subscribe(dataResult => {
      if (dataResult['status_code'] == '200') {
          this.allAccUserList = new MatTableDataSource(dataResult['data']);
          this.accUserList = new MatTableDataSource(dataResult['data']);
          this.accUserRolelist = dataResult['role_list'];
          
          this.accUserList.paginator = this.paginator;
          this.accUserList.sort = this.sort;
          this.isSpinnerVisible = false;
      } else {
          this.message = "No Data Found";
          this.accUserRolelist = dataResult['role_list'];
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
    this.accUserList.filter = filterValue;
  }
  resetFormfilter() {
    this.isSpinnerVisible = true;
    this.filterform.reset();
    this.callbackfuntion();
  }
  customFilter() {
    let user_role_form = this.filterform.value.user_role;
    let user_status_form = this.filterform.value.user_status;
    let addNewdata :any;
    if(user_role_form!=null){
      this.accUserList.data = this.allAccUserList.data.filter((value) => {
        return value.role_id == user_role_form;
      });
      addNewdata = this.accUserList;
    }else{
      addNewdata = this.allAccUserList;
    }
    if(user_status_form!=null){
      this.accUserList.data = addNewdata.data.filter((value) => {
        return value.user_status == user_status_form;
      });
    }
  }
}

export interface UserData {
  name: string;
  email: string;
  role_name: string;
  user_created_date: string;
  user_status: string;
  action: string;
  id: any;
  role_id: any;
}
