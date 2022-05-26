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

  @OneToMany(() => Computador, (computador) => computador.nr_serie)
  helpdesk?: Computador[];
}
