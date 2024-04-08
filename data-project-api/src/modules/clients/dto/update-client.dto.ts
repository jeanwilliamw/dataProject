import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateCollectDtoFromClient } from '../../collects/dto/create-collect.dto';

export class UpdateClientDto {
  @IsOptional()
  @IsDateString()
  buyDate?: Date;

  @IsOptional()
  @IsNumber()
  numberOfChildren?: number;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  workCategory?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateCollectDtoFromClient)
  collects?: CreateCollectDtoFromClient[];
}
