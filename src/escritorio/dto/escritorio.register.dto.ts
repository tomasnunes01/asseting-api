import { Computador } from 'src/computador/computador.entity';

export interface EscritorioRegisterDto {
  morada: string;
  tipo: string;
  helpdesk?: Computador[];
}
