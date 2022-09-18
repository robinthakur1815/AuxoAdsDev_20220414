import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { OBMAdmanagerDomainComponent } from './obm-admanager-domain.component';

describe('OBMAdmanagerDomainComponent', () => {
    let component: OBMAdmanagerDomainComponent;
    let fixture: ComponentFixture<OBMAdmanagerDomainComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ OBMAdmanagerDomainComponent ],
        imports: [
          FormsModule,
          NgxDaterangepickerMd.forRoot(),
          MatToolbarModule
        ]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(OBMAdmanagerDomainComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });