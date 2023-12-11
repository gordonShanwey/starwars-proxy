import { Module } from '@nestjs/common';
import { PlanetsController } from './planets.controller';
import { PlanetsService } from './planets.service';
import { ApiService } from '../core/services/api.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [PlanetsController],
  providers: [PlanetsService, ApiService],
})
export class PlanetsModule {}
