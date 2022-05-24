import { Computador } from 'src/computador/computador.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Escritorio {
  @PrimaryGeneratedColumn()
  cod_escritorio: number;

  @Column({ length: 100 })
  morada?: string;

  @Column({ length: 45 })
  tipo?: string;

  @Column({ length: 45 })
  helpdesk?: string;

  @OneToMany(() => Computador, (computador) => computador.morada)
  moradaComputador: Computador[];
}
