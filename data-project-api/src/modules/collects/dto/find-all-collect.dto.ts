import { IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class FindAllCollectDto {
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  take?: number;
}
