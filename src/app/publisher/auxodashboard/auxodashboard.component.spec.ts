import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { AuxoDashboardComponent } from './auxodashboard.component';

describe('AuxoDashboardComponent', () => {
    let component: AuxoDashboardComponent;
    let fixture: ComponentFixture<AuxoDashboardComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ AuxoDashboardComponent ],
        imports: [
          FormsModule,
          NgxDaterangepickerMd.forRoot(),
          MatToolbarModule
        ]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(AuxoDashboardComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });