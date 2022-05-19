import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.modules';
import { EscritorioModule } from './escritorio/escritorio.module';
import { ComputadorModule } from './computador/computador.module';

@Module({
  imports: [UserModule, EscritorioModule, ComputadorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
