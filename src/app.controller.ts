import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('generate-response')
  async generateResponse(@Body('input') input: string): Promise<string> {
    return this.appService.callGPT4API(input);
  }
}
