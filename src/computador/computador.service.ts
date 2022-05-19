import { Injectable, Inject, Body } from '@nestjs/common';
import { Repository, getRepository } from 'typeorm';
import { Computador, TipoComputador } from './computador.entity';

@Injectable()
export class ComputadorService {
  constructor(
    @Inject('COMPUTADOR_REPOSITORY')
    private computadorRepository: Repository<Computador>,
    @Inject('TIPOCOMPUTADOR_REPOSITORY')
    private tipoComputadorRepository: Repository<TipoComputador>,
  ) {}

  async listTypes(): Promise<TipoComputador[]> {
    return this.tipoComputadorRepository.find();
  }
}
