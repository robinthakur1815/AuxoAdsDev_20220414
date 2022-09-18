import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { OBMDashboardComponent } from './obm-dashboard.component';

describe('OBMDashboardComponent', () => {
    let component: OBMDashboardComponent;
    let fixture: ComponentFixture<OBMDashboardComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ OBMDashboardComponent ],
        imports: [
          FormsModule,
          NgxDaterangepickerMd.forRoot(),
          MatToolbarModule
        ]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(OBMDashboardComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });