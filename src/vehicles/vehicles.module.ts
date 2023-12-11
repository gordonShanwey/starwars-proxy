import { Module } from '@nestjs/common';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';
import { ApiService } from '../core/services/api.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [VehiclesController],
  providers: [VehiclesService, ApiService],
})
export class VehiclesModule {}
