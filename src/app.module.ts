import { Module } from '@nestjs/common';
import { CacheModule } from '@/infra/cache';
import { DatabaseModule } from '@/infra/db';
import { LoggerModule } from '@/infra/logger';
import { SwaggerModule } from '@nestjs/swagger';
import { UsersModule, BooksModule, BookBorrowingsModule } from '@/modules';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    CacheModule,
    DatabaseModule,
    LoggerModule,
    SwaggerModule,
    UsersModule,
    BooksModule,
    BookBorrowingsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
