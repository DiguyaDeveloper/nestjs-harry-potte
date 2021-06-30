import { Test, TestingModule } from '@nestjs/testing';
import { CharactersService } from '../services/characters.service';
import { CharactersController } from './characters.controller';

fdescribe('CharactersController', () => {
  let controller: CharactersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CharactersController, CharactersService],
    }).compile();

    controller = module.get<CharactersController>(CharactersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
