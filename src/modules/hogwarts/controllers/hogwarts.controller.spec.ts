import { Test, TestingModule } from '@nestjs/testing';
import { SharedModule } from '../../../shared/shared.module';
import { HogwartsModule } from '../hogwarts.module';
import { HogwartsService } from '../services/hogwarts.service';
import { HogwartsController } from './hogwarts.controller';

describe('HogwartsController', () => {
  let controller: HogwartsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HogwartsModule, SharedModule],
      providers: [HogwartsService],
      controllers: [HogwartsController],
    }).compile();

    controller = module.get<HogwartsController>(HogwartsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
