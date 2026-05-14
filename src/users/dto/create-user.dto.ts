import { IsString, IsOptional, IsBoolean, IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsEmail({}, { message: 'Email inválido' })
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(8)
    @IsNotEmpty()
    password: string;

    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsBoolean()
    is_active: boolean;
}
