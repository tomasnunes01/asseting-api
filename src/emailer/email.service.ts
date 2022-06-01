import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  public sendEmail(): any {
    this.mailerService
      .sendMail({
        to: 'assetingwarning@gmail.com', // list of receivers
        from: 'Asseting Warning', // sender address
        subject: 'Testing Nest MailerModule ✔', // Subject line
        //text: 'welcome', // plaintext body
        html: '<b>welcome</b>', // HTML body content
      })
      .then(() => {
        console.log('Sucesso');
      })
      .catch((error) => {
        console.log('Erro:' + error);
      });
    return 'Fim';
  }
}
//destino: string, subj: string
