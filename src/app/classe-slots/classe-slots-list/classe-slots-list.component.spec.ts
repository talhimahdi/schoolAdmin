import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasseSlotsListComponent } from './classe-slots-list.component';

describe('ClasseSlotsListComponent', () => {
  let component: ClasseSlotsListComponent;
  let fixture: ComponentFixture<ClasseSlotsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasseSlotsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasseSlotsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
