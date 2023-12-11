import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsArray,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { VehicleDTO } from './vehicle.dto';

export class GetAllVehiclesResponseDTO {
  @ApiProperty({ description: 'The total number of vehicles available.' })
  @IsNumber()
  count: number;

  @ApiProperty({
    description: 'URL to the next page of vehicles, if available.',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  next: string | null;

  @ApiProperty({
    description: 'URL to the previous page of vehicles, if available.',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  previous: string | null;

  @ApiProperty({ description: 'Array of vehicle data.', type: [VehicleDTO] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VehicleDTO)
  results: VehicleDTO[];
}
