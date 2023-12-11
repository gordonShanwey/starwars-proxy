import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ApiService } from '../core/services/api.service';
import { GetAllFilmsResponseDTO } from './getAllFilmsResponse.dto';
import { FilmDTO } from './film.dto';
import { PeopleService } from '../people/people.service';
import { AnalyzeFilmsResponseDTO } from './analyzeFilmsResponse.dto';

@Injectable()
export class FilmsService {
  private baseurl = 'https://swapi.dev/api/films/';
  constructor(
    private readonly apiService: ApiService,
    private readonly peopleService: PeopleService,
  ) {}

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
  public async analizeFilms(): Promise<AnalyzeFilmsResponseDTO> {
    try {
      const films = await this.getAllFilms();
      const people = await this.peopleService.getAllPeople();
      const wordCounts = {};

      for (const film of films.results) {
        const words = film.opening_crawl.split(/\s+/);
        for (const word of words) {
          if (word) {
            wordCounts[word] = (wordCounts[word] || 0) + 1;
          }
        }
      }

      let maxCount = 0;
      let mostFrequentCharacters = [];

      for (const person of people.results) {
        let count = 0;
        for (const film of films.results) {
          count += (
            film.opening_crawl.match(new RegExp(`\\b${person.name}\\b`, 'g')) ||
            []
          ).length;
        }

        if (count > maxCount) {
          maxCount = count;
          mostFrequentCharacters = [person.name];
        } else if (count === maxCount) {
          mostFrequentCharacters.push(person.name);
        }
      }

      return {
        wordCounts,
        mostFrequentCharacters,
      } as AnalyzeFilmsResponseDTO;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Error analyzing films',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
