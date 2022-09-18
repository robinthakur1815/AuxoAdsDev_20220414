import { Component, Inject, OnInit, ViewChild, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BreakpointObserver } from '@angular/cdk/layout';

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

// Popup Add User start
@Component({
  selector: 'app-dialog-add-users-dialog',
  templateUrl: 'dialog-add-users.html'
})

export class DialogAddUsersBCRMonthsAdminComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogAddUsersBCRMonthsAdminComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
// popup Add User end

// Popup Edit User
@Component({
  selector: 'app-dialog-edit-users-dialog',
  templateUrl: 'dialog-edit-users.html'
})

export class DialogEditUsersBCRMonthsAdminComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogEditUsersBCRMonthsAdminComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
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
  selector: 'app-bcr-months',
  templateUrl: './bcr-months.component.html',
  styleUrls: ['./bcr-months.component.scss'],
  // Tooltip start
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults }
  ],
  // tool tip end 
})

export class BCRMonthsComponent implements AfterViewInit {
  displayedColumns = ['id', 'name', 'progress', 'color', 'services', 'status', 'earning', 'np', 'bcrdate', 'action'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort, { static: true }) sort: MatSort = Object.create(null);

  // Popup start
  animal = '';
  name = '';
  // popup end

  constructor(breakpointObserver: BreakpointObserver, private fb: FormBuilder, private location: Location, public dialog: MatDialog, private router: Router) {

    breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns = result.matches ?
        ['name', 'progress', 'accountm', 'color', 'status', 'earning', 'np', 'bcrdate', 'action'] :
        ['name', 'progress', 'accountm', 'color', 'status', 'earning', 'np', 'bcrdate', 'action'];
    });

    const users: UserData[] = [];
    for (let i = 1; i <= 100; i++) {
      users.push(createNewUser(i));
    }

    this.dataSource = new MatTableDataSource(users);
  }

  // Popup Add User start
  addDialog(): void {
    const dialogRef = this.dialog.open(DialogAddUsersBCRMonthsAdminComponent, {
      width: '900px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
  // popup Add User end

  // Popup Edit User start
  editDialog(): void {
    const dialogRef = this.dialog.open(DialogEditUsersBCRMonthsAdminComponent, {
      width: '900px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
  // popup EditUser end

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

}


function createNewUser(id: number): UserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';

  return {
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    accountm: name,
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))],
    status: name,
    earning: name,
    np: name,
    bcrdate: name,
    action: name
  };
}

export interface UserData {
  name: string;
  progress: string;
  accountm: string;
  color: string;
  status: string;
  earning: string;
  np: string;
  bcrdate: string;
  action: string;
}
