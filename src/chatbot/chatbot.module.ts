import { Module } from '@nestjs/common';
import { MessageModule } from '../message/message.module';
import { ChatbotService } from './chatbot.service';

@Module({
  imports: [MessageModule],
  providers: [ChatbotService],
  exports: [ChatbotService],
})
export class ChatbotModule {}
