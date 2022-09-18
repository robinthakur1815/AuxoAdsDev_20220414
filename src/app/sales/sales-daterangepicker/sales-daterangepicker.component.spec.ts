import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { SalesDateRangePickerComponent } from './sales-daterangepicker.component';

describe('SalesDateRangePickerComponent', () => {
    let component: SalesDateRangePickerComponent;
    let fixture: ComponentFixture<SalesDateRangePickerComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ SalesDateRangePickerComponent ],
        imports: [
          FormsModule,
          NgxDaterangepickerMd.forRoot(),
          MatToolbarModule
        ]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(SalesDateRangePickerComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });