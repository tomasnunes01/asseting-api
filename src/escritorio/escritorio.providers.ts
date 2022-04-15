import { Connection } from 'typeorm';
import { Escritorio } from './escritorio.entity';

export const escritorioProviders = [
  {
    provide: 'ESCRITORIO_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(Escritorio),
    inject: ['DATABASE_CONNECTION'],
  },
];
