import { Injectable, Inject } from '@nestjs/common';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { getRepository, Repository } from 'typeorm';
import { SoftwareRegisterDto } from './dto/software.register.dto';
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

  async listTypes(): Promise<TipoSoftware[]> {
    return this.tipoSoftwareRepository.find({
      order: {
        tipo: 'ASC',
      },
    });
  }

  async listLicenses(): Promise<TipoLicenca[]> {
    return this.tipoLicencaRepository.find({
      order: {
        tipo: 'ASC',
      },
    });
  }
  async findTypeByID(id: number): Promise<TipoSoftware | undefined> {
    const software = await getRepository(TipoSoftware)
      .createQueryBuilder('tipo_software')
      .where('tipo_software.cod_tipo = :id', { id: id })
      .getOne();
    return software;
  }

  async registar(data: SoftwareRegisterDto): Promise<ResultadoDto> {
    const software = new Software();
    software.nr_serie = data.nr_serie;
    software.fabricante = data.fabricante;
    software.versao = data.versao;
    software.descricao = data.descricao;
    software.chave = data.chave;
    software.cod_tipo_licenca = data.cod_tipo_licenca;
    software.cod_tipo_software = data.cod_tipo_software;
    software.computador = data.computador;
    software.validade = data.validade;

    return this.softwareRepository
      .save(software)
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

  async findAll(): Promise<Software[]> {
    return this.softwareRepository.find({
      order: {
        fabricante: 'ASC',
        versao: 'ASC',
        nr_serie: 'ASC',
      },
    });
  }

  async findByID(id: string): Promise<Software | undefined> {
    const software = await getRepository(Software)
      .createQueryBuilder('software')
      .innerJoinAndSelect('software.cod_escritorio', 'escritorio')
      .where('computador.nr_serie = :id', { id: id })
      .getOne();
    return software;
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
}
