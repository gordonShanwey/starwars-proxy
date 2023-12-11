import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { GetAllSpeciesResponseDTO } from './getAllSpeciesResponse.dto';
import { SpeciesDTO } from './species.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('starwars')
@Controller('species')
export class SpeciesController {
  constructor(private speciesService: SpeciesService) {}

  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiOperation({ summary: 'Get all species' })
  @ApiResponse({
    status: 200,
    description: 'Return all species',
    type: GetAllSpeciesResponseDTO,
  })
  async findAll(
    @Query('page') page?: number,
    @Query('search') search?: string,
  ): Promise<GetAllSpeciesResponseDTO> {
    return this.speciesService.getAllSpecies(page, search);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specie by id' })
  @ApiResponse({
    status: 200,
    description: 'Return a specie',
    type: SpeciesDTO,
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<SpeciesDTO> {
    return this.speciesService.getSpecieById(id);
  }
}
