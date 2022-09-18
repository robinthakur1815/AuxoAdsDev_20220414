import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { SafeRevenueVideoAdtypesComponent } from './safe-video-adtypes.component';

describe('SafeRevenueVideoAdtypesComponent', () => {
    let component: SafeRevenueVideoAdtypesComponent;
    let fixture: ComponentFixture<SafeRevenueVideoAdtypesComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ SafeRevenueVideoAdtypesComponent ],
        imports: [
          FormsModule,
          NgxDaterangepickerMd.forRoot(),
          MatToolbarModule
        ]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(SafeRevenueVideoAdtypesComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });