import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Computador } from 'src/computador/computador.entity';

@Entity()
export class TipoSoftware {
  @PrimaryGeneratedColumn()
  cod_tipo: number;

  @Column({ length: 45 })
  tipo: string;

  @OneToMany(() => Software, (software) => software.cod_tipo_software)
  software: Software[];
}

@Entity()
export class TipoLicenca {
  @PrimaryGeneratedColumn()
  cod_tipo: number;

  @Column({ length: 45 })
  tipo: string;

  @OneToMany(() => Software, (software) => software.cod_tipo_licenca)
  software: Software[];
}

@Entity()
export class Software {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45, unique: true })
  nr_serie: string;

  @ManyToOne(() => TipoSoftware, (tipoSoftware) => tipoSoftware.software, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  cod_tipo_software?: TipoSoftware;

  @ManyToOne(() => TipoLicenca, (tipoLicenca) => tipoLicenca.software, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  cod_tipo_licenca?: TipoLicenca;

  @ManyToOne(() => Computador, (computador) => computador.software, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  computador?: Computador;

  @Column({ length: 20 })
  fabricante: string;

  @Column({ length: 20 })
  versao: string;

  @Column({
    length: 100,
    nullable: true,
  })
  descricao?: string;

  @Column({
    length: 45,
    nullable: true,
  })
  chave?: string;

  @Column()
  validade: Date;
}
