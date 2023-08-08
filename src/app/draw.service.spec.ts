/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DrawService } from './draw.service';
import { rootTopic } from 'src/Xmind/rootTopic';

describe('Service: Draw', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DrawService,rootTopic]
    });
  });

  it('should ...', inject([DrawService], (service: DrawService) => {
    expect(service).toBeTruthy();
  }));
});
