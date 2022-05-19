import { Injectable, Inject, Body } from '@nestjs/common';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { Repository, getRepository } from 'typeorm';
import { EscritorioRegisterDto } from './dto/escritorio.register.dto';
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
  async getCodEscritorio(
    @Body() data: string,
  ): Promise<Escritorio | undefined> {
    const escritorio = await getRepository(Escritorio)
      .createQueryBuilder('escritorio')
      .select('escritorio.cod_escritorio')
      .where('escritorio.morada = :morada', { morada: data })
      .getOne();
    return escritorio;
  }
  async findByID(id: number): Promise<Escritorio | undefined> {
    const escritorio = await getRepository(Escritorio)
      .createQueryBuilder('escritorio')
      .where('escritorio.cod_escritorio = :id', { id: id })
      .getOne();
    return escritorio;
  }

  async registar(data: EscritorioRegisterDto): Promise<ResultadoDto> {
    const escritorio = new Escritorio();
    escritorio.morada = data.morada;
    escritorio.tipo = data.tipo;
    escritorio.helpdesk = data.helpdesk;
    return this.escritorioRepository
      .save(escritorio)
      .then(() => {
        return <ResultadoDto>{
          status: true,
          mensagem: 'Escritório adicionado!',
        };
      })
      .catch((error) => {
        return <ResultadoDto>{
          status: false,
          mensagem: 'Ocorreu um erro no pedido: ' + error,
        };
      });
  }

  async delete(cod_escritorio: number): Promise<ResultadoDto> {
    return this.escritorioRepository
      .delete(cod_escritorio)
      .then(() => {
        return <ResultadoDto>{
          status: true,
          mensagem: 'O escritório foi removido',
        };
      })
      .catch((error) => {
        return <ResultadoDto>{
          status: false,
          mensagem: 'Ocorreu um erro no pedido: ' + error,
        };
      });
  }
}
