import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { AdsenseOverviewComponent } from './adsense-overview.component';

describe('AdsenseOverviewComponent', () => {
    let component: AdsenseOverviewComponent;
    let fixture: ComponentFixture<AdsenseOverviewComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ AdsenseOverviewComponent ],
        imports: [
          FormsModule,
          NgxDaterangepickerMd.forRoot(),
          MatToolbarModule
        ]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(AdsenseOverviewComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });