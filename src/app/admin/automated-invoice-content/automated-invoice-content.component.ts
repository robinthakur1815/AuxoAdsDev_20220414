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
import { SelectionModel } from '@angular/cdk/collections';

// Tooltip start
export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 1000,
  hideDelay: 1000,
  touchendHideDelay: 1000,
};
// tool tip end

export interface PeriodicElement {
  name: string;
  position: string;
  weight: string;
  symbol: string;
  lastmonth: string
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: "1hindi.com", name: '1hindi.com', weight: 'adx-subsyn-3341160988009603', symbol: 'contact@1hindi.com', lastmonth: 'May 2019' },
  { position: "1hindi.com", name: '1hindi.com', weight: 'adx-subsyn-3341160988009603', symbol: 'contact@1hindi.com', lastmonth: 'May 2019' },
  { position: "1hindi.com", name: '1hindi.com', weight: 'adx-subsyn-3341160988009603', symbol: 'contact@1hindi.com', lastmonth: 'May 2019' },
  { position: "1hindi.com", name: '1hindi.com', weight: 'adx-subsyn-3341160988009603', symbol: 'contact@1hindi.com', lastmonth: 'May 2019' },
  { position: "1hindi.com", name: '1hindi.com', weight: 'adx-subsyn-3341160988009603', symbol: 'contact@1hindi.com', lastmonth: 'May 2019' },
  { position: "1hindi.com", name: '1hindi.com', weight: 'adx-subsyn-3341160988009603', symbol: 'contact@1hindi.com', lastmonth: 'May 2019' },
  { position: "1hindi.com", name: '1hindi.com', weight: 'adx-subsyn-3341160988009603', symbol: 'contact@1hindi.com', lastmonth: 'May 2019' },
  { position: "1hindi.com", name: '1hindi.com', weight: 'adx-subsyn-3341160988009603', symbol: 'contact@1hindi.com', lastmonth: 'May 2019' },
  { position: "1hindi.com", name: '1hindi.com', weight: 'adx-subsyn-3341160988009603', symbol: 'contact@1hindi.com', lastmonth: 'May 2019' },
  { position: "1hindi.com", name: '1hindi.com', weight: 'adx-subsyn-3341160988009603', symbol: 'contact@1hindi.com', lastmonth: 'May 2019' },
];

@Component({
  selector: 'app-automated-invoice-content',
  templateUrl: './automated-invoice-content.component.html',
  styleUrls: ['./automated-invoice-content.component.scss'],
  
  // Tooltip start
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults }
  ],
  // tool tip end 
})

export class AutomatedInvoiceContentComponent implements AfterViewInit {
  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol', 'lastmonth'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
}

masterToggle() {
  this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
}


  constructor(breakpointObserver: BreakpointObserver, private fb: FormBuilder, private location: Location, public dialog: MatDialog, private router: Router) {

  }

  
  ngAfterViewInit() { 

  }

  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
}

}





