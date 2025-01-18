import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from './schemas/item.schema';

@Injectable()
export class ItemService {
    constructor(@InjectModel(Item.name) private clientModel: Model<Item>) {}

    async create(createClientDto: CreateItemDto): Promise<Item> {
        try {
            const createdClient = new this.clientModel(createClientDto);
            return createdClient.save();
        } catch (error: any) {
            throw new Error(`error creating client: ${error.message}`);
        }
    }

    async findAll(): Promise<Item[]> {
        return this.clientModel.find().exec();
    }

    async findOne(id: string): Promise<Item> {
        const client = await this.clientModel.findById(id).exec();
        if (!client) {
            throw new NotFoundException(`Client with ID ${id} not found`);
        }
        return client;
    }

    async update(id: string, createClientDto: CreateItemDto): Promise<Item> {
        const updatedClient = await this.clientModel.findByIdAndUpdate(id, createClientDto, { new: true }).exec();
        if (!updatedClient) {
            throw new NotFoundException(`Client with ID ${id} not found`);
        }
        return updatedClient;
    }

    async remove(id: string): Promise<void> {
        const result = await this.clientModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`Client with ID ${id} not found`);
        }
    }
}
