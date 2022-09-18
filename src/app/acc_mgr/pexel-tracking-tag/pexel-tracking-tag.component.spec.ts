import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { PixelTrackingTagComponent } from './pexel-tracking-tag.component';

describe('PixelTrackingTagComponent', () => {
    let component: PixelTrackingTagComponent;
    let fixture: ComponentFixture<PixelTrackingTagComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ PixelTrackingTagComponent ],
        imports: [
          FormsModule,
          NgxDaterangepickerMd.forRoot(),
          MatToolbarModule
        ]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(PixelTrackingTagComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });