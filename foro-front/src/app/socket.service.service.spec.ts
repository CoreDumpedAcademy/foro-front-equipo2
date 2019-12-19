import { TestBed } from '@angular/core/testing';

import { Socket.ServiceService } from './socket.service.service';

describe('Socket.ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Socket.ServiceService = TestBed.get(Socket.ServiceService);
    expect(service).toBeTruthy();
  });
});
