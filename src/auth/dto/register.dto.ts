import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

}
