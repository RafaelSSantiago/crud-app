import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemService } from './item.service';
import { Item } from './schemas/item.schema';

@Controller('item')
export class ItemController {
    constructor(private readonly clientsService: ItemService) {}

    @Post()
    create(@Body() createClientDto: CreateItemDto): Promise<Item> {
        return this.clientsService.create(createClientDto);
    }

    @Get()
    findAll(): Promise<Item[]> {
        return this.clientsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Item> {
        return this.clientsService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() createClientDto: CreateItemDto): Promise<Item> {
        return this.clientsService.update(id, createClientDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.clientsService.remove(id);
    }
}
