import { IsString, IsOptional, IsNotEmpty } from "class-validator";

export class CreateRoleDto {
    @IsString()
    @IsNotEmpty({ message: 'role_name es requerido' })
    role_name: string;

    @IsString()
    @IsOptional()
    description?: string;
}
