import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { PublisherToolsOtherToolsDfpResponsiveTagComponent } from './publishertools-othertools-dfp-responsive-tag.component';

describe('PublisherToolsOtherToolsDfpResponsiveTagComponent', () => {
    let component: PublisherToolsOtherToolsDfpResponsiveTagComponent;
    let fixture: ComponentFixture<PublisherToolsOtherToolsDfpResponsiveTagComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ PublisherToolsOtherToolsDfpResponsiveTagComponent ],
        imports: [
          FormsModule,
          NgxDaterangepickerMd.forRoot(),
          MatToolbarModule
        ]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(PublisherToolsOtherToolsDfpResponsiveTagComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });