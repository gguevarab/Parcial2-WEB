import { IsString, IsOptional } from "class-validator";

export class CreateRoleDto {
    @IsString()
    role_name: string;

    @IsString()
    @IsOptional()
    description?: string;
}
