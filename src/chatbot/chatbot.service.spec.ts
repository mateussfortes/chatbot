import { User } from '@prisma/client';
import { AIService } from '../ai/ai.service';
import { MessageRepository } from '../message/message.repository';
import { ChatbotService } from './chatbot.service';

describe('ChatbotService', () => {
  it('loads history, generates a response, saves the exchange, and returns it', async () => {
    const messageRepository = {
      findRecentByUserId: jest.fn().mockResolvedValue([
        { role: 'USER', content: 'Previous message' },
        { role: 'ASSISTANT', content: 'Previous reply' },
      ]),
      saveExchange: jest.fn().mockResolvedValue(undefined),
    };
    const aiService = {
      generateResponse: jest.fn().mockResolvedValue('Generated reply'),
    };
    const service = new ChatbotService(
      messageRepository as unknown as MessageRepository,
      aiService as unknown as AIService,
    );
    const user: User = {
      id: 1,
      phone: '5511999999999',
      name: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const response = await service.process(user, 'Hello');

    expect(messageRepository.findRecentByUserId).toHaveBeenCalledWith(user.id);
    expect(aiService.generateResponse).toHaveBeenCalledWith({
      message: 'Hello',
      history: [
        { role: 'USER', content: 'Previous message' },
        { role: 'ASSISTANT', content: 'Previous reply' },
      ],
    });
    expect(messageRepository.saveExchange).toHaveBeenCalledWith(
      user.id,
      'Hello',
      'Generated reply',
    );
    expect(response).toBe('Generated reply');
  });
});
