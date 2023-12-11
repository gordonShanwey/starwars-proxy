import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsUrl } from 'class-validator';

export class PeopleDTO {
  @ApiProperty({ description: 'The name of this person.' })
  @IsString()
  name: string;

  @ApiProperty({
    description:
      'The birth year of the person, using the in-universe standard of BBY or ABY.',
  })
  @IsString()
  birth_year: string;

  @ApiProperty({
    description:
      'The eye color of this person. Will be "unknown" if not known or "n/a" if the person does not have an eye.',
  })
  @IsString()
  eye_color: string;

  @ApiProperty({
    description:
      'The gender of this person. Either "Male", "Female" or "unknown", "n/a" if the person does not have a gender.',
  })
  @IsString()
  gender: string;

  @ApiProperty({
    description:
      'The hair color of this person. Will be "unknown" if not known or "n/a" if the person does not have hair.',
  })
  @IsString()
  hair_color: string;

  @ApiProperty({ description: 'The height of the person in centimeters.' })
  @IsString()
  height: string;

  @ApiProperty({ description: 'The mass of the person in kilograms.' })
  @IsString()
  mass: string;

  @ApiProperty({ description: 'The skin color of this person.' })
  @IsString()
  skin_color: string;

  @ApiProperty({
    description:
      'The URL of a planet resource, a planet that this person was born on or inhabits.',
  })
  @IsUrl()
  homeworld: string;

  @ApiProperty({
    description: 'An array of film resource URLs that this person has been in.',
    type: [String],
  })
  @IsArray()
  @IsUrl({}, { each: true })
  films: string[];

  @ApiProperty({
    description:
      'An array of species resource URLs that this person belongs to.',
    type: [String],
  })
  @IsArray()
  @IsUrl({}, { each: true })
  species: string[];

  @ApiProperty({
    description:
      'An array of starship resource URLs that this person has piloted.',
    type: [String],
  })
  @IsArray()
  @IsUrl({}, { each: true })
  starships: string[];

  @ApiProperty({
    description:
      'An array of vehicle resource URLs that this person has piloted.',
    type: [String],
  })
  @IsArray()
  @IsUrl({}, { each: true })
  vehicles: string[];

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
