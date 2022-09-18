import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { NetworkRevenueDisplayMobileOsComponent } from './network-revenue-display-mobileos.component';

describe('NetworkRevenueDisplayMobileOsComponent', () => {
    let component: NetworkRevenueDisplayMobileOsComponent;
    let fixture: ComponentFixture<NetworkRevenueDisplayMobileOsComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ NetworkRevenueDisplayMobileOsComponent ],
        imports: [
          FormsModule,
          NgxDaterangepickerMd.forRoot(),
          MatToolbarModule
        ]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(NetworkRevenueDisplayMobileOsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });