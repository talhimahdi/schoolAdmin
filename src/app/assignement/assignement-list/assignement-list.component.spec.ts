import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignementListComponent } from './assignement-list.component';

describe('AssignementListComponent', () => {
  let component: AssignementListComponent;
  let fixture: ComponentFixture<AssignementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignementListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
