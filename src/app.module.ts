import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://krishnaagrawal2992:e3px8u491FkV9URc@cluster0.mcydm.mongodb.net/',
    ),
    UserModule,
  ],
})
export class AppModule {}
