import { Connection } from 'typeorm';
import { Software, TipoLicenca, TipoSoftware } from './software.entity';

export const softwareProviders = [
  {
    provide: 'SOFTWARE_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Software),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'TIPOSOFTWARE_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(TipoSoftware),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'TIPOLICENCA_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(TipoLicenca),
    inject: ['DATABASE_CONNECTION'],
  },
];
