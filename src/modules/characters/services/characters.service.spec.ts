import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import { Repository } from 'typeorm';
import { MockType, repositoryMockFactory } from '../../../../test/mocktype';
import { SharedModule } from '../../../shared/shared.module';
import { HogwartsService } from '../../hogwarts/services/hogwarts.service';
import { Characters } from '../models/characters.entity';
import { CharactersDto } from '../models/dto/characters.dto';
import { CreateCharactersDto } from '../models/dto/create-characters.dto';
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

  describe('CharactersService', () => {
    it('should create characters"', () => {
      spyOn(service, 'create').and.returnValue({});

      const mockCreateCharactersDto: CreateCharactersDto = {
        name: 'diego',
        role: 'role',
        school: 'school',
        patronus: 'patronus',
      };
      const spyReturn = service.create(mockCreateCharactersDto);
      expect(spyReturn).toEqual({});
    });

    it('should findById characters"', () => {
      spyOn(service, 'findById').and.returnValue({});

      const spyReturn = service.findById('1');
      expect(spyReturn).toEqual({});
    });

    it('should findAll characters"', () => {
      spyOn(service, 'findAll').and.returnValue([{}]);

      const spyReturn = service.findAll();
      expect(spyReturn).toEqual([{}]);
    });

    it('should delete characters"', () => {
      spyOn(service, 'delete').and.returnValue({});

      const spyReturn = service.delete('1');
      expect(spyReturn).toEqual({});
    });

    it('should update characters"', () => {
      spyOn(service, 'update').and.returnValue({});

      const mockCharactersDto: CharactersDto = {
        id: '1',
        name: 'diego',
        role: 'role',
        school: 'school',
        house: 'house',
        patronus: 'patronus',
      };
      const spyReturn = service.update(mockCharactersDto);
      expect(spyReturn).toEqual({});
    });
  });
});
