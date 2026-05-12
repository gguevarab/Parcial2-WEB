import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString, IsOptional, IsBoolean } from "class-validator";

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsString()
    email?: string;

    @IsString()
    password?: string;

    @IsString()
    name?: string;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsBoolean()
    is_active: boolean;
}

