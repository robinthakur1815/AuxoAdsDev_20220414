import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { DashboardBenchmarkAdminComponent } from './dashboard-benchmark-admin.component';

describe('DashboardBenchmarkAdminComponent', () => {
    let component: DashboardBenchmarkAdminComponent;
    let fixture: ComponentFixture<DashboardBenchmarkAdminComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ DashboardBenchmarkAdminComponent ],
        imports: [
          FormsModule,
          NgxDaterangepickerMd.forRoot(),
          MatToolbarModule
        ]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(DashboardBenchmarkAdminComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });