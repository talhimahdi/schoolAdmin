import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasseListComponent } from '../classe-list/classe-list.component';

describe('ClasseComponent', () => {
  let component: ClasseListComponent;
  let fixture: ComponentFixture<ClasseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasseListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
