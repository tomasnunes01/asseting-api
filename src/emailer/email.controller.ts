import { Controller, Get } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('emailer')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  /*@Get('example')
  async listTypes(): Promise<string> {
    return this.emailService.sendEmail();
  }*/
}
