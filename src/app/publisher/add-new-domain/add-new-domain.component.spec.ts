import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { AddNewDomainComponent } from './add-new-domain.component';

describe('AddNewDomainComponent', () => {
    let component: AddNewDomainComponent;
    let fixture: ComponentFixture<AddNewDomainComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ AddNewDomainComponent ],
        imports: [
          FormsModule,
          NgxDaterangepickerMd.forRoot(),
          MatToolbarModule
        ]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(AddNewDomainComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });