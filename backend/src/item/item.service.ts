import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CastError } from 'mongoose/lib/error';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from './schemas/item.schema';
import { FindAllItemsOptions } from './interfaces/find-all-items.interface';
import { SortOrder } from 'mongoose';
import { UpdateItemParams } from './dto/update-item.dto';

@Injectable()
export class ItemService {
    constructor(@InjectModel(Item.name) private itemModel: Model<Item>) {}

    async create(createClientDto: CreateItemDto): Promise<Item> {
        try {
            const createdClient = new this.itemModel(createClientDto);
            return createdClient.save();
        } catch (error: any) {
            throw new Error(`Erro ao criar cliente: ${error.message}`);
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
        try {
            const item = await this.itemModel.findById(id).exec();

            if (!item) {
                throw new NotFoundException(`Item com ID ${id} não encontrado.`);
            }

            return item;
        } catch (error) {
            if (error instanceof CastError) {
                throw new BadRequestException(`ID "${id}" inválido.`);
            } else if (error instanceof NotFoundException) {
                throw error;
            } else {
                throw new InternalServerErrorException('Erro interno ao buscar o item.');
            }
        }
    }

    async update(id: string, createClientDto: UpdateItemParams): Promise<Item> {
        const updatedClient = await this.itemModel.findByIdAndUpdate(id, createClientDto, { new: true }).exec();
        if (!updatedClient) {
            throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
        }
        return updatedClient;
    }

    async remove(id: string): Promise<void> {
        const result = await this.itemModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
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
