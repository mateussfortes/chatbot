import { BadRequestException, Injectable } from '@nestjs/common';
import { ChatbotService } from '../chatbot/chatbot.service';
import { UserService } from '../user/user.service';
import { WebhookDto } from './dto/webhook.dto';

@Injectable()
export class WebhookService {
  constructor(
    private readonly userService: UserService,
    private readonly chatbotService: ChatbotService,
  ) {}

  async handle(payload: WebhookDto) {
    if (typeof payload.from !== 'string' || payload.from.trim().length === 0) {
      throw new BadRequestException('from must be a non-empty string');
    }

    if (
      typeof payload.message !== 'string' ||
      payload.message.trim().length === 0
    ) {
      throw new BadRequestException('message must be a non-empty string');
    }

    let user = await this.userService.findByPhone(payload.from);

    if (!user) {
      user = await this.userService.create(payload.from);
    }

    const response = await this.chatbotService.process(user, payload.message);

    return { received: true, from: user.phone, message: response };
  }
}
