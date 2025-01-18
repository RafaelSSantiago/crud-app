import { IsMongoId } from "class-validator";

export class FindOneParams {
    @IsMongoId({ message: 'O parâmetro "id" deve ser um Mongo ID válido.' })
    id: string;
}
