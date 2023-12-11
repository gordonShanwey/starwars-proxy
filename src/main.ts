import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { FilmsModule } from './films/films.module';
import { SpeciesModule } from './species/species.module';
import { PeopleModule } from './people/people.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { StarshipsModule } from './starships/starships.module';
import { PlanetsModule } from './planets/planets.module';
import { TestModule } from './test/test.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Star Wars API')
    .setDescription('Star Wars API')
    .setVersion('1.0')
    .addTag('starwars')
    .build();
  const documentOptions = {
    include: [
      FilmsModule,
      SpeciesModule,
      PeopleModule,
      VehiclesModule,
      StarshipsModule,
      PlanetsModule,
      TestModule,
    ],
  };
  const document = SwaggerModule.createDocument(app, config, documentOptions);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
