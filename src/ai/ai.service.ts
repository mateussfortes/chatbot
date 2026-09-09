export type AIMessage = {
  role: 'USER' | 'ASSISTANT';
  content: string;
};

export type AIInput = {
  message: string;
  history: AIMessage[];
};

export interface AIService {
  generateResponse(input: AIInput): Promise<string>;
}

export const AI_SERVICE = Symbol('AI_SERVICE');
