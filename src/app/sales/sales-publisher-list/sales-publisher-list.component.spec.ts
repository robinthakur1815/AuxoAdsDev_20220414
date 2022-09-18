import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { SalesNetworkPartnerComponent } from './sales-publisher-list.component';

describe('SalesNetworkPartnerComponent', () => {
    let component: SalesNetworkPartnerComponent;
    let fixture: ComponentFixture<SalesNetworkPartnerComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ SalesNetworkPartnerComponent ],
        imports: [
          FormsModule,
          NgxDaterangepickerMd.forRoot(),
          MatToolbarModule
        ]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(SalesNetworkPartnerComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });