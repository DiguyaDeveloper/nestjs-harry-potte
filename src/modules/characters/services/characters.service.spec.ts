import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import { Repository } from 'typeorm';
import { MockType, repositoryMockFactory } from '../../../../test/mocktype';
import { SharedModule } from '../../../shared/shared.module';
import { HogwartsService } from '../../hogwarts/services/hogwarts.service';
import { Characters } from '../models/characters.entity';
import { CharactersService } from './characters.service';

describe('CharactersService', () => {
  let service: CharactersService;
  let repositoryMock: MockType<Repository<Characters>>;

  const stubHogwartsService = () => {
    // do nothing.
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SharedModule, WinstonModule.forRoot({})],
      providers: [
        CharactersService,
        {
          provide: HogwartsService,
          useFactory: stubHogwartsService,
        },
        {
          provide: getRepositoryToken(Characters),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<CharactersService>(CharactersService);
    repositoryMock = module.get(getRepositoryToken(Characters));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
