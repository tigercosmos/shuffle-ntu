import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewstoryComponent } from './newstory.component';

describe('NewstoryComponent', () => {
  let component: NewstoryComponent;
  let fixture: ComponentFixture<NewstoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewstoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewstoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
