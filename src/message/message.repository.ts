import { Injectable } from '@nestjs/common';
import { Message, MessageRole } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MessageRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findRecentByUserId(userId: number, limit = 20): Promise<Message[]> {
    const messages = await this.prisma.message.findMany({
      where: { userId },
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      take: limit,
    });

    return messages.reverse();
  }

  async saveExchange(
    userId: number,
    userMessage: string,
    responseMessage: string,
  ): Promise<void> {
    await this.prisma.$transaction([
      this.prisma.message.create({
        data: {
          userId,
          content: userMessage,
          role: MessageRole.USER,
        },
      }),
      this.prisma.message.create({
        data: {
          userId,
          content: responseMessage,
          role: MessageRole.ASSISTANT,
        },
      }),
    ]);
  }
}
