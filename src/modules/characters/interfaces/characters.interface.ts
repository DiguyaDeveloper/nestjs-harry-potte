import { DeleteResult } from 'typeorm';
import { Characters } from '../models/characters.entity';
import { CharactersDto } from '../models/dto/characters.dto';
import { CreateCharactersDto } from '../models/dto/create-characters.dto';

export interface CharactersInterface {
  findAll(): Promise<Characters[]>;
  findById(id: string): Promise<Characters>;
  create(characterDto: CreateCharactersDto): Promise<Characters>;
  update(characterDto: CharactersDto, id: string): Promise<Characters>;
  delete(id: string): Promise<DeleteResult>;
}
