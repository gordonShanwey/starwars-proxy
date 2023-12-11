import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApiService,
        { provide: HttpService, useValue: { get: () => of({ data: {} }) } },
      ],
    }).compile();

    service = module.get<ApiService>(ApiService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should call makeRequest with correct URL in getAll', async () => {
    const makeRequestSpy = jest.spyOn(service, 'makeRequest');
    await service.getAll('https://swapi.dev/api/films/', 1, 'search');
    expect(makeRequestSpy).toHaveBeenCalledWith(
      'https://swapi.dev/api/films/?page=1&search=search',
    );
  });

  it('should call makeRequest with correct URL in getById', async () => {
    const makeRequestSpy = jest.spyOn(service, 'makeRequest');
    await service.getById('https://swapi.dev/api/films/', 1);
    expect(makeRequestSpy).toHaveBeenCalledWith(
      'https://swapi.dev/api/films/1',
    );
  });

  it('should call get method of HttpService and return data in makeRequest', async () => {
    const data = { results: [{ title: 'A New Hope' }] };
    jest
      .spyOn(httpService, 'get')
      .mockImplementation(() => of({ data } as any));
    expect(await service.makeRequest('https://swapi.dev/api/films/')).toEqual(
      data,
    );
  });

  it('should handle error in makeRequest', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementation(() => throwError(new Error('Error')));
    await expect(
      service.makeRequest('https://swapi.dev/api/films/'),
    ).rejects.toThrow('Error fetching data');
  });
});
