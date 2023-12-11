import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsUrl } from 'class-validator';

export class PlanetDTO {
  @ApiProperty({ description: 'The name of this planet.' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The diameter of this planet in kilometers.' })
  @IsString()
  diameter: string;

  @ApiProperty({
    description:
      'The number of standard hours it takes for this planet to complete a single rotation on its axis.',
  })
  @IsString()
  rotation_period: string;

  @ApiProperty({
    description:
      'The number of standard days it takes for this planet to complete a single orbit of its local star.',
  })
  @IsString()
  orbital_period: string;

  @ApiProperty({ description: 'A number denoting the gravity of this planet.' })
  @IsString()
  gravity: string;

  @ApiProperty({
    description:
      'The average population of sentient beings inhabiting this planet.',
  })
  @IsString()
  population: string;

  @ApiProperty({
    description: 'The climate of this planet. Comma separated if diverse.',
  })
  @IsString()
  climate: string;

  @ApiProperty({
    description: 'The terrain of this planet. Comma separated if diverse.',
  })
  @IsString()
  terrain: string;

  @ApiProperty({
    description:
      'The percentage of the planet surface that is naturally occurring water or bodies of water.',
  })
  @IsString()
  surface_water: string;

  @ApiProperty({
    description: 'An array of People URL Resources that live on this planet.',
    type: [String],
  })
  @IsArray()
  @IsUrl({}, { each: true })
  residents: string[];

  @ApiProperty({
    description:
      'An array of Film URL Resources that this planet has appeared in.',
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
