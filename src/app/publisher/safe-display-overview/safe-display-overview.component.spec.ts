import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { SafeDisplayOverviewComponent } from './safe-display-overview.component'; 

describe('SafeDisplayOverviewComponent', () => {
    let component: SafeDisplayOverviewComponent;
    let fixture: ComponentFixture<SafeDisplayOverviewComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ SafeDisplayOverviewComponent ],
        imports: [
          FormsModule,
          NgxDaterangepickerMd.forRoot(),
          MatToolbarModule
        ]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(SafeDisplayOverviewComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });