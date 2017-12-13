import { TestBed, inject } from '@angular/core/testing';

import { ClasseSlotService } from './classe-slot.service';

describe('ClasseSlotService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClasseSlotService]
    });
  });

  it('should be created', inject([ClasseSlotService], (service: ClasseSlotService) => {
    expect(service).toBeTruthy();
  }));
});
