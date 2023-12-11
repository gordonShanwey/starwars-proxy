import { Injectable } from '@nestjs/common';
import { ApiService } from '../core/services/api.service';
import { GetAllVehiclesResponseDTO } from './getAllVehiclesResponse.dto';
import { VehicleDTO } from './vehicle.dto';

@Injectable()
export class VehiclesService {
  private baseurl = 'https://swapi.dev/api/vehicles/';
  constructor(private readonly apiService: ApiService) {}
  public async getAllVehicles(
    page?: number,
    search?: string,
  ): Promise<GetAllVehiclesResponseDTO> {
    if (!page) {
      let allVehicles: VehicleDTO[] = [];
      const firstPage =
        await this.apiService.makeRequest<GetAllVehiclesResponseDTO>(
          this.baseurl,
        );
      allVehicles = [...firstPage.results];
      let url = firstPage.next;
      while (allVehicles.length < firstPage.count) {
        const response =
          await this.apiService.makeRequest<GetAllVehiclesResponseDTO>(url);
        allVehicles = [...allVehicles, ...response.results];
        url = response.next;
      }
      return {
        count: allVehicles.length,
        next: null,
        previous: null,
        results: allVehicles,
      };
    } else {
      return await this.apiService.getAll<GetAllVehiclesResponseDTO>(
        this.baseurl,
        page,
        search,
      );
    }
  }

  public async getVehicleById(id: number): Promise<VehicleDTO> {
    return await this.apiService.getById<VehicleDTO>(this.baseurl, id);
  }
}
