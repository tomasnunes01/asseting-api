import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ResultadoDto } from 'src/dto/resultado.dto';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  public sendEmail(destino: string, subj: string, texto: string): any {
    this.mailerService
      .sendMail({
        to: 'assetingwarning@gmail.com',
        from: 'Asseting Warning',
        subject: subj,
        html: texto,
      })
      .then(() => {
        return <ResultadoDto>{
          status: true,
          mensagem: 'Sucesso',
        };
      })
      .catch((error) => {
        return <ResultadoDto>{
          status: false,
          mensagem: 'Ocorreu um erro no pedido: ' + error,
        };
      });
  }
}
