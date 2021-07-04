import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Houses } from './../../../modules/hogwarts/models/houses';
import { HogwartsService } from './../../../modules/hogwarts/services/hogwarts.service';
import { DeleteResult, Repository } from 'typeorm';
import { Logger } from 'winston';
import { CharactersInterface } from '../interfaces/characters.interface';
import { Characters } from '../models/characters.entity';
import { CharactersDto } from '../models/dto/characters.dto';
import { CreateCharactersDto } from '../models/dto/create-characters.dto';

@Injectable()
export class CharactersService implements CharactersInterface {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    @InjectRepository(Characters) private readonly repo: Repository<Characters>,
    private readonly hogwartsService: HogwartsService,
  ) {}
  async create(characterDto: CreateCharactersDto): Promise<Characters> {
    let house;
    let houseToCreate: Houses;
    let character: Characters;

    try {
      house = await this.hogwartsService.getHogwartsHouses();
    } catch (error) {
      console.log('error', error);
      this.logger.error('Find Houses');
    }

    for (const iterator of house) {
      if (iterator.id === characterDto.school) {
        houseToCreate = iterator;
      }
    }

    console.log(houseToCreate);
    if (house) {
      character = new Characters(
        characterDto.name,
        characterDto.role,
        houseToCreate.school,
        houseToCreate.name,
        characterDto.patronus,
      );
    }

    try {
      this.logger.info('Calling repository create()', {
        controller: CharactersService.name,
      });

      const characters = await this.repo.save(character);
      return characters;
    } catch (error) {
      console.log('error', error);
      this.logger.error('Find Characters');
    }
  }
  async update(characterDto: CharactersDto): Promise<Characters> {
    try {
      this.logger.info('Calling repository update()', {
        controller: CharactersService.name,
      });

      const id = characterDto.id;
      const characters = await this.repo.save({ ...characterDto, id });
      return characters;
    } catch (error) {
      console.log('error', error);
      this.logger.error('Find Characters');
    }
  }
  async delete(id: string): Promise<DeleteResult> {
    try {
      this.logger.info('Calling repository delete()', {
        controller: CharactersService.name,
      });

      const characters = await this.repo.delete(id);
      return characters;
    } catch (error) {
      console.log('error', error);
      this.logger.error('Find Characters');
    }
  }

  async findAll(): Promise<Characters[]> {
    try {
      this.logger.info('Calling repository getAll()', {
        controller: CharactersService.name,
      });

      const characters = await this.repo.find();
      return characters;
    } catch (error) {
      console.log('error', error);
      this.logger.error('Find Characters');
    }
  }
  async findById(id: string): Promise<Characters> {
    try {
      this.logger.info('Calling repository getById()', {
        controller: CharactersService.name,
      });

      const characters = await this.repo.findOneOrFail(id);
      return characters;
    } catch (error) {
      console.log('error', error);
      this.logger.error('Find Characters');
    }
  }
}
