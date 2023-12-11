import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { StarshipsService } from './starships.service';
import { GetAllStarshipsResponseDTO } from './getAllStarshipsResponse.dto';
import { StarshipDto } from './starship.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('starwars')
@Controller('starships')
export class StarshipsController {
  constructor(private readonly starshipService: StarshipsService) {}
  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiOperation({ summary: 'Get all starships' })
  @ApiResponse({
    status: 200,
    description: 'Return all starships',
    type: GetAllStarshipsResponseDTO,
  })
  async findAll(
    @Query('page') page?: number,
    @Query('search') search?: string,
  ): Promise<GetAllStarshipsResponseDTO> {
    return await this.starshipService.getAllStarships(page, search);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a starship by id' })
  @ApiResponse({
    status: 200,
    description: 'Return a starship',
    type: StarshipDto,
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<StarshipDto> {
    return this.starshipService.getStarshipById(id);
  }
}
