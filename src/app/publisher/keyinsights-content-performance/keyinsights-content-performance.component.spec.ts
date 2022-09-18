import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { KeyinsightsContentPerformanceComponent } from './keyinsights-content-performance.component';

describe('KeyinsightsContentPerformanceComponent', () => {
    let component: KeyinsightsContentPerformanceComponent;
    let fixture: ComponentFixture<KeyinsightsContentPerformanceComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ KeyinsightsContentPerformanceComponent ],
        imports: [
          FormsModule,
          NgxDaterangepickerMd.forRoot(),
          MatToolbarModule
        ]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(KeyinsightsContentPerformanceComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });