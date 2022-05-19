import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

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

  @Column()
  cod_escritorio: number;

  @Column()
  cod_tipo: number;

  @Column({ length: 20 })
  marca: string;

  @Column({ length: 20 })
  modelo: string;

  @Column({ length: 100 })
  descricao: string;

  @Column({ length: 20 })
  so: string;

  @Column({ length: 20 })
  cpu: string;

  @Column()
  ram: number;

  @Column()
  hdd: number;

  @Column()
  garamtia: Date;

  @Column()
  data_instalacao: Date;

  @Column()
  fim_emprestimo: Date;

  @Column()
  aviso: number;
}
