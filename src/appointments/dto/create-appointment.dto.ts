import { IsDate, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateAppointmentDto {
    @IsUUID()
    @IsNotEmpty()
    client_id: string;

    @IsUUID()
    @IsNotEmpty()
    doctor_id: string;

    @IsString()
    @IsNotEmpty()
    reason: string;

    @IsDate()
    @IsNotEmpty()
    datetime: Date;
}
