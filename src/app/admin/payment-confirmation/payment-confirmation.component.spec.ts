import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { PaymentConfirmationComponent } from './payment-confirmation.component';

describe('PaymentConfirmationComponent', () => {
    let component: PaymentConfirmationComponent;
    let fixture: ComponentFixture<PaymentConfirmationComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ PaymentConfirmationComponent ],
        imports: [
          FormsModule,
          NgxDaterangepickerMd.forRoot(),
          MatToolbarModule
        ]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(PaymentConfirmationComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });