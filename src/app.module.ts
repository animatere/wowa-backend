import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CardModule } from './card/card.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://alexwolf:P92GBeQ1gqPsjs1P@wowa-cluster.nlhp8ob.mongodb.net/test'), CardModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
