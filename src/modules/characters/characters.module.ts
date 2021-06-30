import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from './../../shared/shared.module';
import { HogwartsService } from '../hogwarts/services/hogwarts.service';
import { CharactersController } from './controller/characters.controller';
import { Characters } from './models/characters.entity';
import { CharactersService } from './services/characters.service';

@Module({
  imports: [SharedModule, TypeOrmModule.forFeature([Characters])],
  providers: [CharactersService, HogwartsService],
  controllers: [CharactersController],
})
export class CharactersModule {}
