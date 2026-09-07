import { BadRequestException } from '@nestjs/common';
import { ChatbotService } from '../chatbot/chatbot.service';
import { UserService } from '../user/user.service';
import { WebhookService } from './webhook.service';

describe('WebhookService', () => {
  const userService = {
    findByPhone: jest.fn(),
    create: jest.fn(),
  };
  const chatbotService = {
    process: jest.fn(),
  };
  const service = new WebhookService(
    userService as unknown as UserService,
    chatbotService as unknown as ChatbotService,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('rejects a request without a message', async () => {
    await expect(
      service.handle({
        from: '5511999999999',
        message: undefined as unknown as string,
      }),
    ).rejects.toThrow(BadRequestException);

    expect(userService.findByPhone).not.toHaveBeenCalled();
    expect(chatbotService.process).not.toHaveBeenCalled();
  });
});
