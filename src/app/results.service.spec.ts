import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';

import { ResultsService } from './results.service';

describe('ResultsService', () => {
  let service: ResultsService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [ResultsService]
  }));

  // beforeEach(() => {
  //   TestBed.configureTestingModule({
  //     imports: [HttpClientTestingModule],
  //     providers: [ResultsService]
  //   });
  //   // service = TestBed.inject(ResultsService);
  // });

  it('should be created', () => {
    const service: ResultsService = TestBed.inject(ResultsService);
    expect(service).toBeTruthy();
  });

  it('should have getData function', () => {
    const service: ResultsService = TestBed.inject(ResultsService);
    expect(service.getResults).toBeTruthy();
  });

});
