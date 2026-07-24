import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NatsService } from 'src/common';
import { Transaction } from './entities';
import { Repository } from 'typeorm';

@Injectable()
export class CollectionsService {

  constructor(
    private readonly nats: NatsService,
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async createTransaction(data): Promise<any> {
    const response: any = await this.nats.firstValue('person.search', {
      value,
      type,
    });

    if (!response?.serviceStatus) {
      return {
        error: true,
        message: 'Servicio de Beneficiarios no disponible',
        data: null,
      };
    }

    return {
      error: response.error ?? false,
      message: response.message ?? 'Búsqueda de beneficiarios completada',
      data: response.data ?? null,
    };
  }
}
