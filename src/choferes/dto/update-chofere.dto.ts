import { PartialType } from '@nestjs/mapped-types';
import { CreateChofereDto } from './create-chofere.dto';

export class UpdateChofereDto extends PartialType(CreateChofereDto) {}
