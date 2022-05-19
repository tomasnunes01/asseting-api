import { Connection } from 'typeorm';
import { Conta } from './user.entity';

export const userProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Conta),
    inject: ['DATABASE_CONNECTION'],
  },
];
