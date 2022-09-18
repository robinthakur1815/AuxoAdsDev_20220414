import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { SalesUsersComponent } from './users-role.component';

describe('SalesUsersComponent', () => {
    let component: SalesUsersComponent;
    let fixture: ComponentFixture<SalesUsersComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ SalesUsersComponent ],
        imports: [
          FormsModule,
          NgxDaterangepickerMd.forRoot(),
          MatToolbarModule
        ]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(SalesUsersComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });