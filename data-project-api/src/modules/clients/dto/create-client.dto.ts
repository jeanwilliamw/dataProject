// create-client.dto.ts

import {
  IsDateString,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateCollectDtoFromClient } from '../../collects/dto/create-collect.dto';

export class CreateClientDto {
  @IsDateString()
  buyDate: Date;

  @IsNumber()
  numberOfChildren: number;

  @IsString()
  city: string;

  @IsString()
  workCategory: string;

  @ValidateNested({ each: true })
  @Type(() => CreateCollectDtoFromClient)
  collects: CreateCollectDtoFromClient[];
}
