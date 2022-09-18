import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { NetworkPartnerProfileComponent } from './network-partner-profile.component';

describe('NetworkPartnerProfileComponent', () => {
    let component: NetworkPartnerProfileComponent;
    let fixture: ComponentFixture<NetworkPartnerProfileComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ NetworkPartnerProfileComponent ],
        imports: [
          FormsModule,
          NgxDaterangepickerMd.forRoot(),
          MatToolbarModule
        ]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(NetworkPartnerProfileComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });