import { Injectable, Inject } from '@nestjs/common';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { getRepository, Repository } from 'typeorm';
import { SoftwareRegisterDto } from './dto/software.register.dto';
import { SoftwareUpdateDto } from './dto/software.update.dto';
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
          mensagem: 'Software adicionado!',
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
      .innerJoinAndSelect('software.cod_tipo_software', 'tipo_software')
      .innerJoinAndSelect('software.cod_tipo_licenca', 'tipo_licenca')
      .innerJoinAndSelect('software.computador', 'computador')
      .innerJoinAndSelect('computador.cod_escritorio', 'escritorio')
      .where('software.id = :id', { id: id })
      .getOne();
    return software;
  }

  async atualizar(data: SoftwareUpdateDto): Promise<ResultadoDto> {
    return this.softwareRepository
      .update(
        { id: data.id },
        {
          nr_serie: data.nr_serie,
          cod_tipo_software: data.cod_tipo_software,
          cod_tipo_licenca: data.cod_tipo_licenca,
          computador: data.computador,
          fabricante: data.fabricante,
          versao: data.versao,
          descricao: data.descricao,
          chave: data.chave,
          validade: data.validade,
        },
      )
      .then(() => {
        return <ResultadoDto>{
          status: true,
          mensagem: 'Software atualizado!',
        };
      })
      .catch((error) => {
        return <ResultadoDto>{
          status: false,
          mensagem: 'Ocorreu um erro no pedido: ' + error,
        };
      });
  }
  async delete(id: number): Promise<ResultadoDto> {
    return this.softwareRepository
      .delete(id)
      .then(() => {
        return <ResultadoDto>{
          status: true,
          mensagem: 'O software foi removido',
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
