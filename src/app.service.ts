import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async queryPerplexity(query: string): Promise<string> {
    try {
      // Note: You'll need to set PERPLEXITY_API_KEY in your environment variables
      const apiKey = process.env.PERPLEXITY_API_KEY;
      if (!apiKey) {
        throw new HttpException('Perplexity API key not configured', HttpStatus.INTERNAL_SERVER_ERROR);
      }

      const response = await firstValueFrom(
        this.httpService.post(
          'https://api.perplexity.ai/chat/completions',
          {
            model: 'llama-3.1-sonar-small-128k-online',
            messages: [
              {
                role: 'user',
                content: query
              }
            ],
            max_tokens: 1024,
            temperature: 0.7
          },
          {
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json'
            }
          }
        )
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      if (error.response) {
        throw new HttpException(
          `Perplexity API error: ${error.response.data?.error?.message || error.response.statusText}`,
          error.response.status
        );
      }
      throw new HttpException(
        'Failed to process query with Perplexity',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
