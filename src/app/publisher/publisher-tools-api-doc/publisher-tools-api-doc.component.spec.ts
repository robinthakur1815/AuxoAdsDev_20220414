import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublisherToolsApiDocComponent } from './publisher-tools-api-doc.component';

describe('PublisherToolsApiDocComponent', () => {
  let component: PublisherToolsApiDocComponent;
  let fixture: ComponentFixture<PublisherToolsApiDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublisherToolsApiDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublisherToolsApiDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
