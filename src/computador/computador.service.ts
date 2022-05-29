import { Injectable, Inject, Logger } from '@nestjs/common';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { Repository, getRepository } from 'typeorm';
import { Computador, TipoComputador } from './computador.entity';
import { ComputadorRegisterDto } from './dto/computador.register.dto';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class ComputadorService {
  constructor(
    @Inject('COMPUTADOR_REPOSITORY')
    private computadorRepository: Repository<Computador>,
    @Inject('TIPOCOMPUTADOR_REPOSITORY')
    private tipoComputadorRepository: Repository<TipoComputador>,
  ) {}
  private readonly logger = new Logger(ComputadorService.name);

  async listTypes(): Promise<TipoComputador[]> {
    return this.tipoComputadorRepository.find({
      order: {
        tipo: 'ASC',
      },
    });
  }
  async findTypeByID(id: string): Promise<TipoComputador | undefined> {
    const computador = await getRepository(TipoComputador)
      .createQueryBuilder('tipo_computador')
      .where('tipo_computador.cod_tipo = :id', { id: id })
      .getOne();
    return computador;
  }
  async registar(data: ComputadorRegisterDto): Promise<ResultadoDto> {
    const computador = new Computador();
    computador.nr_serie = data.nr_serie;
    computador.cod_utilizador = data.cod_utilizador;
    computador.cod_escritorio = data.cod_escritorio;
    computador.cod_tipo = data.cod_tipo;
    computador.marca = data.marca;
    computador.modelo = data.modelo;
    computador.descricao = data.descricao;
    computador.so = data.so;
    computador.cpu = data.cpu;
    computador.ram = data.ram;
    computador.hdd = data.hdd;
    computador.garantia = data.garantia;
    computador.data_instalacao = data.data_instalacao;
    computador.fim_emprestimo = data.fim_emprestimo;
    computador.aviso = data.aviso;
    return this.computadorRepository
      .save(computador)
      .then(() => {
        return <ResultadoDto>{
          status: true,
          mensagem: 'Computador adicionado!',
        };
      })
      .catch((error) => {
        return <ResultadoDto>{
          status: false,
          mensagem: 'Ocorreu um erro no pedido: ' + error,
        };
      });
  }
  async findAll(): Promise<Computador[]> {
    return this.computadorRepository.find({
      order: {
        marca: 'ASC',
        modelo: 'ASC',
        nr_serie: 'ASC',
      },
    });
  }
  async findByID(id: string): Promise<Computador | undefined> {
    const computador = await getRepository(Computador)
      .createQueryBuilder('computador')
      .innerJoinAndSelect('computador.cod_escritorio', 'escritorio')
      .where('computador.nr_serie = :id', { id: id })
      .getOne();
    return computador;
  }
  async atualizar(data: ComputadorRegisterDto): Promise<ResultadoDto> {
    return this.computadorRepository
      .update(
        { nr_serie: data.nr_serie },
        {
          cod_utilizador: data.cod_utilizador,
          cod_escritorio: data.cod_escritorio,
          cod_tipo: data.cod_tipo,
          marca: data.marca,
          modelo: data.modelo,
          descricao: data.descricao,
          so: data.so,
          cpu: data.cpu,
          ram: data.ram,
          hdd: data.hdd,
          garantia: data.garantia,
          data_instalacao: data.data_instalacao,
          fim_emprestimo: data.fim_emprestimo,
        },
      )
      .then(() => {
        return <ResultadoDto>{
          status: true,
          mensagem: 'Computador atualizado!',
        };
      })
      .catch((error) => {
        return <ResultadoDto>{
          status: false,
          mensagem: 'Ocorreu um erro no pedido: ' + error,
        };
      });
  }
  async delete(nr_serie: string): Promise<ResultadoDto> {
    return this.computadorRepository
      .delete(nr_serie)
      .then(() => {
        return <ResultadoDto>{
          status: true,
          mensagem: 'O computador foi removido',
        };
      })
      .catch((error) => {
        return <ResultadoDto>{
          status: false,
          mensagem: 'Ocorreu um erro no pedido: ' + error,
        };
      });
  }

  //@Cron('45 * * * * *')
  async handleCron() {
    this.logger.debug('Called when the current second is 45');
    const emprestimo = await getRepository(Computador)
      .createQueryBuilder('computador')
      .innerJoinAndSelect('computador.cod_escritorio', 'escritorio')
      .getMany();
    console.log(emprestimo);
  }
}
