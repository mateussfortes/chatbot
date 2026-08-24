import { Body, Controller, Post } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { WebhookDto } from './dto/webhook.dto';


@Controller('webhook') 
export class WebhookController {
    constructor(private readonly webhookService: WebhookService) {} 

    @Post()
    receive(@Body() body: WebhookDto) {
        return this.webhookService.handle(body);
    }
}