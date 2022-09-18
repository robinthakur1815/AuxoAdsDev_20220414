import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { SafeRevenueAppAdtypesComponent } from './safe-app-adtypes.component';

describe('SafeRevenueAppAdtypesComponent', () => {
    let component: SafeRevenueAppAdtypesComponent;
    let fixture: ComponentFixture<SafeRevenueAppAdtypesComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ SafeRevenueAppAdtypesComponent ],
        imports: [
          FormsModule,
          NgxDaterangepickerMd.forRoot(),
          MatToolbarModule
        ]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(SafeRevenueAppAdtypesComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });