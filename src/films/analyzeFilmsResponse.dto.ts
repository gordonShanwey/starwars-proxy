import { ApiProperty } from '@nestjs/swagger';

export class AnalyzeFilmsResponseDTO {
  @ApiProperty({
    description:
      'An object where the keys are words and the values are their counts',
    example: { a: 1, b: 2 },
    type: 'object',
    additionalProperties: { type: 'number' },
  })
  wordCounts: Record<string, number>;

  @ApiProperty({
    description: 'An array of character names that appear most frequently',
    example: ['Luke Skywalker'],
    type: 'array',
    items: { type: 'string' },
  })
  mostFrequentCharacters: string[];
}
