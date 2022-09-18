import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { SafeRevenueDisplayAdtypesComponent } from './safe-display-adtypes.component';

describe('SafeRevenueDisplayAdtypesComponent', () => {
    let component: SafeRevenueDisplayAdtypesComponent;
    let fixture: ComponentFixture<SafeRevenueDisplayAdtypesComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ SafeRevenueDisplayAdtypesComponent ],
        imports: [
          FormsModule,
          NgxDaterangepickerMd.forRoot(),
          MatToolbarModule
        ]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(SafeRevenueDisplayAdtypesComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });