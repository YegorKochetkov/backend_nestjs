import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get()
  getReadme(@Req() req: Request) {
    const host = req.get('host');

    return this.appService.getReadme(host);
  }
}
