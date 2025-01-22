import { IsString, IsNotEmpty } from 'class-validator';

export class FindOneParams {
    @IsString({ message: 'ID deve ser uma string' })
    @IsNotEmpty({ message: 'ID não pode ser vazio' })
    id: string;
}
