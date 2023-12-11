import { Module } from '@nestjs/common';
import { PlanetsModule } from './planets/planets.module';
import { FilmsModule } from './films/films.module';
import { SpeciesModule } from './species/species.module';
import { PeopleModule } from './people/people.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { StarshipsModule } from './starships/starships.module';

@Module({
  imports: [
    FilmsModule,
    SpeciesModule,
    PeopleModule,
    VehiclesModule,
    StarshipsModule,
    PlanetsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
