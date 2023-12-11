import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsISO8601, IsArray, IsUrl } from 'class-validator';

export class FilmDTO {
  @ApiProperty({ description: 'The title of this film' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'The episode number of this film.' })
  @IsInt()
  episode_id: number;

  @ApiProperty({
    description: 'The opening paragraphs at the beginning of this film.',
  })
  @IsString()
  opening_crawl: string;

  @ApiProperty({ description: 'The name of the director of this film.' })
  @IsString()
  director: string;

  @ApiProperty({
    description:
      'The name(s) of the producer(s) of this film. Comma separated.',
  })
  @IsString()
  producer: string;

  @ApiProperty({
    description:
      'The ISO 8601 date format of film release at original creator country.',
  })
  @IsISO8601()
  release_date: string;

  @ApiProperty({
    description: 'An array of species resource URLs that are in this film.',
    type: [String],
  })
  @IsArray()
  @IsUrl({}, { each: true })
  species: string[];

  @ApiProperty({
    description: 'An array of starship resource URLs that are in this film.',
    type: [String],
  })
  @IsArray()
  @IsUrl({}, { each: true })
  starships: string[];

  @ApiProperty({
    description: 'An array of vehicle resource URLs that are in this film.',
    type: [String],
  })
  @IsArray()
  @IsUrl({}, { each: true })
  vehicles: string[];

  @ApiProperty({
    description: 'An array of people resource URLs that are in this film.',
    type: [String],
  })
  @IsArray()
  @IsUrl({}, { each: true })
  characters: string[];

  @ApiProperty({
    description: 'An array of planet resource URLs that are in this film.',
    type: [String],
  })
  @IsArray()
  @IsUrl({}, { each: true })
  planets: string[];

  @ApiProperty({ description: 'The hypermedia URL of this resource.' })
  @IsUrl()
  url: string;

  @ApiProperty({
    description:
      'The ISO 8601 date format of the time that this resource was created.',
  })
  @IsISO8601()
  created: string;

  @ApiProperty({
    description:
      'The ISO 8601 date format of the time that this resource was edited.',
  })
  @IsISO8601()
  edited: string;
}
