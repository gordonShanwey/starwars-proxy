import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiService {
  constructor(private httpService: HttpService) {}

  public async getAll<T>(
    baseurl: string,
    page?: number,
    search?: string,
  ): Promise<T> {
    const queryParams = new URLSearchParams();
    if (page) queryParams.append('page', page.toString());
    if (search) queryParams.append('search', search);
    return await this.makeRequest<T>(`${baseurl}?${queryParams.toString()}`);
  }

  public async getById<T>(baseurl: string, id: number): Promise<T> {
    return await this.makeRequest<T>(`${baseurl}${id}`);
  }

  public async makeRequest<T>(url: string): Promise<T> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<T>(url).pipe(
          catchError((error: AxiosError) => {
            console.error(
              `An error happened! Message: ${error.response?.data}`,
            );
            throw new Error('Error fetching data');
          }),
        ),
      );
      return data;
    } catch (error) {
      // handle or rethrow the error as per your error handling strategy
      throw error;
    }
  }
}
