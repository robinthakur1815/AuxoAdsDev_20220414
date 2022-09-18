import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { GenerateTagComponent } from './generate-tag.component';

describe('GenerateTagComponent', () => {
    let component: GenerateTagComponent;
    let fixture: ComponentFixture<GenerateTagComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ GenerateTagComponent ],
        imports: [
          FormsModule,
          NgxDaterangepickerMd.forRoot(),
          MatToolbarModule
        ]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(GenerateTagComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });