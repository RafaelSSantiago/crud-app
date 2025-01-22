import { IsNotEmpty, IsString } from 'class-validator';

export class CreateItemDto {
    @IsNotEmpty({ message: 'O título é obrigatório.' })
    @IsString({ message: 'O título deve ser uma string.' })
    title: string;

    @IsNotEmpty({ message: 'A descrição é obrigatória.' })
    @IsString({ message: 'A descrição deve ser uma string.' })
    description: string;

    @IsNotEmpty({ message: 'A URL da foto é obrigatória.' })
    photoUrl: string;
}
