import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor() {}

  async get() {
    Logger.log('User data');
    return 'Users data';
  }
}
