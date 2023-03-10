import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://<username>:<password>@wowa-cluster.nlhp8ob.mongodb.net/test')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
