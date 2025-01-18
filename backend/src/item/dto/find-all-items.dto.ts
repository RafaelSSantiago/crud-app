import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsPositive, IsString, Min } from 'class-validator';

export class FindAllItemsDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt({ message: 'O parâmetro "page" deve ser um número inteiro.' })
    @IsPositive({ message: 'O parâmetro "page" deve ser um número positivo.' })
    page?: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsInt({ message: 'O parâmetro "limit" deve ser um número inteiro.' })
    @Min(1, { message: 'O parâmetro "limit" deve ser pelo menos 1.' })
    limit?: number = 10; // Valor padrão

    @IsOptional()
    @IsString({ message: 'O parâmetro "sortBy" deve ser uma string válida.' })
    sortBy?: string = 'createdAt'; // Valor padrão

    @IsOptional()
    @IsIn(['asc', 'desc'], { message: 'O parâmetro "sortOrder" deve ser "asc" ou "desc".' })
    sortOrder?: 'asc' | 'desc' = 'asc'; // Valor padrão
}


