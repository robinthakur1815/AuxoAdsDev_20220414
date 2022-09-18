import { Component, OnInit, Inject, Optional, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { SaveSubUserService } from './manageusers.service';
import { DialogDynamicComponent } from '../dialog-dynamic/dialog-dynamic.component';
import { Location } from '@angular/common';


export interface ManageUsers {
    id: number;
    f_name: string;
    l_name: string;
    email: string;
    password: string;
    contact: number;
    role_id: string;
    role: string;
   }

// const employees = [
//     {
//         id: 1,
//         Name: 'Himanshu Bajaj',
//         Position: 'Himabajaj',
//         Email: 'himanshub@cybermedia.co.in',
//         Mobile: 9761222236,
//         Role: 12000
      
//     },
//     {
//         id: 2,
//         Name: 'Sandeep yadav',
//         Position: 'Sandy',
//         Email: 'sandy@gmail.com',
//         Mobile: 9865987452,
//         Role: 12000
        
//     },
//     {
//         id: 3,
//         Name: 'Shivam',
//         Position: 'Shivam12',
//         Email: 'shivam@gmail.com',
//         Mobile: 778883800,
//         Role: 12000
      
//     },
//     {
//         id: 4,
//         Name: 'Ankur',
//         Position: 'Ankur12',
//         Email: 'ankur@GMAIL.com',
//         Mobile: 878683800,
//         Role: 12000
       
//     }
    
// ];

@Component({
    templateUrl: './manageusers.component.html',
    styleUrls: ['./manageusers.component.scss']
})


export class ManageUsersComponent implements OnInit, AfterViewInit {
 
    subuserData: any;
    roleName: string;
    message: string;
    isSpinnerVisible:boolean=false;
    
    @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
    searchText: any;
    displayedColumns: string[] = ['name', 'email', 'mobile',  'role',  'action']; 
    //  used this line sandeep 132number            '#',  'date of joining', 'projects',

    //dataSource: MatTableDataSource < ManageUsers[] > ;
    dataSource: MatTableDataSource <ManageUsers> ;
    
    
   
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);


    constructor(public dialog: MatDialog, public datePipe: DatePipe,private api:SaveSubUserService, private location: Location) { }
    
    ngOnInit() {
     
     this.getSubuser();

      
    }
    backPage(){
      this.location.back();
    }
    //get all sub user 

    getSubuser(){
        this.isSpinnerVisible = true;
         this.api.getSubuser(localStorage.getItem('uniq_id')).subscribe((response)=>{
            if(response['status_code']=='200'){
                 this.dataSource = new MatTableDataSource(response['listing']);
                 this.isSpinnerVisible = false;
               }else if(response['status_code']=='204'){
                this.message = "No User Found!"; 

                this.dialog.open(DialogDynamicComponent,
                      { 
                        width: '450px',
                        data:  {message:this.message}
                      });
                this.isSpinnerVisible = false;
               }
            else{
                this.message = response['message']; 

                this.dialog.open(DialogDynamicComponent,
                      { 
                        width: '450px',
                        data:  {message:this.message}
                      });
                this.isSpinnerVisible = false;
               }
            
          }) 
    }  


    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    openDialog(action: string, obj: any) {
      
        obj.action = action;
        
        if(obj.action =='Update'){
           obj.password = decodeURIComponent(atob(obj.password));//password decode
           obj.isReadonly = true;
        }
          
        const dialogRef = this.dialog.open(ManageUsersDialogContent, {
            data: obj
        });
        
       dialogRef.afterClosed().subscribe(result => {
        if (result.event === 'Add Users') {
               this.message ="User Successfully Added"; 
               this.dialog.open(DialogDynamicComponent,
                      { 
                        width: '450px',
                        data:  {message:this.message}
                      });
               this.getSubuser();
               this.isSpinnerVisible = false; 
               //this.addRowData(result.data);
            } 
         if (result.event === 'Update') {
              this.message ="User Successfully Updated"; 
               this.dialog.open(DialogDynamicComponent,
                      { 
                        width: '450px',
                        data:  {message:this.message}
                      });
               this.getSubuser();
               this.isSpinnerVisible = false;
               //this.updateRowData(result.data);
            } 
         if (result.event === 'Delete') {
               //this.getSubuser();
                  this.message ="User Successfully Deleted"; 
                this.dialog.open(DialogDynamicComponent,
                          { 
                            width: '450px',
                            data:  {message:this.message}
                          });
                
               this.deleteRowData(result.data);
               this.isSpinnerVisible = false;
               
            }
        });
    }

// addRowData(row_obj: ManageUsers) {
//             if(row_obj.role_id == '12'){
//                   this.roleName = "Adops Manager";
//                 }
//                 if(row_obj.role_id == '13'){
//                   this.roleName = "Adops Executive";
//                 }
//                 if(row_obj.role_id == '14'){
//                   this.roleName = "Author";
//                 }
        
//         this.dataSource.data.push({
//             f_name: row_obj.f_name,
//             l_name: row_obj.l_name,
//             email: row_obj.email,
//             contact: row_obj.contact,
//             role: this.roleName
                 
//         });
//         this.dialog.open(AddComponent);

//         this.table.renderRows();

//     }

    // updateRowData(row_obj: ManageUsers) {
    //     this.dataSource.data = this.dataSource.data.filter((value) => {
    //         if (value.id === row_obj.id) {
    //             value.f_name = row_obj.f_name;
    //             value.l_name = row_obj.l_name;
    //             value.email = row_obj.email;
    //             value.contact = row_obj.contact;
    //             if(row_obj.role_id == '12'){
    //               this.roleName = "Adops Manager";
    //             }
    //             if(row_obj.role_id == '13'){
    //               this.roleName = "Adops Executive";
    //             }
    //             if(row_obj.role_id == '14'){
    //               this.roleName = "Author";
    //             }
    //             value.role = this.roleName;
    //             value.password = row_obj.password;
                
    //         }
    //         return true;
    //     });
    // }


 deleteRowData(row_obj: ManageUsers) {
        this.dataSource.data = this.dataSource.data.filter((value) => {
            return value.id !== row_obj.id;
        });
       
    }

  
}

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'dialog-content',
    templateUrl: 'dialog-content.html',
})
// tslint:disable-next-line: component-class-suffix
export class ManageUsersDialogContent {
    action: string;
    message: string;
    local_data: any;
    emailCheck: boolean = false; 
    isSpinnerVisible:boolean=false;
    isReadonly:boolean=false;
    changeRole:boolean=false;
    roleText: string;
    constructor(public datePipe:DatePipe,
        public dialogRef: MatDialogRef<ManageUsersDialogContent>,
        // @Optional() is used to prevent error if no data is passed
        @Optional() @Inject(MAT_DIALOG_DATA) public data: ManageUsers,private api:SaveSubUserService,public dialog: MatDialog) {

        this.local_data = { ...data };
        
        this.action = this.local_data.action;
      
     }
//Role dropdown change text
 roleChange(roleId){
    
        if(roleId.value == 12){
            this.roleText = "Access and manage all earnings reports, content performance reports, payments panel (excluding bank details) and publisher tools.";
        }
        else if(roleId.value == 13){
            this.roleText = "Access all earnings report, publisher tools. And view-only for payments panel.";
        }
       else if(roleId.value == 14){
            this.roleText = "Access content performance reports.";
        }
       else{
         this.roleText = "";
        }
        this.changeRole = true;
     }
   //subusr Add
    doAction() {
       this.isSpinnerVisible = true;
        this.api.postSubuser(localStorage.getItem('useremail'),localStorage.getItem('usertype'),this.local_data.f_name,this.local_data.l_name,this.local_data.email,this.local_data.contact,this.local_data.role_id,localStorage.getItem('uniq_id')).subscribe((response)=>{
            
               if(response['status_code']=='201'){
                  
                  this.dialogRef.close({ event: this.action, data: this.local_data });
               }else if(response['status_code']=='422'){
                
                 this.emailCheck = true;
                 this.isSpinnerVisible = false;
               }else{
                 this.isSpinnerVisible = false;
                 this.message ="Something went wrong"; 
                this.dialog.open(DialogDynamicComponent,
                              { 
                                width: '450px',
                                data:  {message:this.message}
                              });
               }  
             
          }) 
     
        
    }

    //email validation
    check(e) {
       
     if(this.emailCheck == true){
         this.emailCheck = false;
        }
    }
    doActionUpdate() {
       this.isSpinnerVisible = true;
        this.api.updateSubuser(this.local_data.id,this.local_data.f_name,this.local_data.l_name,this.local_data.email,this.local_data.contact,this.local_data.role_id,localStorage.getItem('uniq_id')).subscribe((response)=>{

             
          }) 
       this.dialogRef.close({ event: this.action, data: this.local_data });
    }
    doActionDelete(){
        this.isSpinnerVisible = true;
       this.api.deleteSubuser(this.local_data.id,this.local_data.f_name,this.local_data.l_name,localStorage.getItem('uniq_id'),this.local_data.email).subscribe((response)=>{
            
            
             if(response['status_code']=='200'){
                  
                  this.dialogRef.close({ event: this.action, data: this.local_data });
               }else{
                 this.isSpinnerVisible = false;
                 this.message ="Something went wrong"; 
                this.dialog.open(DialogDynamicComponent,
                              { 
                                width: '450px',
                                data:  {message:this.message}
                              });
               } 
          }) 
       
    }
    closeDialog() {
        this.dialogRef.close({ event: 'Cancel' });
    }
  
    
   

}


