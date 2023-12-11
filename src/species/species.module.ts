import { Module } from '@nestjs/common';
import { SpeciesController } from './species.controller';
import { SpeciesService } from './species.service';
import { ApiService } from '../core/services/api.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [SpeciesController],
  providers: [SpeciesService, ApiService],
})
export class SpeciesModule {}
