import { Module } from '@nestjs/common';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { ApiService } from '../core/services/api.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [PeopleController],
  providers: [PeopleService, ApiService],
})
export class PeopleModule {}
