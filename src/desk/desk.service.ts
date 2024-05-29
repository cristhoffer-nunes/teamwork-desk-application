import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class DeskService {
  private webhookTeamsUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.webhookTeamsUrl = this.configService.get<string>('WEBHOOK_TEAMS_URL');
  }

  async sendMessage(message: string): Promise<void> {
    const payload = {
      text: message,
    };

    await lastValueFrom(this.httpService.post(this.webhookTeamsUrl, payload));
  }
}
