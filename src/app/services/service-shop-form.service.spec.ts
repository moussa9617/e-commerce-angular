import { TestBed } from '@angular/core/testing';

import { ServiceShopFormService } from './service-shop-form.service';

describe('ServiceShopFormService', () => {
  let service: ServiceShopFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceShopFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
