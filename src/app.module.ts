import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from './infra/cache';
import { DatabaseModule } from './infra/db';
import { LoggerModule } from './infra/logger';
import { SwaggerModule } from '@nestjs/swagger';

@Module({
  imports: [CacheModule, DatabaseModule, LoggerModule, SwaggerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
