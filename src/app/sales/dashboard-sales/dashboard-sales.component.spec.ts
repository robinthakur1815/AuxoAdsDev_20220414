import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { DashboardSalesComponent } from './dashboard-sales.component';

describe('DashboardSalesComponent', () => {
    let component: DashboardSalesComponent;
    let fixture: ComponentFixture<DashboardSalesComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ DashboardSalesComponent ],
        imports: [
          FormsModule,
          NgxDaterangepickerMd.forRoot(),
          MatToolbarModule
        ]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(DashboardSalesComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });