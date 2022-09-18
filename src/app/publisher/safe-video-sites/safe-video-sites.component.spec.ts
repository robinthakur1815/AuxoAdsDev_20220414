import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { SafeRevenueVideoSitesComponent } from './safe-Video-sites.component';

describe('SafeRevenueVideoSitesComponent', () => {
    let component: SafeRevenueVideoSitesComponent;
    let fixture: ComponentFixture<SafeRevenueVideoSitesComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ SafeRevenueVideoSitesComponent ],
        imports: [
          FormsModule,
          NgxDaterangepickerMd.forRoot(),
          MatToolbarModule
        ]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(SafeRevenueVideoSitesComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });