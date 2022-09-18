import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { ProDashboardDisplayOverviewComponent } from './prodashboard-display-overview.component';

describe('ProDashboardDisplayOverviewComponent', () => {
    let component: ProDashboardDisplayOverviewComponent;
    let fixture: ComponentFixture<ProDashboardDisplayOverviewComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ ProDashboardDisplayOverviewComponent ],
        imports: [
          FormsModule,
          NgxDaterangepickerMd.forRoot(),
          MatToolbarModule
        ]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(ProDashboardDisplayOverviewComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });