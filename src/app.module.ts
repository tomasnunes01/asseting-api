import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.modules';
import { EscritorioModule } from './escritorio/escritorio.module';
import { ComputadorModule } from './computador/computador.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SoftwareModule } from './software/software.module';

@Module({
  imports: [
    ComputadorModule,
    EscritorioModule,
    UserModule,
    ScheduleModule.forRoot(),
    SoftwareModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
