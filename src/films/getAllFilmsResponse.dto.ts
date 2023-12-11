import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsArray,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { FilmDTO } from './film.dto';

export class GetAllFilmsResponseDTO {
  @ApiProperty({ description: 'The total number of films available.' })
  @IsNumber()
  count: number;

  @ApiProperty({
    description: 'URL to the next page of films, if available.',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  next: string | null;

  @ApiProperty({
    description: 'URL to the previous page of films, if available.',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  previous: string | null;

  @ApiProperty({ description: 'Array of film data.', type: [FilmDTO] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FilmDTO)
  results: FilmDTO[];
}
