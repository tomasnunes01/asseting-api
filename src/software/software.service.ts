import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Software, TipoLicenca, TipoSoftware } from './software.entity';

@Injectable()
export class SoftwareService {
  constructor(
    @Inject('SOFTWARE_REPOSITORY')
    private softwareRepository: Repository<Software>,
    @Inject('TIPOSOFTWARE_REPOSITORY')
    private tipoSoftwareRepository: Repository<TipoSoftware>,
    @Inject('TIPOLICENCA_REPOSITORY')
    private tipoLicencaRepository: Repository<TipoLicenca>,
  ) {}

  async listTypes(): Promise<TipoLicenca[]> {
    return this.tipoLicencaRepository.find({
      order: {
        tipo: 'ASC',
      },
    });
  }
  /* async findTypeByID(id: string): Promise<TipoComputador | undefined> {
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
  } */

  async findAll(): Promise<Software[]> {
    return this.softwareRepository.find({
      order: {
        fabricante: 'ASC',
        versao: 'ASC',
        nr_serie: 'ASC',
      },
    });
  }
  /* async findByID(id: string): Promise<Computador | undefined> {
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
  } */
}
