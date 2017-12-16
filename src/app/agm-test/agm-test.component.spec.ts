import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgmTestComponent } from './agm-test.component';

describe('AgmTestComponent', () => {
  let component: AgmTestComponent;
  let fixture: ComponentFixture<AgmTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgmTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgmTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
