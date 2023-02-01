import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogModule } from './blog/blog.module';

const url = process.env.MONGO_URL;

@Module({
  imports: [MongooseModule.forRoot(url, { useNewUrlParser: true }), BlogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }