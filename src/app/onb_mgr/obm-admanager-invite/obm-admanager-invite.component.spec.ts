import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { OBMAdmanagerComponent } from './obm-admanager-invite.component';

describe('OBMAdmanagerComponent', () => {
    let component: OBMAdmanagerComponent;
    let fixture: ComponentFixture<OBMAdmanagerComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ OBMAdmanagerComponent ],
        imports: [
          FormsModule,
          NgxDaterangepickerMd.forRoot(),
          MatToolbarModule
        ]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(OBMAdmanagerComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });