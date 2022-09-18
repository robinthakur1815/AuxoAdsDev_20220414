import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { AdsenseAdtypesComponent } from './adsense-adtypes.component';

describe('AdsenseAdtypesComponent', () => {
    let component: AdsenseAdtypesComponent;
    let fixture: ComponentFixture<AdsenseAdtypesComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ AdsenseAdtypesComponent ],
        imports: [
          FormsModule,
          NgxDaterangepickerMd.forRoot(),
          MatToolbarModule
        ]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(AdsenseAdtypesComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });