import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Escritorio } from 'src/escritorio/escritorio.entity';
import { Software } from 'src/software/software.entity';

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

  @ManyToOne(() => Escritorio, (escritorio) => escritorio.computadores, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  cod_escritorio?: Escritorio;

  @Column()
  cod_tipo: number;

  @Column()
  cod_utilizador?: number;

  @Column({ length: 20 })
  marca: string;

  @Column({ length: 20 })
  modelo: string;

  @Column({
    length: 100,
    nullable: true,
  })
  descricao?: string;

  @Column({
    length: 20,
    nullable: true,
  })
  so?: string;

  @Column({
    length: 20,
    nullable: true,
  })
  cpu?: string;

  @Column({ nullable: true })
  ram?: number;

  @Column({ nullable: true })
  hdd?: number;

  @Column()
  garantia?: Date;

  @Column()
  data_instalacao?: Date;

  @Column()
  fim_emprestimo?: Date;

  @Column()
  aviso?: boolean;

  @OneToMany(() => Software, (software) => software.computador)
  software: Software[];
}
