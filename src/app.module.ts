import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://krishnaagrawal2992:e3px8u491FkV9URc@cluster0.mcydm.mongodb.net/',
    ),
    AuthModule,
    UsersModule,
    CatsModule,
  ],
})
export class AppModule {}
