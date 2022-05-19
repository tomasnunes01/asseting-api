import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ComputadorController } from './computador.controller';
import {
  computadorProviders,
  tipoComputadorProviders,
} from './computador.providers';
import { ComputadorService } from './computador.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ComputadorController],
  providers: [
    ...computadorProviders,
    ...tipoComputadorProviders,
    ComputadorService,
  ],
  exports: [ComputadorService],
})
export class ComputadorModule {}
