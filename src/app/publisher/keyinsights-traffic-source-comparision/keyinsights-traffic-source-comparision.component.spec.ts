import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { keyinsightsTrafficSourceComparisionComponent } from './keyinsights-traffic-source-comparision.component';

describe('keyinsightsTrafficSourceComparisionComponent', () => {
    let component: keyinsightsTrafficSourceComparisionComponent;
    let fixture: ComponentFixture<keyinsightsTrafficSourceComparisionComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ keyinsightsTrafficSourceComparisionComponent ],
        imports: [
          FormsModule,
          NgxDaterangepickerMd.forRoot(),
          MatToolbarModule
        ]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(keyinsightsTrafficSourceComparisionComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });