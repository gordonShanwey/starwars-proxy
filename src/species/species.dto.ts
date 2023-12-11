import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsUrl } from 'class-validator';

export class SpeciesDTO {
  @ApiProperty({ description: 'The name of this species.' })
  @IsString()
  name: string;

  @ApiProperty({
    description:
      'The classification of this species, such as "mammal" or "reptile".',
  })
  @IsString()
  classification: string;

  @ApiProperty({
    description: 'The designation of this species, such as "sentient".',
  })
  @IsString()
  designation: string;

  @ApiProperty({
    description: 'The average height of this species in centimeters.',
  })
  @IsString()
  average_height: string;

  @ApiProperty({
    description: 'The average lifespan of this species in years.',
  })
  @IsString()
  average_lifespan: string;

  @ApiProperty({
    description:
      'A comma-separated string of common eye colors for this species, "none" if this species does not typically have eyes.',
  })
  @IsString()
  eye_colors: string;

  @ApiProperty({
    description:
      'A comma-separated string of common hair colors for this species, "none" if this species does not typically have hair.',
  })
  @IsString()
  hair_colors: string;

  @ApiProperty({
    description:
      'A comma-separated string of common skin colors for this species, "none" if this species does not typically have skin.',
  })
  @IsString()
  skin_colors: string;

  @ApiProperty({ description: 'The language commonly spoken by this species.' })
  @IsString()
  language: string;

  @ApiProperty({
    description:
      'The URL of a planet resource, a planet that this species originates from.',
  })
  @IsUrl()
  homeworld: string;

  @ApiProperty({
    description:
      'An array of People URL Resources that are a part of this species.',
    type: [String],
  })
  @IsArray()
  @IsUrl({}, { each: true })
  people: string[];

  @ApiProperty({
    description:
      'An array of Film URL Resources that this species has appeared in.',
    type: [String],
  })
  @IsArray()
  @IsUrl({}, { each: true })
  films: string[];

  @ApiProperty({ description: 'The hypermedia URL of this resource.' })
  @IsUrl()
  url: string;

  @ApiProperty({
    description:
      'The ISO 8601 date format of the time that this resource was created.',
  })
  @IsString()
  created: string;

  @ApiProperty({
    description:
      'The ISO 8601 date format of the time that this resource was edited.',
  })
  @IsString()
  edited: string;
}
