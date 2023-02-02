import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogModule } from './blog/blog.module';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [
    BlogModule,
    MongooseModule.forRoot(process.env.MONGO_URL, { useNewUrlParser: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
