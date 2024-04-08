import { Injectable } from '@nestjs/common';
import { Client, Collect } from '@prisma/client';
import { ClientRepository } from './clients.repository';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(private readonly clientRepository: ClientRepository) {}

  async create(data: CreateClientDto): Promise<Client> {
    const client = {
      ...data,
      pricePaid: data.collects.reduce(
        (acc, collect) => acc + collect.articlePrice,
        0,
      ),
    };
    return this.clientRepository.createWithCollects(client);
  }

  async getAll(): Promise<Client[]> {
    return this.clientRepository.findAll();
  }

  async getById(id: string): Promise<Client | null> {
    return this.clientRepository.findById(id);
  }

  async update(id: string, data: UpdateClientDto): Promise<Client | null> {
    const client = {
      ...data,
      pricePaid: data.collects.reduce(
        (acc, collect) => acc + collect.articlePrice,
        0,
      ),
    };
    return this.clientRepository.update(id, client);
  }

  async delete(id: string): Promise<Client | null> {
    return this.clientRepository.delete(id);
  }

  async getAverageByWorkCategory(): Promise<Record<string, number>> {
    const allClients = await this.clientRepository.findAll();

    const allClientsByWorkCategory = allClients.reduce((acc, client) => {
      if (!acc[client.workCategory]) {
        acc[client.workCategory] = [];
      }

      acc[client.workCategory].push(client.pricePaid);
      return acc;
    }, {} as Record<string, number[]>);

    return Object.entries(allClientsByWorkCategory).reduce(
      (acc, [workCategory, prices]) => {
        const average =
          prices.reduce((acc, price) => acc + price, 0) / prices.length;
        acc[workCategory] = average;
        return acc;
      },
      {} as Record<string, number>,
    );
  }

  async getAverageByCategoryByWorkCategory() {
    const allClients = await this.clientRepository.findAll(true);

    const allClientsByWorkCategory = allClients.reduce((acc, client) => {
      if (!acc[client.workCategory]) {
        acc[client.workCategory] = [];
      }

      acc[client.workCategory].push(...client.collects);
      return acc;
    }, {} as Record<string, Collect[]>);

    return Object.entries(allClientsByWorkCategory).reduce(
      (acc, [workCategory, collects]) => {
        const allClientsByCategory = collects.reduce((acc, collect) => {
          if (!acc[collect.categoryId]) {
            acc[collect.categoryId] = [];
          }

          acc[collect.categoryId].push(collect.articlePrice);
          return acc;
        }, {} as Record<string, number[]>);

        acc[workCategory] = Object.entries(allClientsByCategory).reduce(
          (acc, [category, prices]) => {
            const average =
              prices.reduce((acc, price) => acc + price, 0) / prices.length;
            acc[category] = average;
            return acc;
          },
          {} as Record<string, number>,
        );

        return acc;
      },
      {} as Record<string, Record<string, number>>,
    );
  }
}
