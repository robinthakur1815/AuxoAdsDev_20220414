import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { AdsenseDeviceComponent } from './adsense-device.component';

describe('AdsenseDeviceComponent', () => {
    let component: AdsenseDeviceComponent;
    let fixture: ComponentFixture<AdsenseDeviceComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ AdsenseDeviceComponent ],
        imports: [
          FormsModule,
          NgxDaterangepickerMd.forRoot(),
          MatToolbarModule
        ]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(AdsenseDeviceComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });