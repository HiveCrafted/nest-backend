import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  async callGPT4API(input: string): Promise<string> {
    const apiKey = this.configService.get<string>('GPT4_API_KEY');
    const apiUrl = 'https://gpt-4-api.openai.com/v1/engines/davinci-codex/completions';

    try {
      const response = await axios.post(
        apiUrl,
        {
          prompt: input,
          max_tokens: 50,
          n: 1,
          stop: null,
          temperature: 0.5,
          top_p: 1,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
        },
      );

      return response.data.choices[0].text.trim();
    } catch (error) {
      console.error('Error while calling GPT-4 API:', error);
      return 'Error while processing the request.';
    }
  }
}
