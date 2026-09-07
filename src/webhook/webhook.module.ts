import { Module } from '@nestjs/common';
import { ChatbotModule } from '../chatbot/chatbot.module';
import { UserModule } from '../user/user.module';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';

@Module({
  imports: [UserModule, ChatbotModule],
  controllers: [WebhookController],
  providers: [WebhookService],
})
export class WebhookModule {}
