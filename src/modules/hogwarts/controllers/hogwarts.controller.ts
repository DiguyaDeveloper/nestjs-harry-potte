import { Controller, Get, HttpStatus } from '@nestjs/common';
import { HogwartsService } from '../services/hogwarts.service';
import { ApiResponse } from '@nestjs/swagger';
import { Houses } from '../models/houses';

@Controller('hogwarts')
export class HogwartsController {
  constructor(private readonly hogwartsService: HogwartsService) {}

  @Get('/users')
  @ApiResponse({
    status: HttpStatus.OK,
    type: Houses,
    description: 'fetch users by query',
  })
  async getUsers(): Promise<Houses[]> {
    const houses = await this.hogwartsService
      .getHogwartsHouses()
      .then((response: Houses[]) => {
        return response;
      });

    return houses;
  }
}
