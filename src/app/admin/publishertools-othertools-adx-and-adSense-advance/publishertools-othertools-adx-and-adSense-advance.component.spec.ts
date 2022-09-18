import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { PublisherToolsOtherToolsAdxAndAdsenseAdvanceComponent } from './publishertools-othertools-adx-and-adsense-advance.component';

describe('PublisherToolsOtherToolsAdxAndAdsenseAdvanceComponent', () => {
    let component: PublisherToolsOtherToolsAdxAndAdsenseAdvanceComponent;
    let fixture: ComponentFixture<PublisherToolsOtherToolsAdxAndAdsenseAdvanceComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ PublisherToolsOtherToolsAdxAndAdsenseAdvanceComponent ],
        imports: [
          FormsModule,
          NgxDaterangepickerMd.forRoot(),
          MatToolbarModule
        ]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(PublisherToolsOtherToolsAdxAndAdsenseAdvanceComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });