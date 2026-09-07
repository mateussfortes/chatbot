import { User } from '@prisma/client';
import { MessageRepository } from '../message/message.repository';
import { ChatbotService } from './chatbot.service';

describe('ChatbotService', () => {
  it('loads history, saves the exchange, and returns the response', async () => {
    const messageRepository = {
      findRecentByUserId: jest.fn().mockResolvedValue([]),
      saveExchange: jest.fn().mockResolvedValue(undefined),
    };
    const service = new ChatbotService(
      messageRepository as unknown as MessageRepository,
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
    expect(messageRepository.saveExchange).toHaveBeenCalledWith(
      user.id,
      'Hello',
      'Response generation not implemented yet',
    );
    expect(response).toBe('Response generation not implemented yet');
  });
});
