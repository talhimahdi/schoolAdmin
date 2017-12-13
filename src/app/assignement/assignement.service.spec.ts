import { TestBed, inject } from '@angular/core/testing';

import { AssignementService } from './assignement.service';

describe('AssignementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssignementService]
    });
  });

  it('should be created', inject([AssignementService], (service: AssignementService) => {
    expect(service).toBeTruthy();
  }));
});
