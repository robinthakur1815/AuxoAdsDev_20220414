import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { AutomatedInvoiceVideoComponent } from './automated-invoice-video.component';

describe('AutomatedInvoiceVideoComponent', () => {
    let component: AutomatedInvoiceVideoComponent;
    let fixture: ComponentFixture<AutomatedInvoiceVideoComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ AutomatedInvoiceVideoComponent ],
        imports: [
          FormsModule,
          NgxDaterangepickerMd.forRoot(),
          MatToolbarModule
        ]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(AutomatedInvoiceVideoComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });