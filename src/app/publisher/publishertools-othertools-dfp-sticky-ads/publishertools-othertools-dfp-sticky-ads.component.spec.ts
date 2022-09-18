import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { PublisherToolsOtherToolsDfpStickyAdsComponent } from './publishertools-othertools-dfp-sticky-ads.component';

describe('PublisherToolsOtherToolsDfpStickyAdsComponent', () => {
    let component: PublisherToolsOtherToolsDfpStickyAdsComponent;
    let fixture: ComponentFixture<PublisherToolsOtherToolsDfpStickyAdsComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ PublisherToolsOtherToolsDfpStickyAdsComponent ],
        imports: [
          FormsModule,
          NgxDaterangepickerMd.forRoot(),
          MatToolbarModule
        ]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(PublisherToolsOtherToolsDfpStickyAdsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });