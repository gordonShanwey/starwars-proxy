import { Injectable } from '@nestjs/common';
import { ApiService } from '../core/services/api.service';
import { GetAllSpeciesResponseDTO } from './getAllSpeciesResponse.dto';
import { SpeciesDTO } from './species.dto';

@Injectable()
export class SpeciesService {
  private baseurl = 'https://swapi.dev/api/species/';
  constructor(private readonly apiService: ApiService) {}

  public async getAllSpecies(
    page?: number,
    search?: string,
  ): Promise<GetAllSpeciesResponseDTO> {
    if (!page) {
      let allSpecies: SpeciesDTO[] = [];
      const firstPage =
        await this.apiService.makeRequest<GetAllSpeciesResponseDTO>(
          this.baseurl,
        );
      allSpecies = [...firstPage.results];
      let url = firstPage.next;
      while (allSpecies.length < firstPage.count) {
        const response =
          await this.apiService.makeRequest<GetAllSpeciesResponseDTO>(url);
        allSpecies = [...allSpecies, ...response.results];
        url = response.next;
      }
      return {
        count: allSpecies.length,
        next: null,
        previous: null,
        results: allSpecies,
      };
    } else {
      return await this.apiService.getAll<GetAllSpeciesResponseDTO>(
        this.baseurl,
        page,
        search,
      );
    }
  }

  public async getSpecieById(id: number): Promise<SpeciesDTO> {
    return await this.apiService.getById<SpeciesDTO>(this.baseurl, id);
  }
}
