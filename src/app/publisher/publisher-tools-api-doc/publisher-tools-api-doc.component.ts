import { Component, OnInit } from '@angular/core';
import { PublisherToolsApiDocService } from './publisher-tools-api-doc.service';
import { DialogDynamicComponent } from '../dialog-dynamic/dialog-dynamic.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppSettings } from '../../global/app-url';
declare var $: any;

@Component({
  selector: 'app-publisher-tools-api-doc',
  templateUrl: './publisher-tools-api-doc.component.html',
  styleUrls: ['./publisher-tools-api-doc.component.scss']
})
export class PublisherToolsApiDocComponent {

  hide = true;
  adsenseid: boolean = true;
  adsid: string;
  date: string;
  mcmid: boolean = true;
  valueText: any;
  isSpinnerVisible: boolean = false;
  lvl2data = [];
  public display;
  public app;
  public vedio;
  public vdata = [];
  public message;
  public errorMsg;
  constructor(private _PublisherToolsApiDocService: PublisherToolsApiDocService,public dialog: MatDialog){
  }
  
  ngOnInit(
    
  ) {
    
    this.apidoc();
    //window.location.reload()
    
  }
  apidoc() {
    this.isSpinnerVisible = true;
    this._PublisherToolsApiDocService.getApiDocData(localStorage.getItem('uniq_id')).subscribe((response) => {
    //console.log(response.data);
    if (response['status_code'] == '200') {
       this.display = response.data[0].adx_for_display;
       this.app = response.data[0].adx_for_app;
       this.vedio = response.data[0].adx_for_video;
      // window.location.reload();
      //this.vdata = response.data;
    }else {
      this.message = response['message'];
      this.dialog.open(DialogDynamicComponent,
        {
          width: '450px',
          data: {message:this.message}
        });
    } },
    error => this.errorMsg = error);
  }
  apidocdownloads() {
    //api
    this._PublisherToolsApiDocService.getApiDocDataPdf(localStorage.getItem('uniq_id')).subscribe((response) => {
      //console.log(response);
      window.open(URL.createObjectURL(response.data));
      if (response['status_code'] == '200') {

        this.message = response['message'];
          this.dialog.open(DialogDynamicComponent,
            {
              width: '450px',
              data: {message:this.message}
            });
        } else {
          this.message = response['message'];
          this.dialog.open(DialogDynamicComponent,
            {
              width: '450px',
              data: {message:this.message}
            });
        }

      },
        error => this.errorMsg = error);
  }
  downloadPdf() {
    this.isSpinnerVisible = true;
    this._PublisherToolsApiDocService.downloadPdfName(localStorage.getItem('uniq_id'))
      .subscribe(dataResult => {
       // console.log(dataResult);
        this.isSpinnerVisible = false;
        if (dataResult['status_code'] == '200') {
          const pdfName = dataResult['data'];
          console.log(pdfName);
          const pdfUrl = AppSettings.API_STARTPOINT+'/assets/api/admin/user/tools/upload/'+pdfName;
          saveAs(pdfUrl, pdfName);

          this.message = dataResult['message'];
          this.dialog.open(DialogDynamicComponent,
            {
              width: '450px',
              data: {message:this.message}
            });
        } else {
          this.message = dataResult['message'];
          this.dialog.open(DialogDynamicComponent,
            {
              width: '450px',
              data: {message:this.message}
            });
        }

      },
        error => this.errorMsg = error);


  }

  downloadVideoPdf() {
    this.isSpinnerVisible = true;
    this._PublisherToolsApiDocService.getApivideoDataPdf(localStorage.getItem('uniq_id'))
      .subscribe(dataResult => {
       // console.log(dataResult);
        this.isSpinnerVisible = false;
        if (dataResult['status_code'] == '200') {
          const pdfName = dataResult['data'];
          console.log(pdfName);
          const pdfUrl = AppSettings.API_STARTPOINT+'/assets/api/admin/user/tools/upload/'+pdfName;
          saveAs(pdfUrl, pdfName);

          this.message = dataResult['message'];
          this.dialog.open(DialogDynamicComponent,
            {
              width: '450px',
              data: {message:this.message}
            });
        } else {
          this.message = dataResult['message'];
          this.dialog.open(DialogDynamicComponent,
            {
              width: '450px',
              data: {message:this.message}
            });
        }

      },
        error => this.errorMsg = error);


  }

  copyInputMessage(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);

  }


}
