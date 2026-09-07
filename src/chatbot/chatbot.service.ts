import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { MessageRepository } from '../message/message.repository';

@Injectable()
export class ChatbotService {
  constructor(private readonly messageRepository: MessageRepository) {}

  async process(user: User, message: string): Promise<string> {
    const history = await this.messageRepository.findRecentByUserId(user.id);

    // TODO: Generate the response using the current message and history.
    void history;
    const response = 'Response generation not implemented yet';

    await this.messageRepository.saveExchange(user.id, message, response);

    return response;
  }
}
