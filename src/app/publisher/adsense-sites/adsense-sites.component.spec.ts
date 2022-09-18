import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { AdsenseSitesComponent } from './adsense-sites.component';

describe('AdsenseSitesComponent', () => {
    let component: AdsenseSitesComponent;
    let fixture: ComponentFixture<AdsenseSitesComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ AdsenseSitesComponent ],
        imports: [
          FormsModule,
          NgxDaterangepickerMd.forRoot(),
          MatToolbarModule
        ]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(AdsenseSitesComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });