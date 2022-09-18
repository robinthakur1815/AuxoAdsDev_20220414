import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { ProDashboardDisplayDeviceComponent } from './prodashboard-display-device.component';

describe('ProDashboardDisplayDeviceComponent', () => {
    let component: ProDashboardDisplayDeviceComponent;
    let fixture: ComponentFixture<ProDashboardDisplayDeviceComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ ProDashboardDisplayDeviceComponent ],
        imports: [
          FormsModule,
          NgxDaterangepickerMd.forRoot(),
          MatToolbarModule
        ]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(ProDashboardDisplayDeviceComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });