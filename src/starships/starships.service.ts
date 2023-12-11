import { Injectable } from '@nestjs/common';
import { ApiService } from '../core/services/api.service';
import { GetAllStarshipsResponseDTO } from './getAllStarshipsResponse.dto';
import { StarshipDto } from './starship.dto';

@Injectable()
export class StarshipsService {
  private baseurl = 'https://swapi.dev/api/starships/';
  constructor(private readonly apiService: ApiService) {}
  public async getAllStarships(
    page?: number,
    search?: string,
  ): Promise<GetAllStarshipsResponseDTO> {
    if (!page) {
      let allStarships: StarshipDto[] = [];
      const firstPage =
        await this.apiService.makeRequest<GetAllStarshipsResponseDTO>(
          this.baseurl,
        );
      allStarships = [...firstPage.results];
      let url = firstPage.next;
      while (allStarships.length < firstPage.count) {
        const response =
          await this.apiService.makeRequest<GetAllStarshipsResponseDTO>(url);
        allStarships = [...allStarships, ...response.results];
        url = response.next;
      }
      return {
        count: allStarships.length,
        next: null,
        previous: null,
        results: allStarships,
      };
    } else {
      return await this.apiService.getAll<GetAllStarshipsResponseDTO>(
        this.baseurl,
        page,
        search,
      );
    }
  }

  public async getStarshipById(id: number): Promise<StarshipDto> {
    return await this.apiService.getById<StarshipDto>(this.baseurl, id);
  }
}
