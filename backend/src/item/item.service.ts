import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from './schemas/item.schema';
import { FindAllItemsOptions } from './interfaces/find-all-items.interface';
import { SortOrder } from 'mongoose';

@Injectable()
export class ItemService {
    constructor(@InjectModel(Item.name) private itemModel: Model<Item>) {}

    async create(createClientDto: CreateItemDto): Promise<Item> {
        try {
            const createdClient = new this.itemModel(createClientDto);
            return createdClient.save();
        } catch (error: any) {
            throw new Error(`error creating client: ${error.message}`);
        }
    }

    async findAll(options: FindAllItemsOptions): Promise<[Item[], number]> {
        const { page, limit, sortBy, sortOrder } = options;

        try {
            const skip = (page - 1) * limit;
            const sortOption: { [key: string]: SortOrder } = { [sortBy]: sortOrder };

            const [data, total] = await Promise.all([
                this.itemModel.find().sort(sortOption).skip(skip).limit(limit).exec(),
                this.itemModel.countDocuments().exec()
            ]);

            return [data, total];
        } catch (error) {
            console.error('Erro ao buscar todos os itens:', error);
            throw new InternalServerErrorException('Erro ao buscar os itens no banco de dados.');
        }
    }

    async findOne(id: string): Promise<Item> {
        const client = await this.itemModel.findById(id).exec();
        if (!client) {
            throw new NotFoundException(`Client with ID ${id} not found`);
        }
        return client;
    }

    async update(id: string, createClientDto: CreateItemDto): Promise<Item> {
        const updatedClient = await this.itemModel.findByIdAndUpdate(id, createClientDto, { new: true }).exec();
        if (!updatedClient) {
            throw new NotFoundException(`Client with ID ${id} not found`);
        }
        return updatedClient;
    }

    async remove(id: string): Promise<void> {
        const result = await this.itemModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`Client with ID ${id} not found`);
        }
    }

    async findByTitle(title: string): Promise<Item | undefined> {
        try {
            const item = await this.itemModel.findOne({ title }).exec();
            return item;
        } catch (_) {
            throw new InternalServerErrorException('Erro ao buscar o item no banco de dados.');
        }
    }
}
