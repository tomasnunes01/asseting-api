import { forwardRef, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.modules';
import { EscritorioModule } from './escritorio/escritorio.module';

@Module({
  imports: [UserModule, EscritorioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
