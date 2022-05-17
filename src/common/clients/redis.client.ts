import { Logger } from '@nestjs/common';
import { createClient } from 'redis';

export class RedisClient {
  private readonly logger = new Logger(RedisClient.name);
  private client: createClient;
  constructor() {
    this.client = createClient({
      url: 'redis://localhost:6379',
    });
  }

  async super() {
    await this.client.connect();
  }

  async save(key: string, value: string): Promise<string> {
    try {
      await this.client.set(key, value);
      return 'success';
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  async get(key: string): Promise<string> {
    try {
      const result = await this.client.get(key);

      console.log({ result });

      return result;
    } catch (error) {
      this.logger.error(error.message);
    }
  }
}
