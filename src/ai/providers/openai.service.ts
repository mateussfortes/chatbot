import { Injectable } from '@nestjs/common';
import { AIInput, AIService } from '../ai.service';

@Injectable()
export class OpenAIService implements AIService {
  async generateResponse(input: AIInput): Promise<string> {
    const apiKey = process.env.OPENAI_API_KEY;
    const model = process.env.OPENAI_MODEL ?? 'gpt-4.1-mini';

    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is not set');
    }

    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        input: [
          ...input.history.map((item) => ({
            role: item.role === 'USER' ? 'user' : 'assistant',
            content: item.content,
          })),
          { role: 'user', content: input.message },
        ],
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`OpenAI request failed: ${response.status} ${body}`);
    }

    const data = await response.json();

    const text = data.output
      ?.flatMap(
        (item: { content?: Array<{ type: string; text?: string }> }) =>
          item.content ?? [],
      )
      ?.find(
        (content: { type: string; text?: string }) =>
          content.type === 'output_text',
      )?.text;

    if (!text) {
      throw new Error('OpenAI response did not contain output_text');
    }

    return text;
  }
}
