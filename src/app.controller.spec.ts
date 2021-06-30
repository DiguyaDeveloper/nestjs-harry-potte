import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { HttpModule } from '@nestjs/common';

class AppControllerMock {
  get() {
    return 'Hellow World';
  }
}

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const AppControllerProvider = {
      provide: AppController,
      useClass: AppControllerMock,
    };
    const AppServiceProvider = {
      provide: AppService,
      useValue: {
        getHello: jest.fn(),
      },
    };

    const app: TestingModule = await Test.createTestingModule({
      imports: [AppModule, HttpModule, SharedModule],
      controllers: [AppController],
      providers: [
        AppService,
        AppControllerProvider,
        AppServiceProvider,
        HttpModule,
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
