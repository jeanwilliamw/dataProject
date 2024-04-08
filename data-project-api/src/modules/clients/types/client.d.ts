import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';

export type CreateClientCalcuated = CreateClientDto & {
  pricePaid: number;
};

export type UpdateClientCalcuated = UpdateClientDto & {
  pricePaid: number;
};
