import { escritorioProviders } from 'src/escritorio/escritorio.providers';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  OneToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Escritorio } from 'src/escritorio/escritorio.entity';

@Entity()
export class TipoComputador {
  @PrimaryGeneratedColumn()
  cod_tipo: number;

  @Column({ length: 20 })
  tipo: string;
}

@Entity()
export class Computador {
  @PrimaryColumn({ length: 30 })
  nr_serie: string;

  @OneToOne(() => Escritorio, (escritorio) => escritorio.cod_escritorio)
  cod_escritorio?: Escritorio;

  @Column()
  cod_tipo: number;

  @Column()
  cod_utilizador?: number;

  @Column({ length: 20 })
  marca: string;

  @Column({ length: 20 })
  modelo: string;

  @Column({ length: 100 })
  descricao?: string;

  @Column({ length: 20 })
  so?: string;

  @Column({ length: 20 })
  cpu?: string;

  @Column()
  ram?: number;

  @Column()
  hdd?: number;

  @Column()
  garantia?: Date;

  @Column()
  data_instalacao?: Date;

  @Column()
  fim_emprestimo?: Date;

  @Column()
  aviso?: boolean;
}
