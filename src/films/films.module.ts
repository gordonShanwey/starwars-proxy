import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { ApiService } from '../core/services/api.service';
import { PeopleService } from '../people/people.service';

@Module({
  imports: [HttpModule],
  controllers: [FilmsController],
  providers: [FilmsService, ApiService, PeopleService],
})
export class FilmsModule {}
