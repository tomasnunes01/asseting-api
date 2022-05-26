import { Computador } from 'src/computador/computador.entity';
export interface EscritorioUpdateDto {
  cod_escritorio: number;
  morada: string;
  tipo: string;
  helpdesk?: Computador[];
}
