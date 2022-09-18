import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { NetworkSitesComponent } from './network-sites.component'; 

describe('NetworkSitesComponent', () => {
    let component: NetworkSitesComponent;
    let fixture: ComponentFixture<NetworkSitesComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ NetworkSitesComponent ],
        imports: [
          FormsModule,
          NgxDaterangepickerMd.forRoot(),
          MatToolbarModule
        ]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(NetworkSitesComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });