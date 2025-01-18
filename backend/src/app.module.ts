import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemModule } from './item/item.module';

@Module({
    imports: [MongooseModule.forRoot('mongodb://localhost/itens'), ItemModule]
})
export class AppModule {}
