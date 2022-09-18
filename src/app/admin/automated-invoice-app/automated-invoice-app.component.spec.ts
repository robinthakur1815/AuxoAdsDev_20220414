import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { AutomatedInvoiceAppComponent } from './automated-invoice-app.component';

describe('AutomatedInvoiceAppComponent', () => {
    let component: AutomatedInvoiceAppComponent;
    let fixture: ComponentFixture<AutomatedInvoiceAppComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ AutomatedInvoiceAppComponent ],
        imports: [
          FormsModule,
          NgxDaterangepickerMd.forRoot(),
          MatToolbarModule
        ]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(AutomatedInvoiceAppComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });