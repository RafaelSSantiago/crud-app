import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemService } from './item.service';
import { Item } from './schemas/item.schema';

@Controller('item')
export class ItemController {
    constructor(private readonly ItemService: ItemService) {}

    @Post()
    create(@Body() createItemDto: CreateItemDto): Promise<Item> {
        console.log(createItemDto);
        return this.ItemService.create(createItemDto);
    }

    @Get()
    findAll(): Promise<Item[]> {
        return this.ItemService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Item> {
        return this.ItemService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() createItemDto: CreateItemDto): Promise<Item> {
        return this.ItemService.update(id, createItemDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.ItemService.remove(id);
    }
}
