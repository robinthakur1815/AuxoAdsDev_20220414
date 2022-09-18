import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { PublisherToolsOtherToolsDfpRefreshTagComponent } from './publishertools-othertools-dfp-refresh-tag.component';

describe('PublisherToolsOtherToolsDfpRefreshTagComponent', () => {
    let component: PublisherToolsOtherToolsDfpRefreshTagComponent;
    let fixture: ComponentFixture<PublisherToolsOtherToolsDfpRefreshTagComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ PublisherToolsOtherToolsDfpRefreshTagComponent ],
        imports: [
          FormsModule,
          NgxDaterangepickerMd.forRoot(),
          MatToolbarModule
        ]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(PublisherToolsOtherToolsDfpRefreshTagComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });