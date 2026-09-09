import { Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { AI_SERVICE } from '../ai/ai.service';
import type { AIService } from '../ai/ai.service';
import { MessageRepository } from '../message/message.repository';

@Injectable()
export class ChatbotService {
  constructor(
    private readonly messageRepository: MessageRepository,
    @Inject(AI_SERVICE) private readonly aiService: AIService,
  ) {}

  async process(user: User, message: string): Promise<string> {
    const history = await this.messageRepository.findRecentByUserId(user.id);

    const response = await this.aiService.generateResponse({
      message,
      history: history.map((item) => ({
        role: item.role,
        content: item.content,
      })),
    });

    await this.messageRepository.saveExchange(user.id, message, response);

    return response;
  }
}
