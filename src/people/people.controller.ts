import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { PeopleService } from './people.service';
import { PeopleDTO } from './people.dto';
import { GetAllPeopleResponseDTO } from './getAllPeopleResponse.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('starwars')
@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}
  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiOperation({ summary: 'Get all people' })
  @ApiResponse({
    status: 200,
    description: 'Return all people',
    type: GetAllPeopleResponseDTO,
  })
  async findAll(
    @Query('page') page?: number,
    @Query('search') search?: string,
  ): Promise<GetAllPeopleResponseDTO> {
    return this.peopleService.getAllPeople(page, search);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get people by id' })
  @ApiResponse({
    status: 200,
    description: 'Return people by id.',
    type: PeopleDTO,
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<PeopleDTO> {
    return this.peopleService.getPeopleById(id);
  }
}
