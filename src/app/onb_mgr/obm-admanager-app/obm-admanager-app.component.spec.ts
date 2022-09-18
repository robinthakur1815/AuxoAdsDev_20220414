import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { OBMAdmanagerAppComponent } from './obm-admanager-app.component';

describe('OBMAdmanagerAppComponent', () => {
    let component: OBMAdmanagerAppComponent;
    let fixture: ComponentFixture<OBMAdmanagerAppComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ OBMAdmanagerAppComponent ],
        imports: [
          FormsModule,
          NgxDaterangepickerMd.forRoot(),
          MatToolbarModule
        ]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(OBMAdmanagerAppComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });