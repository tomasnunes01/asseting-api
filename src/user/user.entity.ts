import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Conta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 16 })
  username: string;

  @Column({ length: 45 })
  email: string;

  @Column({ length: 45 })
  nome: string;

  @Column({ length: 45 })
  apelido: string;

  @Column({ length: 255 })
  pass: string;

  @Column({ length: 20 })
  grupo: string;

  @Column('int')
  cod_escritorio: number;
}
