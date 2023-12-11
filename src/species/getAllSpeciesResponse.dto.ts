import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsArray,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { SpeciesDTO } from './species.dto';

export class GetAllSpeciesResponseDTO {
  @ApiProperty({ description: 'The total number of species available.' })
  @IsNumber()
  count: number;

  @ApiProperty({
    description: 'URL to the next page of species, if available.',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  next: string | null;

  @ApiProperty({
    description: 'URL to the previous page of species, if available.',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  previous: string | null;

  @ApiProperty({ description: 'Array of species data.', type: [SpeciesDTO] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SpeciesDTO)
  results: SpeciesDTO[];
}
