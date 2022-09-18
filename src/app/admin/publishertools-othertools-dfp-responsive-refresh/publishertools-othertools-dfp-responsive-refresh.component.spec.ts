import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { PublisherToolsOtherToolsDfpResponsiveRefreshComponent } from './publishertools-othertools-dfp-responsive-refresh.component';

describe('PublisherToolsOtherToolsDfpResponsiveRefreshComponent', () => {
    let component: PublisherToolsOtherToolsDfpResponsiveRefreshComponent;
    let fixture: ComponentFixture<PublisherToolsOtherToolsDfpResponsiveRefreshComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ PublisherToolsOtherToolsDfpResponsiveRefreshComponent ],
        imports: [
          FormsModule,
          NgxDaterangepickerMd.forRoot(),
          MatToolbarModule
        ]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(PublisherToolsOtherToolsDfpResponsiveRefreshComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });