import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsArray,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PlanetDTO } from './planet.dto';

export class GetAllPlanetsResponseDTO {
  @ApiProperty({ description: 'The total number of planets available.' })
  @IsNumber()
  count: number;

  @ApiProperty({
    description: 'URL to the next page of planets, if available.',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  next: string | null;

  @ApiProperty({
    description: 'URL to the previous page of planets, if available.',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  previous: string | null;

  @ApiProperty({ description: 'Array of planet data.', type: [PlanetDTO] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PlanetDTO)
  results: PlanetDTO[];
}
