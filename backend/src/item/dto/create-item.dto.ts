import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateItemDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsUrl()
    photoUrl: string;
}
