import { Injectable, Inject, Body } from '@nestjs/common';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { Repository, getRepository } from 'typeorm';
import { Computador, TipoComputador } from './computador.entity';
import { ComputadorRegisterDto } from './dto/computador.register.dto';

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

  async registar(data: ComputadorRegisterDto): Promise<ResultadoDto> {
    const computador = new Computador();
    computador.nr_serie = data.nr_serie;
    computador.cod_utilizador = data.username;
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
    return this.computadorRepository.find();
  }
}
