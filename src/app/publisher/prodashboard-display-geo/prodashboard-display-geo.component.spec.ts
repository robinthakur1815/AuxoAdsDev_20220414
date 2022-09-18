import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { ProDashboardDisplayGeoComponent } from './prodashboard-display-geo.component';

describe('ProDashboardDisplayGeoComponent', () => {
    let component: ProDashboardDisplayGeoComponent;
    let fixture: ComponentFixture<ProDashboardDisplayGeoComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ ProDashboardDisplayGeoComponent ],
        imports: [
          FormsModule,
          NgxDaterangepickerMd.forRoot(),
          MatToolbarModule
        ]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(ProDashboardDisplayGeoComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });