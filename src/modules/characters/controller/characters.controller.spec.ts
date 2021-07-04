/* eslint-disable @typescript-eslint/no-empty-function */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import { SharedModule } from '../../../shared/shared.module';
import { HogwartsService } from '../../hogwarts/services/hogwarts.service';
import { Characters } from '../models/characters.entity';
import { CreateCharactersDto } from '../models/dto/create-characters.dto';
import { CharactersService } from '../services/characters.service';
import { CharactersController } from './characters.controller';

describe('CharactersController', () => {
  let controller: CharactersController;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const stubCharactersService = {
      provide: CharactersService,
      useFactory: () => {},
    };
    const stubHogwartsService = {
      provide: HogwartsService,
      useFactory: () => {},
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CharactersController, CharactersService],
      imports: [WinstonModule.forRoot({}), SharedModule],
      providers: [
        stubCharactersService,
        stubHogwartsService,
        {
          provide: getRepositoryToken(Characters),
          useValue: mockRepository,
        },
      ],
    }).compile();

    controller = module.get<CharactersController>(CharactersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be call create', () => {
    spyOn(controller, 'createCharacters').and.returnValue({});

    const request: CreateCharactersDto = {
      name: '',
      role: '',
      school: '',
      patronus: '',
    };
    const req = controller.createCharacters(request);
    expect(controller).toEqual(req);
  });
});
