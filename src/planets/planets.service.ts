import { Injectable } from '@nestjs/common';
import { ApiService } from '../core/services/api.service';
import { GetAllPlanetsResponseDTO } from './getAllPlanetsResponse.dto';
import { PlanetDTO } from './planet.dto';

@Injectable()
export class PlanetsService {
  private baseurl: string = 'https://swapi.dev/api/planets/';
  constructor(private readonly apiService: ApiService) {}
  public async getAllPlanets(
    page?: number,
    search?: string,
  ): Promise<GetAllPlanetsResponseDTO> {
    if (!page) {
      let allPlanets: PlanetDTO[] = [];
      const firstPage =
        await this.apiService.makeRequest<GetAllPlanetsResponseDTO>(
          this.baseurl,
        );
      allPlanets = [...firstPage.results];
      let url = firstPage.next;
      while (allPlanets.length < firstPage.count) {
        const response =
          await this.apiService.makeRequest<GetAllPlanetsResponseDTO>(url);
        allPlanets = [...allPlanets, ...response.results];
        url = response.next;
      }
      return {
        count: allPlanets.length,
        next: null,
        previous: null,
        results: allPlanets,
      };
    } else {
      return await this.apiService.getAll<GetAllPlanetsResponseDTO>(
        this.baseurl,
        page,
        search,
      );
    }
  }

  public async getPlanetById(id: number) {
    return await this.apiService.getById<PlanetDTO>(this.baseurl, id);
  }
}
