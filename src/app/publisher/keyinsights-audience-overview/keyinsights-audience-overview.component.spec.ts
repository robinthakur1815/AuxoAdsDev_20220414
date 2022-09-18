import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { KeyinsightsAudienceOverviewComponent } from './keyinsights-audience-overview.component';

describe('KeyinsightsAudienceOverviewComponent', () => {
    let component: KeyinsightsAudienceOverviewComponent;
    let fixture: ComponentFixture<KeyinsightsAudienceOverviewComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ KeyinsightsAudienceOverviewComponent ],
        imports: [
          FormsModule,
          NgxDaterangepickerMd.forRoot(),
          MatToolbarModule
        ]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(KeyinsightsAudienceOverviewComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });