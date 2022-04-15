import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { EscritorioController } from './escritorio.controller';
import { escritorioProviders } from './escritorio.providers';
import { EscritorioService } from './escritorio.service';

@Module({
  imports: [DatabaseModule],
  controllers: [EscritorioController],
  providers: [...escritorioProviders, EscritorioService],
  exports: [EscritorioService],
})
export class EscritorioModule {}
