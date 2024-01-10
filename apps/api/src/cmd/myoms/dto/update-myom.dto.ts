import { PartialType } from '@nestjs/mapped-types';
import { CreateMyomDto } from './create-myom.dto';

export class UpdateMyomDto extends PartialType(CreateMyomDto) {}
