import { IsString, IsOptional, IsBoolean } from "class-validator";

export class CreateUserDto {
    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsBoolean()
    is_active: boolean;
}
