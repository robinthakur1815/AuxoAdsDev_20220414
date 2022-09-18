import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { AutomatedInvoiceContentComponent } from './automated-invoice-content.component';

describe('AutomatedInvoiceContentComponent', () => {
    let component: AutomatedInvoiceContentComponent;
    let fixture: ComponentFixture<AutomatedInvoiceContentComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ AutomatedInvoiceContentComponent ],
        imports: [
          FormsModule,
          NgxDaterangepickerMd.forRoot(),
          MatToolbarModule
        ]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(AutomatedInvoiceContentComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });