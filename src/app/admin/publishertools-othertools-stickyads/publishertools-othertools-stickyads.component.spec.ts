import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { PublisherToolsOtherToolsStickyAdsComponent } from './publishertools-othertools-stickyads.component';

describe('PublisherToolsOtherToolsStickyAdsComponent', () => {
    let component: PublisherToolsOtherToolsStickyAdsComponent;
    let fixture: ComponentFixture<PublisherToolsOtherToolsStickyAdsComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ PublisherToolsOtherToolsStickyAdsComponent ],
        imports: [
          FormsModule,
          NgxDaterangepickerMd.forRoot(),
          MatToolbarModule
        ]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(PublisherToolsOtherToolsStickyAdsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });