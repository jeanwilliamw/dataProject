import { IsNumber, IsString } from 'class-validator';

export class CreateCollectDto {
  @IsString()
  clientId: string;

  @IsNumber()
  articlePrice: number;

  @IsNumber()
  categoryId: number;
}

export class CreateCollectDtoFromClient {
  @IsNumber()
  articlePrice: number;

  @IsNumber()
  categoryId: number;
}
