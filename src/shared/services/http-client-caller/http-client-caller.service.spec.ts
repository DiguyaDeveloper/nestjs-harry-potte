import { HttpModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpClientCallerService } from './http-client-caller.service';

describe('HttpClientCallerService', () => {
  let service: HttpClientCallerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [HttpClientCallerService],
    }).compile();

    service = module.get<HttpClientCallerService>(HttpClientCallerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
