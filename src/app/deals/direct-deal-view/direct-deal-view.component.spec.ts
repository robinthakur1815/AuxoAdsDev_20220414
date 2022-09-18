import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { DirectDealViewComponent } from './direct-deal-view.component';

describe('DirectDealViewComponent', () => {
    let component: DirectDealViewComponent;
    let fixture: ComponentFixture<DirectDealViewComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ DirectDealViewComponent ],
        imports: [
          FormsModule,
          NgxDaterangepickerMd.forRoot(),
          MatToolbarModule
        ]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(DirectDealViewComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });