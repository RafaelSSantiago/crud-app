import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateClientDto } from './dto/create-client.dto';
import { Client } from './schemas/client.schema';

@Injectable()
export class ClientsService {
    constructor(@InjectModel(Client.name) private clientModel: Model<Client>) {}

    async create(createClientDto: CreateClientDto): Promise<Client> {
        try {
            const createdClient = new this.clientModel(createClientDto);
            return createdClient.save();
        } catch (error: any) {
            throw new Error(`error creating client: ${error.message}`);
        }
    }

    async findAll(): Promise<Client[]> {
        return this.clientModel.find().exec();
    }

    async findOne(id: string): Promise<Client> {
        const client = await this.clientModel.findById(id).exec();
        if (!client) {
            throw new NotFoundException(`Client with ID ${id} not found`);
        }
        return client;
    }

    async update(id: string, createClientDto: CreateClientDto): Promise<Client> {
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
