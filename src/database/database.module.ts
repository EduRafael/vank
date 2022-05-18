import { Module } from '@nestjs/common';
import { dbProviders } from './database.service';

@Module({
  imports: [...dbProviders],
})
export class DatabaseModule {}
