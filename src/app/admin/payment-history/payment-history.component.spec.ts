import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { PaymentHistoryComponent } from './payment-history.component';

describe('PaymentHistoryComponent', () => {
    let component: PaymentHistoryComponent;
    let fixture: ComponentFixture<PaymentHistoryComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ PaymentHistoryComponent ],
        imports: [
          FormsModule,
          NgxDaterangepickerMd.forRoot(),
          MatToolbarModule
        ]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(PaymentHistoryComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });