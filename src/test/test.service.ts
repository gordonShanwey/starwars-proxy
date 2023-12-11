import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class TestService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  async testCache() {
    await this.cacheManager.set('test', 'test');
    const test = await this.cacheManager.get('test');
    console.log(test);
  }
}
