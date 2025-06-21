import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('query')
  async submitQuery(@Body() body: { query: string }): Promise<{ result: string }> {
    const result = await this.appService.queryPerplexity(body.query);
    return { result };
  }
}
