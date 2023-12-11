import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ApiService } from '../core/services/api.service';
import { GetAllFilmsResponseDTO } from './getAllFilmsResponse.dto';
import { FilmDTO } from './film.dto';

@Injectable()
export class FilmsService {
  private baseurl = 'https://swapi.dev/api/films/';
  constructor(private readonly apiService: ApiService) {}

  public async getAllFilms(
    page?: number,
    search?: string,
  ): Promise<GetAllFilmsResponseDTO> {
    try {
      if (!page) {
        let allFilms: FilmDTO[] = [];
        const firstPage =
          await this.apiService.makeRequest<GetAllFilmsResponseDTO>(
            this.baseurl,
          );
        allFilms = [...firstPage.results];
        let url = firstPage.next;
        while (allFilms.length < firstPage.count) {
          const response =
            await this.apiService.makeRequest<GetAllFilmsResponseDTO>(url);
          allFilms = [...allFilms, ...response.results];
          url = response.next;
        }
        return {
          count: allFilms.length,
          next: null,
          previous: null,
          results: allFilms,
        };
      } else {
        return await this.apiService.getAll<GetAllFilmsResponseDTO>(
          this.baseurl,
          page,
          search,
        );
      }
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Error analyzing films',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getFilmById(id: number): Promise<FilmDTO> {
    try {
      return await this.apiService.getById<FilmDTO>(this.baseurl, id);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Error analyzing films',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
