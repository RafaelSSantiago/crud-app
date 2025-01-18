import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemModule } from './item/item.module';
import { UploadModule } from './upload/upload.module';

@Module({
    imports: [MongooseModule.forRoot('mongodb://localhost/itens'), ItemModule, UploadModule]
})
export class AppModule {}
