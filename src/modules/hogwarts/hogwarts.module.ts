import { Module } from '@nestjs/common';
import { SharedModule } from './../../shared/shared.module';
import { HogwartsController } from './controllers/hogwarts.controller';
import { HogwartsService } from './services/hogwarts.service';

@Module({
  imports: [SharedModule],
  providers: [HogwartsService],
  controllers: [HogwartsController],
})
export class HogwartsModule {}
