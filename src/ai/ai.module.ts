import { Module } from '@nestjs/common';
import { AI_SERVICE } from './ai.service';
import { OpenAIService } from './providers/openai.service';

@Module({
  providers: [
    OpenAIService,
    {
      provide: AI_SERVICE,
      useExisting: OpenAIService,
    },
  ],
  exports: [AI_SERVICE],
})
export class AIModule {}
