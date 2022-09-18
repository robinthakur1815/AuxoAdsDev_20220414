import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { DashboardFinanceComponent } from './dashboard-finance.component';

describe('DashboardFinanceComponent', () => {
    let component: DashboardFinanceComponent;
    let fixture: ComponentFixture<DashboardFinanceComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ DashboardFinanceComponent ],
        imports: [
          FormsModule,
          NgxDaterangepickerMd.forRoot(),
          MatToolbarModule
        ]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(DashboardFinanceComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });