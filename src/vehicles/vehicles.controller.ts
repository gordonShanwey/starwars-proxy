import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { GetAllVehiclesResponseDTO } from './getAllVehiclesResponse.dto';
import { VehicleDTO } from './vehicle.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('starwars')
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}
  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiOperation({ summary: 'Get all vehicles' })
  @ApiResponse({
    status: 200,
    description: 'Return all vehicles',
    type: GetAllVehiclesResponseDTO,
  })
  async findAll(
    @Query('page') page?: number,
    @Query('search') search?: string,
  ): Promise<GetAllVehiclesResponseDTO> {
    return this.vehiclesService.getAllVehicles(page, search);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a vehicle by id' })
  @ApiResponse({
    status: 200,
    description: 'Return a vehicle',
    type: VehicleDTO,
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<VehicleDTO> {
    return this.vehiclesService.getVehicleById(id);
  }
}
