import { Module } from '@nestjs/common';
import { StarshipsController } from './starships.controller';
import { StarshipsService } from './starships.service';
import { ApiService } from '../core/services/api.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [StarshipsController],
  providers: [StarshipsService, ApiService],
})
export class StarshipsModule {}
