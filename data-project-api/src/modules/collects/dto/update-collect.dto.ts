import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCollectDto {
  @IsOptional()
  @IsString()
  clientId: string;

  @IsOptional()
  @IsNumber()
  articlePrice: number;

  @IsOptional()
  @IsNumber()
  categoryId: number;
}
