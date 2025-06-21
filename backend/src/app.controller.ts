import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { QueryDto } from './dto/query.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('query')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async submitQuery(@Body() body: QueryDto): Promise<{ result: string }> {
    const result = await this.appService.queryPerplexity(body.query);
    return { result };
  }
}
