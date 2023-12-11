import { Injectable } from '@nestjs/common';
import { ApiService } from '../core/services/api.service';
import { PeopleDTO } from './people.dto';
import { GetAllPeopleResponseDTO } from './getAllPeopleResponse.dto';

@Injectable()
export class PeopleService {
  private baseurl: string = 'https://swapi.dev/api/people/';
  constructor(private readonly apiService: ApiService) {}
  public async getAllPeople(
    page?: number,
    search?: string,
  ): Promise<GetAllPeopleResponseDTO> {
    if (!page) {
      let allPeople: PeopleDTO[] = [];
      const firstPage =
        await this.apiService.makeRequest<GetAllPeopleResponseDTO>(
          this.baseurl,
        );
      allPeople = [...firstPage.results];
      let url = firstPage.next;
      while (allPeople.length < firstPage.count) {
        const response =
          await this.apiService.makeRequest<GetAllPeopleResponseDTO>(url);
        allPeople = [...allPeople, ...response.results];
        url = response.next;
      }
      return {
        count: allPeople.length,
        next: null,
        previous: null,
        results: allPeople,
      };
    } else {
      return await this.apiService.getAll<GetAllPeopleResponseDTO>(
        this.baseurl,
        page,
        search,
      );
    }
  }

  public async getPeopleById(id: number): Promise<PeopleDTO> {
    return await this.apiService.getById<PeopleDTO>(this.baseurl, id);
  }
}
