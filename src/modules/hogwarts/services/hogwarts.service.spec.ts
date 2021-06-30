import { HttpModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { WinstonModule } from 'nest-winston';
import { HttpClientCallerService } from '../../../shared/services/http-client-caller/http-client-caller.service';
import { SharedModule } from '../../../shared/shared.module';
import { HogwartsModule } from '../hogwarts.module';
import { HogwartsService } from './hogwarts.service';

fdescribe('HogwartsService', () => {
  let service: HogwartsService;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const stubHttpClientCallerService = () => {};
  const mockedLogger = { setContext: jest.fn(), log: jest.fn() };
  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HogwartsModule,
        HttpModule,
        SharedModule,
        WinstonModule.forRoot({}),
      ],
      providers: [
        {
          provide: HttpClientCallerService,
          useFactory: stubHttpClientCallerService,
        },
      ],
    }).compile();

    service = module.get<HogwartsService>(HogwartsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
