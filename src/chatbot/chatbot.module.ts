import { Module } from '@nestjs/common';
import { AIModule } from '../ai/ai.module';
import { MessageModule } from '../message/message.module';
import { ChatbotService } from './chatbot.service';

@Module({
  imports: [MessageModule, AIModule],
  providers: [ChatbotService],
  exports: [ChatbotService],
})
export class ChatbotModule {}
