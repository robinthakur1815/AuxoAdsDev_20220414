import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { BCRMonthsComponent } from './bcr-months.component';

describe('BCRMonthsComponent', () => {
    let component: BCRMonthsComponent;
    let fixture: ComponentFixture<BCRMonthsComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ BCRMonthsComponent ],
        imports: [
          FormsModule,
          NgxDaterangepickerMd.forRoot(),
          MatToolbarModule
        ]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(BCRMonthsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });