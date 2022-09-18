import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { OBMAdManagerPublisherDetailsComponent } from './obm-admanager-invite-publisherdetails.component';

describe('OBMAdManagerPublisherDetailsComponent', () => {
    let component: OBMAdManagerPublisherDetailsComponent;
    let fixture: ComponentFixture<OBMAdManagerPublisherDetailsComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ OBMAdManagerPublisherDetailsComponent ],
        imports: [
          FormsModule,
          NgxDaterangepickerMd.forRoot(),
          MatToolbarModule
        ]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(OBMAdManagerPublisherDetailsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });