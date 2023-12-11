import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';
import { ApiService } from '../core/services/api.service';
import { PeopleService } from '../people/people.service';
import { GetAllPlanetsResponseDTO } from '../planets/getAllPlanetsResponse.dto';

describe('FilmsService', () => {
  let service: FilmsService;
  let apiService: ApiService;
  let peopleService: PeopleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsService,
        {
          provide: ApiService,
          useValue: {
            getAll: jest.fn(),
            getById: jest.fn(),
            makeRequest: jest.fn(),
          },
        },
        { provide: PeopleService, useValue: { getAllPeople: jest.fn() } },
      ],
    }).compile();

    service = module.get<FilmsService>(FilmsService);
    apiService = module.get<ApiService>(ApiService);
    peopleService = module.get<PeopleService>(PeopleService);
  });

  it('should call getAll method of ApiService with correct URL and parameters in getAllFilms', async () => {
    const result = { results: [{ title: 'A New Hope' }] };
    jest
      .spyOn(apiService, 'getAll')
      .mockImplementation(() => Promise.resolve(result));

    expect(await service.getAllFilms(1, 'search')).toEqual(result);
    expect(apiService.getAll).toHaveBeenCalledWith(
      'https://swapi.dev/api/films/',
      1,
      'search',
    );
  });

  it('should call getById method of ApiService with correct URL and parameters in getFilmById', async () => {
    const result = { title: 'A New Hope' };
    jest
      .spyOn(apiService, 'getById')
      .mockImplementation(() => Promise.resolve(result));

    expect(await service.getFilmById(1)).toEqual(result);
    expect(apiService.getById).toHaveBeenCalledWith(
      'https://swapi.dev/api/films/',
      1,
    );
  });

  it('should call getAllFilms and getAllPeople methods and return correct result in analizeFilms', async () => {
    const films = {
      count: 1,
      next: null,
      previous: null,
      results: [
        { opening_crawl: 'A long time ago in a galaxy far, far away...' },
      ],
    };
    const people = {
      count: 1,
      next: null,
      previous: null,
      results: [{ name: 'Luke Skywalker' }],
    };
    jest
      .spyOn(service, 'getAllFilms')
      .mockImplementation(() => Promise.resolve(films) as any);
    jest
      .spyOn(peopleService, 'getAllPeople')
      .mockImplementation(() => Promise.resolve(people) as any);

    const result = await service.analizeFilms();
    expect(result.wordCounts['A']).toEqual(1);
    expect(result.mostFrequentCharacters).toEqual(['Luke Skywalker']);
  });

  // Error handling tests
  it('should handle error in getAllFilms', async () => {
    jest
      .spyOn(apiService, 'getAll')
      .mockImplementation(() => Promise.reject(new Error('Error')));
    await expect(service.getAllFilms()).rejects.toThrow(
      'Error analyzing films',
    );
  });

  it('should handle error in getFilmById', async () => {
    jest
      .spyOn(apiService, 'getById')
      .mockImplementation(() => Promise.reject(new Error('Error')));
    await expect(service.getFilmById(1)).rejects.toThrow(
      'Error analyzing films',
    );
  });

  it('should handle error in analizeFilms', async () => {
    jest
      .spyOn(service, 'getAllFilms')
      .mockImplementation(() => Promise.reject(new Error('Error')));
    jest
      .spyOn(peopleService, 'getAllPeople')
      .mockImplementation(() => Promise.reject(new Error('Error')));
    await expect(service.analizeFilms()).rejects.toThrow(
      'Error analyzing films',
    );
  });
});
