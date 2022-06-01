import { Module } from '@nestjs/common';
import { EmailModule } from 'src/emailer/email.module';
import { DatabaseModule } from '../database/database.module';
import { ComputadorController } from './computador.controller';
import {
  computadorProviders,
  tipoComputadorProviders,
} from './computador.providers';
import { ComputadorService } from './computador.service';

@Module({
  imports: [DatabaseModule, EmailModule],
  controllers: [ComputadorController],
  providers: [
    ...computadorProviders,
    ...tipoComputadorProviders,
    ComputadorService,
  ],
  exports: [ComputadorService],
})
export class ComputadorModule {}
