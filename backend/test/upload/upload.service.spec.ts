import { Test, TestingModule } from '@nestjs/testing';
import { ItemController } from '../../src/item/item.controller';
import { ItemService } from '../../src/item/item.service';
import { BadRequestException } from '@nestjs/common';

describe('ItemController', () => {
    let controller: ItemController;
    let service: ItemService;

    const mockItemService = {
        create: jest.fn().mockImplementation((dto) => ({
            id: Date.now(),
            ...dto
        }))
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ItemController],
            providers: [
                {
                    provide: ItemService,
                    useValue: mockItemService
                }
            ]
        }).compile();

        controller = module.get<ItemController>(ItemController);
        service = module.get<ItemService>(ItemService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should create an item successfully', async () => {
        const dto = {
            title: 'Test Item',
            description: 'Test Description',
            photoUrl: 'http://example.com/image.png'
        };
        expect(await controller.create(dto)).toEqual({
            id: expect.any(Number),
            ...dto
        });
        expect(service.create).toHaveBeenCalledWith(dto);
    });

    it('should throw BadRequestException when no properties are provided', async () => {
        const dto = {};
        try {
            await controller.create(dto as any);
        } catch (error) {
            expect(error).toBeInstanceOf(BadRequestException);
            expect(error.response.message).toEqual([
                'O título é obrigatório.',
                'A descrição é obrigatória.',
                'A URL da foto é obrigatória.'
            ]);
        }
    });

    it('should throw BadRequestException when properties are invalid', async () => {
        const dto = {
            title: '',
            description: 123,
            photoUrl: 'invalid-url'
        };
        try {
            await controller.create(dto as any);
        } catch (error) {
            expect(error).toBeInstanceOf(BadRequestException);
            expect(error.response.message).toEqual([
                'O título deve ser uma string.',
                'O título é obrigatório.',
                'A descrição deve ser uma string.',
                'A URL da foto deve ser uma URL válida.'
            ]);
        }
    });
});
