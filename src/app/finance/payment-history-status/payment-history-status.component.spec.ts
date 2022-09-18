import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { PaymentHistoryStatusComponent } from './payment-history-status.component';

describe('PaymentHistoryStatusComponent', () => {
    let component: PaymentHistoryStatusComponent;
    let fixture: ComponentFixture<PaymentHistoryStatusComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ PaymentHistoryStatusComponent ],
        imports: [
          FormsModule,
          NgxDaterangepickerMd.forRoot(),
          MatToolbarModule
        ]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(PaymentHistoryStatusComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });