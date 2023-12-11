import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: {
            getAllFilms: jest.fn(),
            getFilmById: jest.fn(),
            analizeFilms: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
    service = module.get<FilmsService>(FilmsService);
  });

  it('should call getAllFilms method of FilmsService and return its result in findAll', async () => {
    const result = {
      count: 1,
      next: null,
      previous: null,
      results: [{ title: 'A New Hope' }],
    };
    jest
      .spyOn(service, 'getAllFilms')
      .mockImplementation(() => Promise.resolve(result) as any);

    expect(await controller.findAll()).toEqual(result);
    expect(service.getAllFilms).toHaveBeenCalledWith(undefined, undefined);
  });

  it('should call getFilmById method of FilmsService and return its result in findOne', async () => {
    const result = {
      title: 'A New Hope',
      episode_id: 4,
      opening_crawl: 'It is a period of civil war...',
      // Include all other properties of FilmDTO
    };
    jest
      .spyOn(service, 'getFilmById')
      .mockImplementation(() => Promise.resolve(result) as any);

    expect(await controller.findOne(1)).toEqual(result);
    expect(service.getFilmById).toHaveBeenCalledWith(1);
  });

  it('should call analizeFilms method of FilmsService and return its result in analyze', async () => {
    const result = {
      wordCounts: { A: 1 },
      mostFrequentCharacters: ['Luke Skywalker'],
    };
    jest
      .spyOn(service, 'analizeFilms')
      .mockImplementation(() => Promise.resolve(result));

    expect(await controller.analyze()).toEqual(result);
    expect(service.analizeFilms).toHaveBeenCalled();
  });
});
