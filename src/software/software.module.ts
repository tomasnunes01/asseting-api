import { Module } from '@nestjs/common';
import { ComputadorModule } from 'src/computador/computador.module';
import { DatabaseModule } from '../database/database.module';
import { SoftwareController } from './software.controller';
import { softwareProviders } from './software.providers';
import { SoftwareService } from './software.service';

@Module({
  imports: [DatabaseModule, ComputadorModule],
  controllers: [SoftwareController],
  providers: [...softwareProviders, SoftwareService],
  exports: [SoftwareService],
})
export class SoftwareModule {}
