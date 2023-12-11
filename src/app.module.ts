import { Module } from '@nestjs/common';
import { FilmsModule } from './films/films.module';
import { SpeciesModule } from './species/species.module';
import { PeopleModule } from './people/people.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { StarshipsModule } from './starships/starships.module';
import { PlanetsModule } from './planets/planets.module';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-yet';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    CacheModule.register<RedisClientOptions>({
      isGlobal: true,
      ttl: 60 * 60 * 24,
      store: redisStore,
      socket: {
        host: 'redis',
        port: 6379,
      },
    }),
    FilmsModule,
    SpeciesModule,
    PeopleModule,
    VehiclesModule,
    StarshipsModule,
    PlanetsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
