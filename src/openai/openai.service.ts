import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { AppConfig } from 'src/config/AppConfig';

@Injectable()
export class OpenaiService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: AppConfig.OPENAI_API_KEY,
    });
  }

  async generateChatCompletion(prompt: string): Promise<string> {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: prompt },
        ],
      });
      return response.choices[0].message?.content || '';
    } catch (error) {
      console.error('OpenAI API error:', error);
      return 'Sorry, I could not process your request.';
    }
  }

  async generateResponse(message: string): Promise<string> {
    return this.generateChatCompletion(message);
  }
}
