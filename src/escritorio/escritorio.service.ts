import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Escritorio } from './escritorio.entity';

@Injectable()
export class EscritorioService {
  constructor(
    @Inject('ESCRITORIO_REPOSITORY')
    private escritorioRepository: Repository<Escritorio>,
  ) {}

  async findAll(): Promise<Escritorio[]> {
    return this.escritorioRepository.find();
  }
}
