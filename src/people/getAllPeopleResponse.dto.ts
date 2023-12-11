import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsArray,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PeopleDTO } from './people.dto';

export class GetAllPeopleResponseDTO {
  @ApiProperty({ description: 'The total number of people available.' })
  @IsNumber()
  count: number;

  @ApiProperty({
    description: 'URL to the next page of people, if available.',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  next: string | null;

  @ApiProperty({
    description: 'URL to the previous page of people, if available.',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  previous: string | null;

  @ApiProperty({ description: 'Array of people data.', type: [PeopleDTO] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PeopleDTO)
  results: PeopleDTO[];
}
