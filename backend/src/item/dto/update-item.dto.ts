import { CreateItemDto } from "./create-item.dto";
import { FindOneParams } from "./find-item.dto";
import { PartialType } from '@nestjs/mapped-types';


export class UpdateItemParams extends PartialType(CreateItemDto) {}

export class ParamUpdateItem extends FindOneParams {}