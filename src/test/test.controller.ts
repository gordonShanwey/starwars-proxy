import { Controller, Get } from '@nestjs/common';
import { TestService } from './test.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('starwars')
@Controller('/test')
export class TestController {
  constructor(private readonly testService: TestService) {}
  @Get()
  testApi(): string {
    return 'Hello World Checked!';
  }
  @Get('/redis')
  async testRedis(): Promise<any> {
    return await this.testService.testCache();
  }
}
