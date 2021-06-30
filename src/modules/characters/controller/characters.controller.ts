import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiProperty, ApiResponse } from '@nestjs/swagger';
import { Characters } from '../models/characters.entity';
import { CreateCharactersDto } from '../models/dto/create-characters.dto';
import { CharactersService } from '../services/characters.service';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Post('/characters')
  @ApiProperty({ type: CreateCharactersDto })
  @ApiBody({
    type: CreateCharactersDto,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Characters,
    description: 'fetch characters by query',
  })
  async createCharacters(
    @Body() charactersData: CreateCharactersDto,
  ): Promise<Characters> {
    const houses = await this.charactersService
      .create(charactersData)
      .then((response: Characters) => {
        return response;
      });

    return houses;
  }
}
