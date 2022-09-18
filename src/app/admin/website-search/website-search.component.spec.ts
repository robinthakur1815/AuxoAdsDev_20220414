import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { WebsiteSearchComponent } from './website-search.component';

describe('WebsiteSearchComponent', () => {
    let component: WebsiteSearchComponent;
    let fixture: ComponentFixture<WebsiteSearchComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ WebsiteSearchComponent ],
        imports: [
          FormsModule,
          NgxDaterangepickerMd.forRoot(),
          MatToolbarModule
        ]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(WebsiteSearchComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });