import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { ClientsService } from './clients.service';
import { Client } from './schemas/client.schema';

@Controller('clients')
export class ClientsController {
    constructor(private readonly clientsService: ClientsService) {}

    @Post()
    create(@Body() createClientDto: CreateClientDto): Promise<Client> {
        return this.clientsService.create(createClientDto);
    }

    @Get()
    findAll(): Promise<Client[]> {
        return this.clientsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Client> {
        return this.clientsService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() createClientDto: CreateClientDto): Promise<Client> {
        return this.clientsService.update(id, createClientDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.clientsService.remove(id);
    }
}
