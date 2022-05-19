import { Connection } from 'typeorm';
import { Computador, TipoComputador } from './computador.entity';

export const computadorProviders = [
  {
    provide: 'COMPUTADOR_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(Computador),
    inject: ['DATABASE_CONNECTION'],
  },
];

export const tipoComputadorProviders = [
  {
    provide: 'TIPOCOMPUTADOR_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(TipoComputador),
    inject: ['DATABASE_CONNECTION'],
  },
];
