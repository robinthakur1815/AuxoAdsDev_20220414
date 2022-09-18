import { Component, AfterViewInit, ViewChild,OnInit } from '@angular/core';
import { ServiceinvoiceService } from '../serviceinvoice.service';
import { InvoiceList } from '../invoice';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDynamicComponent } from '../../dialog-dynamic/dialog-dynamic.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {
  public errorMsg;
  public tabledata = [];
  public message;
  public isSpinnerVisible:boolean=true;
  role_id = localStorage.getItem('role_id');
  invoiceList: MatTableDataSource<Element>;
  // 'chk', 'totalCost',  sandeep  bhai used this 17 line
  displayedColumns: string[] = ['billFrom', 'billTo',  'status', 'action'];


  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  @ViewChild(MatPaginator) paginator: MatPaginator = Object.create(null);

  constructor(private invoiceService: ServiceinvoiceService,public dialog: MatDialog, private location: Location) {
    // let invoiceListData = this.invoiceService.getInvoiceList();
    // this.invoiceList = new MatTableDataSource(invoiceListData);
  }

  ngOnInit() {
    this.invoiceService.getInvoiceList(localStorage.getItem('uniq_id'), localStorage.getItem('child_net_code'))
    .subscribe(dataResult => {
      this.isSpinnerVisible = false;
      if(dataResult['status_code']=='200'){
          this.invoiceList = new MatTableDataSource(dataResult['invoicing']);
      }else if(dataResult['status_code']=='201'){
        if(this.role_id != '12' && this.role_id != '13'){
          this.message = "Please update your Bank details. Payment advice can only be processed once relevant information has been provided."; 
        this.dialog.open(DialogDynamicComponent,
          { 
            width: '450px',
            data:  {message:this.message,bankAcc:true}
          });

        }
        
      }else{
        this.message = dataResult['message']; 
        this.dialog.open(DialogDynamicComponent,
          { 
            width: '450px',
            data:  {message:this.message}
          });
      }
      
  },
      error => this.errorMsg = error);
    // this.invoiceList = new MatTableDataSource(invoiceListData);
    // this.invoiceList.paginator = this.paginator;
    // this.invoiceList.sort = this.sort;
  }
  backPage(){
    this.location.back();
  }


  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  allComplete: boolean = false;
  updateAllComplete() {
    this.allComplete = this.invoiceList != null && this.invoiceList.data.every(t => t.completed);
  }
  someComplete() {
    return this.invoiceList.data.filter(t => t.completed).length > 0 && !this.allComplete;
  }
  setAll(completed: boolean) {
    this.allComplete = completed;
    this.invoiceList.data.forEach(t => t.completed = completed);
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////

  filter(filterValue: string) {
    this.invoiceList.filter = filterValue.trim().toLowerCase();
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////// 

  deleteInvoice(row: number) {

    if (confirm('Are you sure you want to delete this record ?')) {
      this.invoiceService.deleteInvoice(row);
      this.invoiceList.data = this.invoiceList.data.filter(invoice => invoice.id !== row);
    }
  }

}

export interface Element {
  id:any;
  month: any;
  final_rev: any;
  status: any;
  pdf_name: any;
  completed: boolean;
}