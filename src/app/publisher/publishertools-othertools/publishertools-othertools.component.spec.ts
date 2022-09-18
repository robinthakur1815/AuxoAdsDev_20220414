import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { PublisherToolsOtherToolsComponent } from './publishertools-othertools.component';

describe('PublisherToolsOtherToolsComponent', () => {
    let component: PublisherToolsOtherToolsComponent;
    let fixture: ComponentFixture<PublisherToolsOtherToolsComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ PublisherToolsOtherToolsComponent ],
        imports: [
          FormsModule,
          NgxDaterangepickerMd.forRoot(),
          MatToolbarModule
        ]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(PublisherToolsOtherToolsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });