import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://alexwolf:P92GBeQ1gqPsjs1P@wowa-cluster.nlhp8ob.mongodb.net/test'), ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
