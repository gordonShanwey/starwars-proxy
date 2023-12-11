import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { GetAllPlanetsResponseDTO } from './getAllPlanetsResponse.dto';
import { PlanetDTO } from './planet.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('starwars')
@Controller('planets')
export class PlanetsController {
  constructor(private readonly planetService: PlanetsService) {}
  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiOperation({ summary: 'Get all planets' })
  @ApiResponse({
    status: 200,
    description: 'Return all planets',
    type: GetAllPlanetsResponseDTO,
  })
  async findAll(
    @Query('page') page?: number,
    @Query('search') search?: string,
  ): Promise<GetAllPlanetsResponseDTO> {
    return this.planetService.getAllPlanets(page, search);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get planet by id' })
  @ApiResponse({
    status: 200,
    description: 'Return planet by id',
    type: PlanetDTO,
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<PlanetDTO> {
    return this.planetService.getPlanetById(id);
  }
}
