import {
    BadRequestException,
    Body,
    ConflictException,
    Controller,
    Delete,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Param,
    Post,
    Put,
    Query,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemService } from './item.service';
import { Item } from './schemas/item.schema';
import { FindAllItemsDto } from './dto/find-all-items.dto';
import { FindOneParams } from './dto/find-item.dto';
import { UpdateItemParams } from './dto/update-item.dto';

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
    async findAll(
        @Query() query: FindAllItemsDto
    ): Promise<{ data: Item[]; total: number; page: number; limit: number }> {
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
    @UsePipes(new ValidationPipe({ transform: true }))
    async findOne(@Param() params: FindOneParams): Promise<Item> {
        try {
            return await this.itemService.findOne(params.id);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new BadRequestException('Erro ao buscar o item.');
        }
    }

    @Put(':id')
    async update(@Param() params: UpdateItemParams, @Body() createItemDto: CreateItemDto): Promise<Item> {
        try {
            return await this.itemService.update(params.id, createItemDto);
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerErrorException('Erro interno ao atualizar o item.');
        }
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.itemService.remove(id);
    }
}
