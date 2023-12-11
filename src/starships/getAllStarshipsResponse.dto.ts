import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsArray,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { StarshipDto } from './starship.dto';

export class GetAllStarshipsResponseDTO {
  @ApiProperty({ description: 'The total number of starships available.' })
  @IsNumber()
  count: number;

  @ApiProperty({
    description: 'URL to the next page of starships, if available.',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  next: string | null;

  @ApiProperty({
    description: 'URL to the previous page of starships, if available.',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  previous: string | null;

  @ApiProperty({ description: 'Array of starship data.', type: [StarshipDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StarshipDto)
  results: StarshipDto[];
}
