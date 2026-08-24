import { Injectable } from '@nestjs/common';
import { WebhookDto } from './dto/webhook.dto';

@Injectable() 
export class WebhookService {
    handle(payload: WebhookDto) {
        return { received: true, from: payload.from, message: payload.message };
    }
}