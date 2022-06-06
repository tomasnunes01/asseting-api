import { Computador } from 'src/computador/computador.entity';
import { TipoLicenca, TipoSoftware } from '../software.entity';

export interface SoftwareUpdateDto {
  id: number;
  nr_serie: string;
  fabricante: string;
  versao: string;
  descricao?: string;
  chave?: string;
  cod_tipo_software?: TipoSoftware;
  cod_tipo_licenca?: TipoLicenca;
  computador?: Computador;
  validade?: Date;
}
