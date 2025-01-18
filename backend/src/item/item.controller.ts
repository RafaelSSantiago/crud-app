import { Body, ConflictException, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemService } from './item.service';
import { Item } from './schemas/item.schema';
import { FindAllItemsDto } from './dto/find-all-items.dto';

@Controller('item')
export class ItemController {
    constructor(private readonly itemService: ItemService) {}

    @Post()
    async create(@Body() createItemDto: CreateItemDto): Promise<Item> {
        const existingItem = await this.itemService.findByTitle(createItemDto.title);

        if (existingItem) {
            throw new ConflictException('Um item com este título já existe.');
        }

        return this.itemService.create(createItemDto);
    }

    @Get()
    // @Query(): Mapeia os parâmetros de consulta para o DTO FindAllItemsDto.
    async findAll(@Query() query: FindAllItemsDto): Promise<{ data: Item[]; total: number; page: number; limit: number }> {
        const { page, limit, sortBy, sortOrder } = query;
        const [data, total] = await this.itemService.findAll({ page, limit, sortBy, sortOrder });

          return {
              data,
              total,
              page,
              limit
          };
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Item> {
        return this.itemService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() createItemDto: CreateItemDto): Promise<Item> {
        return this.itemService.update(id, createItemDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.itemService.remove(id);
    }
}
