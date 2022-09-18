import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { SalesUsersDetailedDashboardComponent } from './sales-users-detailed-dashboard.component';

describe('SalesUsersDetailedDashboardComponent', () => {
    let component: SalesUsersDetailedDashboardComponent;
    let fixture: ComponentFixture<SalesUsersDetailedDashboardComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ SalesUsersDetailedDashboardComponent ],
        imports: [
          FormsModule,
          NgxDaterangepickerMd.forRoot(),
          MatToolbarModule
        ]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(SalesUsersDetailedDashboardComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });