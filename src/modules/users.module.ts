import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookBorrowing, User } from '@/entities';
import { UsersController } from '@/controllers';
import { UsersService } from '@/services';
import { UserProfile } from '@/profiles';
import { BookBorrowingsModule } from './book-borrowings.module';
import { USERS_SERVICE_TOKEN } from '@/di';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, BookBorrowing]),
    BookBorrowingsModule,
  ],
  controllers: [UsersController],
  providers: [
    UserProfile,
    {
      provide: USERS_SERVICE_TOKEN,
      useClass: UsersService,
    },
  ],
})
export class UsersModule {}
