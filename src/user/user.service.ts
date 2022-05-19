import { Injectable, Inject } from '@nestjs/common';
import { getRepository, Repository } from 'typeorm';
import { Conta } from './user.entity';
import { UserRegisterDto } from './dto/user.register.dto';
import { ResultadoDto } from '../dto/resultado.dto';
import * as bcrypt from 'bcrypt';
import { UserUpdateDto } from './dto/user.update.dto';
import { groupCollapsed } from 'console';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<Conta>,
  ) {}

  async findAll(): Promise<Conta[]> {
    return this.userRepository.find();
  }

  async registar(data: UserRegisterDto): Promise<ResultadoDto> {
    const conta = new Conta();
    conta.username = data.username;
    conta.email = data.email;
    conta.nome = data.nome;
    conta.apelido = data.apelido;
    conta.pass = bcrypt.hashSync(data.pass, 10);
    conta.grupo = data.grupo;
    conta.cod_escritorio = data.cod_escritorio;
    return this.userRepository
      .save(conta)
      .then(() => {
        return <ResultadoDto>{
          status: true,
          mensagem: 'Dados Inseridos!',
        };
      })
      .catch((error) => {
        return <ResultadoDto>{
          status: false,
          mensagem: 'Ocorreu um erro no pedido: ' + error,
        };
      });
  }
  async findOne(username: string): Promise<Conta | undefined> {
    const user = await getRepository(Conta)
      .createQueryBuilder('conta')
      .where('conta.username = :username', { username: username })
      .getOne();
    return user;
  }
  async findByID(id: number): Promise<Conta | undefined> {
    const user = await getRepository(Conta)
      .createQueryBuilder('conta')
      .where('conta.id = :id', { id: id })
      .getOne();
    return user;
  }
  async getUserData(username: string): Promise<Conta | undefined> {
    const user = await getRepository(Conta)
      .createQueryBuilder('conta')
      .select([
        'conta.grupo',
        'conta.nome',
        'conta.email',
        'conta.apelido',
        'conta.id',
      ])
      .where('conta.username = :username', { username: username })
      .getOne();
    return user;
  }
  async AccountUpdate(data: UserUpdateDto): Promise<ResultadoDto> {
    const id = data.id;
    if (data.pass) {
      return this.userRepository
        .update(
          { id },
          {
            username: data.username,
            email: data.email,
            nome: data.nome,
            apelido: data.apelido,
            pass: bcrypt.hashSync(data.pass, 10),
            grupo: data.grupo,
            cod_escritorio: data.cod_escritorio,
          },
        )
        .then(() => {
          return <ResultadoDto>{
            status: true,
            mensagem: 'Conta atualizada!',
          };
        })
        .catch((error) => {
          return <ResultadoDto>{
            status: false,
            mensagem: 'Ocorreu um erro no pedido: ' + error,
          };
        });
    } else {
      return this.userRepository
        .update(
          { id },
          {
            username: data.username,
            email: data.email,
            nome: data.nome,
            apelido: data.apelido,
            grupo: data.grupo,
            cod_escritorio: data.cod_escritorio,
          },
        )
        .then(() => {
          return <ResultadoDto>{
            status: true,
            mensagem: 'Conta atualizada!',
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
  async delete(id: number): Promise<ResultadoDto> {
    return this.userRepository
      .delete(id)
      .then(() => {
        return <ResultadoDto>{
          status: true,
          mensagem: 'O utilizador foi removido',
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
