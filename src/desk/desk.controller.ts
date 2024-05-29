import {
  Controller,
  Post,
  Headers,
  Body,
  BadRequestException,
  HttpException,
} from '@nestjs/common';
import { DeskService } from './desk.service';

@Controller('desk')
export class DeskController {
  constructor(private readonly deskService: DeskService) {}

  @Post('handle')
  async handle(@Headers() headers, @Body() body) {
    try {
      const deskEvent = headers['x-desk-event'];
      const { id, subject, state, customer } = body.ticket;
      if (deskEvent === 'ticket.created') {
        const message = `<b>[Novo ticket]</b> <br/><br/> #${id} | ${customer.company} (${customer.email}) | ${subject} | Status (${state})`;
        await this.deskService.sendMessage(message);
      } else if (deskEvent === 'ticket.customer.reply') {
        const message = `<b>[Nova resposta do cliente]</b> <br/><br/> #${id} | ${customer.company} (${customer.email}) | ${subject} | Status (${state})`;
        await this.deskService.sendMessage(message);
      } else if (deskEvent === 'ticket.status') {
        const message = `<b>[Status do chamado alterado]</b> <br/><br/> #${id} | ${customer.company} (${customer.email}) | ${subject} | Status (${state})`;
        await this.deskService.sendMessage(message);
      } else {
        throw new BadRequestException(`Invalid deskEvent: ${deskEvent}`);
      }
      return { message: 'success' };
    } catch (error) {
      throw new HttpException(
        { message: error.message, success: false },
        error.status,
      );
    }
  }
}
