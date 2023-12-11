import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { FilmsService } from './films.service';
import { GetAllFilmsResponseDTO } from './getAllFilmsResponse.dto';
import { FilmDTO } from './film.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AnalyzeFilmsResponseDTO } from './analyzeFilmsResponse.dto';

@ApiTags('starwars')
@Controller('/films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiOperation({ summary: 'Get all films' })
  @ApiResponse({
    status: 200,
    description: 'Return all films.',
    type: GetAllFilmsResponseDTO,
  })
  async findAll(
    @Query('page') page?: number,
    @Query('search') search?: string,
  ): Promise<GetAllFilmsResponseDTO> {
    return await this.filmsService.getAllFilms(page, search);
  }
  @Get('/analyze')
  @ApiOperation({ summary: 'Analyze films' })
  @ApiResponse({
    status: 200,
    description: 'Analyzed films',
    type: AnalyzeFilmsResponseDTO,
  })
  async analyze(): Promise<AnalyzeFilmsResponseDTO> {
    return await this.filmsService.analizeFilms();
  }
  @Get(':id')
  @ApiOperation({ summary: 'Get film by id' })
  @ApiResponse({
    status: 200,
    description: 'Return film by id.',
    type: FilmDTO,
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<FilmDTO> {
    return await this.filmsService.getFilmById(id);
  }
}
