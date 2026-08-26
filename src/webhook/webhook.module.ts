import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';

@Module({
    imports: [UserModule],
    controllers: [WebhookController],
    providers: [WebhookService],
})
export class WebhookModule {}