import { ApiProperty } from '@nestjs/swagger';

export class CreateCharactersDto {
  @ApiProperty({
    type: String,
  })
  name: string;
  @ApiProperty({
    type: String,
  })
  role: string;
  @ApiProperty({
    type: String,
  })
  school: string;
  @ApiProperty({
    type: String,
  })
  patronus: string;
}
